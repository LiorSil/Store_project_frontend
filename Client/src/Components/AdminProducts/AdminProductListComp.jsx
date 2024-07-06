import React, { useEffect, Suspense } from "react";
import LoadingComp from "../Utils/LoadingComp.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsData } from "../../Redux/Reducers/productsReducer.js";
import { fetchOrdersData } from "../../Redux/Reducers/ordersReducer.js";
import { fetchCategoriesData } from "../../Redux/Reducers/categoriesReducer";
import { Grid, Box, Typography } from "@mui/material";
import getAllItems from "./getAllItems.js";

const AdminProductItem = React.lazy(() => import("./AdminProductItem.jsx"));

const AdminProductsListComp = ({ filters }) => {
  const dispatch = useDispatch();

  const {
    productData: products = [],
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);
  const {
    ordersData: orders = [],
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.orders);
  const {
    data: categories = [],
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchOrdersData());
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  const ordersData = getAllItems(orders);
  if (productsLoading || ordersLoading || categoriesLoading) {
    return <LoadingComp />;
  }

  if (productsError || ordersError || categoriesError) {
    return (
      <Typography color="error">
        Error: {productsError || ordersError || categoriesError}
      </Typography>
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Suspense fallback={<LoadingComp />}>
              <AdminProductItem
                product={product}
                orders={ordersData.filter(
                  (order) => order.productId === product._id
                )}
                categories={categories}
              />
            </Suspense>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(AdminProductsListComp);
