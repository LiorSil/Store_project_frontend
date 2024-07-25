import React, { Suspense, lazy, useCallback } from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import useAdminProductsList from "../../../hooks/admin/products/useAdminProductsList"; // Adjust the path according to your project structure
import LoadingPlaceholder from "./LoadingPlaceholder";

const AdminProductItem = lazy(() => import("./AdminProductItem"));

/**
 * AdminProductsList Component
 *
 * This component fetches and displays a list of products for the admin.
 * It handles data fetching for products, orders, categories, and users,
 * and renders each product item with its associated orders and customers.
 */
const AdminProductsList = () => {
  const { products, customers, processedOrders, renderCount } =
    useAdminProductsList();

  const renderProductItem = useCallback(
    (product, index) => (
      <Grid item xs={12} sm={6} md={4} key={product._id}>
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
    <Box>
      <Grid container spacing={2}>
        {products.map(renderProductItem)}
      </Grid>
    </Box>
  );
};

export default React.memo(AdminProductsList);
