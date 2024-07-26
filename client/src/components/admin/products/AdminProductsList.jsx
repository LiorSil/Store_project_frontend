import React, { Suspense, lazy, useCallback } from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import useAdminProductsList from "../../../hooks/admin/products/useAdminProductsList"; // Adjust the path according to your project structure
import LoadingPlaceholder from "./LoadingPlaceholder";
import classes from "./AdminProductsList.module.css"; // Import the CSS module

const AdminProductItem = lazy(() => import("./AdminProductItem"));

const AdminProductsList = () => {
  const { products, customers, processedOrders, renderCount } =
    useAdminProductsList();

  const renderProductItem = useCallback(
    (product, index) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        key={product._id}
        className={classes.gridItem}
      >
        {index < renderCount ? (
          <Suspense fallback={<CircularProgress />}>
            <AdminProductItem
              product={product}
              orders={processedOrders.filter(
                (order) => order.productId === product._id
              )}
              customers={customers}
            />
          </Suspense>
        ) : (
          <LoadingPlaceholder />
        )}
      </Grid>
    ),
    [renderCount, processedOrders, customers]
  );

  return (
    <Box className={classes.container}>
      <Grid container spacing={1}>
        {products.map(renderProductItem)}
      </Grid>
    </Box>
  );
};

export default React.memo(AdminProductsList);
