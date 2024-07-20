import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
import ErrorPage from "../../Pages/Error/ErrorPage";
import {
  ProductsComp,
  OrdersComp,
  AccountComp,
  LogoutComp,
  NavBarComp,
} from "../../Components/userComponents";
import {
  AdminCategoriesComp,
  AdminProductsComp,
  AdminCustomersComp,
  AdminStatisticsComp,
} from "../../Components/adminComponents";
import WelcomePage from "./WelcomePage";
import styles from "./HomePage.module.css"; // Import the CSS module

const userComponents = {
  Products: ProductsComp,
  Orders: OrdersComp,
  Account: AccountComp,
  Logout: LogoutComp,
};

const adminComponents = {
  Categories: AdminCategoriesComp,
  "Admin Products": AdminProductsComp,
  Customers: AdminCustomersComp,
  Statistics: AdminStatisticsComp,
  Logout: LogoutComp,
};

const HomePage = () => {
  const cookies = useMemo(() => new Cookies(), []);

  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = cookies.get("isAdmin");
  if (isAdmin === undefined || cookies.get("token") === undefined) {
    alert("You are not logged in!");
    navigate("/login", { replace: true });
  }

  const currentPath = useMemo(() => {
    let path = location.pathname.split("/").pop();

    return path.charAt(0).toUpperCase() + path.slice(1);
  }, [location.pathname]);
  const [selectedPage, setSelectedPage] = useState(currentPath);

  useEffect(() => {
    const components = isAdmin ? adminComponents : userComponents;
    if (selectedPage in components) {
      setSelectedPage(selectedPage);
    } else if (selectedPage === "Admin%20products") {
      setSelectedPage("Admin Products");
    } else {
      setSelectedPage(null); // Reset selectedPage if the path is not found in pages array
    }
  }, [currentPath, isAdmin, selectedPage]);

  const handleSelectedPage = useCallback(
    (page) => {
      setSelectedPage(page);
      navigate(`/home/${page.toLowerCase()}`);
    },
    [navigate]
  );

  const renderComponent = useMemo(() => {
    const components = isAdmin ? adminComponents : userComponents;
    //if path /home then render WelcomePage
    if (!isAdmin && location.pathname === "/home") {
      return <WelcomePage onSelectedPage={handleSelectedPage} />;
    } else if (isAdmin && location.pathname === "/home") {
      return <AdminStatisticsComp />;
    } else {
      const Component = components[selectedPage] || ErrorPage; // Default to ErrorPage if not found

      return <Component />;
    }
  }, [isAdmin, location.pathname, selectedPage, handleSelectedPage]);

  return (
    <>
      <NavBarComp
        pages={Object.keys(isAdmin ? adminComponents : userComponents)}
        onSelectedPage={handleSelectedPage}
        selectedPage={selectedPage}
      />

      <div className={styles.pageContent}>{renderComponent}</div>
    </>
  );
};

export default HomePage;
