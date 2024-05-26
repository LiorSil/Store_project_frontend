import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarComp from "../../Components/NavBar/NavBarComp";
import ProductsComp from "../../Components/Products/ProductsComp";
import OrdersComp from "../../Components/Orders/OrdersComp";
import LogoutComp from "../../Components/Logout/LogoutComp";
import AccountComp from "../../Components/Account/AccountComp";
import ErrorPage from "../../Pages/Error/ErrorPage";

const HomePage = () => {
  const pages = useMemo(() => ["Products", "Orders", "Account", "Logout"], []);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(null);

  const currentPath = useMemo(() => {
    const path = location.pathname.split("/").pop();

    return path.charAt(0).toUpperCase() + path.slice(1);
  }, [location.pathname]);

  useEffect(() => {
    if (pages.includes(currentPath)) {
      setSelectedPage(currentPath);
    } else {
      setSelectedPage(null); // Reset selectedPage if the path is not found in pages array
    }
  }, [currentPath, pages]);

  const handleSelectedPage = (page) => {
    setSelectedPage(page);
    navigate(`/home/${page.toLowerCase()}`);
  };

  const renderComponent = useMemo(() => {
    switch (selectedPage) {
      case null:
        return <div>Home</div>;
      case "Products":
        return <ProductsComp />;
      case "Orders":
        return <OrdersComp />;
      case "Account":
        return <AccountComp />;
      case "Logout":
        return <LogoutComp />;
      default:
        return <ErrorPage />; // Render ErrorPage for non-existent pages
    }
  }, [selectedPage]);

  return (
    <>
      <NavBarComp
        pages={pages}
        onSelectedPage={handleSelectedPage}
        selectedPage={selectedPage}
      />
      {renderComponent}
    </>
  );
};

export default HomePage;
