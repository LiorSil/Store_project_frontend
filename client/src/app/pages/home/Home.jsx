import React, { Suspense, lazy } from "react";
import { Box, CircularProgress } from "@mui/material";
import useUserAuth from "../../../hooks/pages/home/useUserAuth";
import usePageNavigation from "../../../hooks/pages/home/usePageNavigation";
import Statistics from "../../../components/admin/statistics/Statistics";
import NotFound from "../error/NotFound";
import Welcome from "./Welcome";
import NavBar from "./NavBar";
import classes from "./Home.module.css"; // Import the CSS module

const userComponents = {
  Products: lazy(() => import("../../../components/user/products/Products")),
  Orders: lazy(() => import("../../../components/user/orders/Orders")),
  Account: lazy(() => import("../../../components/user/account/Account")),
  Logout: lazy(() => import("./Logout")),
};

const adminComponents = {
  Categories: lazy(() =>
    import("../../../components/admin/categories/Categories")
  ),
  "Admin Products": lazy(() =>
    import("../../../components/admin/products/AdminProducts")
  ),
  Customers: lazy(() =>
    import("../../../components/admin/customers/Customers")
  ),
  Statistics: lazy(() =>
    import("../../../components/admin/statistics/Statistics")
  ),
  Logout: lazy(() => import("./Logout")),
};

const Home = () => {
  const { isAdmin } = useUserAuth();
  const { selectedPage, handleSelectedPage } = usePageNavigation(
    isAdmin,
    adminComponents,
    userComponents
  );

  const renderComponent = () => {
    const components = isAdmin ? adminComponents : userComponents;
    console.log("selectedPage", selectedPage);
    const Component = components[selectedPage] || NotFound;

    // Render the Welcome component if the user is not an admin and the selected page is Home
    if (!isAdmin && selectedPage === "Home") {
      return <Welcome onSelectedPage={handleSelectedPage} />;
    } else if (isAdmin && selectedPage === "Home") {
      return <Statistics />;
    } else {
      return (
        <Suspense
          fallback={
            <Box className={classes.suspense}>
              <CircularProgress />
            </Box>
          }
        >
          {Component === NotFound ? (
            <Component handleGoHome={handleSelectedPage} />
          ) : (
            <Component />
          )}
        </Suspense>
      );
    }
  };

  return (
    <>
      <NavBar
        pages={Object.keys(isAdmin ? adminComponents : userComponents)}
        onSelectedPage={handleSelectedPage}
        selectedPage={selectedPage}
      />
      <div className={classes.pageContent}>{renderComponent()}</div>
    </>
  );
};

export default Home;
