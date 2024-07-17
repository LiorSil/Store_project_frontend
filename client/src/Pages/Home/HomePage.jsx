import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
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
  "Admin Products": AdminProductsComp,
  Customers: AdminCustomersComp,
  Statistics: AdminStatisticsComp,
  Logout: LogoutComp,
};

const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100vw" },
};

const pageTransition = {
  type: "spring",
  stiffness: 200,
  damping: 25,
};

const HomePage = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const isAdmin = cookies.get("isAdmin");
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
    //if path /home then render WelcomePage
    if (!isAdmin && location.pathname === "/home") {
      console.log("isAdmin", isAdmin);

      return <WelcomePage onSelectedPage={handleSelectedPage} />;
    } else {
      const Component = components[selectedPage] || ErrorPage; // Default to ErrorPage if not found

      return <Component />;
    }
  }, [selectedPage, isAdmin, location.pathname]);

  return (
    <>
      <NavBarComp
        pages={Object.keys(isAdmin ? adminComponents : userComponents)}
        onSelectedPage={handleSelectedPage}
        selectedPage={selectedPage}
      />
      <Container>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Box
              sx={{
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "#f4f6f8",
                marginTop: 2,
              }}
            >
              {renderComponent}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Container>
    </>
  );
};

export default HomePage;
