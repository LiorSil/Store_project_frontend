import React, { useState, useEffect, useMemo } from "react";
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
import { useSelector } from "react-redux";

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
  const { isAdmin } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(null);

  const currentPath = useMemo(() => {
    const path = location.pathname.split("/").pop();

    return path.charAt(0).toUpperCase() + path.slice(1);
  }, [location.pathname]);

  useEffect(() => {
    const components = isAdmin ? adminComponents : userComponents;
    if (selectedPage in components) {
      setSelectedPage(selectedPage);
    } else {
      setSelectedPage(null); // Reset selectedPage if the path is not found in pages array
    }
  }, [currentPath, isAdmin, selectedPage]);

  const handleSelectedPage = (page) => {
    setSelectedPage(page);
    navigate(`/home/${page.toLowerCase()}`);
  };

  const renderComponent = useMemo(() => {
    const components = isAdmin ? adminComponents : userComponents;
    const Component = components[selectedPage] || ErrorPage; // Default to ErrorPage if not found
    return <Component />;
  }, [selectedPage, isAdmin]);

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
