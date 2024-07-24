import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
import ErrorPage from "../error/Error";
import { Products, Orders, Account } from "../../../components/userComponents";

import {
  Categories,
  AdminProducts,
  Customers,
  Statistics,
} from "../../../components/adminComponents";
import Logout from "./Logout";
import NavBar from "./NavBar";
import styles from "./Home.module.css"; // Import the CSS module
import Welcome from "./Welcome";

const userComponents = {
  Products,
  Orders,
  Account,
  Logout,
};

const adminComponents = {
  Categories,
  "Admin Products": AdminProducts,
  Customers,
  Statistics,
  Logout,
};

const Home = () => {
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
      return <Welcome onSelectedPage={handleSelectedPage} />;
    } else if (isAdmin && location.pathname === "/home") {
      return <Statistics />;
    } else {
      const Component = components[selectedPage] || ErrorPage; // Default to ErrorPage if not found

      return <Component />;
    }
  }, [isAdmin, location.pathname, selectedPage, handleSelectedPage]);

  return (
    <>
      <NavBar
        pages={Object.keys(isAdmin ? adminComponents : userComponents)}
        onSelectedPage={handleSelectedPage}
        selectedPage={selectedPage}
      />

      <div className={styles.pageContent}>{renderComponent}</div>
    </>
  );
};

export default Home;
