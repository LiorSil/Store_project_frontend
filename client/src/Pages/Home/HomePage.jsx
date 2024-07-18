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

const userComponents = {
  Products: ProductsComp,
  Orders: OrdersComp,
  Account: AccountComp,
  Logout: LogoutComp,
};

const adminComponents = {
  Categories: AdminCategoriesComp,
  Aproducts: AdminProductsComp,
  Customers: AdminCustomersComp,
  Statistics: AdminStatisticsComp,
  Logout: LogoutComp,
};

const HomePage = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const isAdmin = cookies.get("isAdmin");
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = useMemo(() => {
    const path = location.pathname.split("/").pop();
    return path.charAt(0).toUpperCase() + path.slice(1);
  }, [location.pathname]);
  const [selectedPage, setSelectedPage] = useState(currentPath);

  useEffect(() => {
    const components = isAdmin ? adminComponents : userComponents;
    if (selectedPage in components) {
      setSelectedPage(selectedPage);
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

      {renderComponent}
    </>
  );
};

export default HomePage;
