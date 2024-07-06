import React, { memo, useEffect, useMemo } from "react";
import AdminProductItem from "./AdminProductItem.jsx";
import LoadingComp from "../Utils/LoadingComp.jsx";

import { useSelector, useDispatch } from "react-redux";
import { fetchProductsData } from "../../Redux/Reducers/productsReducer.js";
import { fetchOrdersData } from "../../Redux/Reducers/ordersReducer.js";
import { Grid } from "@mui/material";
import getAllItems from "../Products/getAllItems.js";

const AdminProductsListComp = ({ filters }) => {
  const dispatch = useDispatch();

  const {
    productData: products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);
  const {
    ordersData: orders,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.orders);

  const orderData = getAllItems(orders);

  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchOrdersData());
  }, [dispatch]);

  return (
    <div>
      {(productsLoading || ordersLoading) && <LoadingComp />}
      {(productsError || ordersError) && <div>Error: {productsError}</div>}

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={6} sm={6} md={6} key={product.id}>
            <AdminProductItem
              key={product._id}
              product={product}
              orders={orderData.filter(
                (order) => order.productId === product._id
              )}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AdminProductsListComp;
