import React, {
  useEffect,
  Suspense,
  lazy,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsData } from "../../Redux/Reducers/productsReducer.js";
import { fetchOrdersData } from "../../Redux/Reducers/ordersReducer.js";
import { fetchCategoriesData } from "../../Redux/Reducers/categoriesReducer";
import { Grid, Box, CircularProgress } from "@mui/material";
import LoadingPlaceholder from "./LoadingPlaceholder";
import getAllItems from "./getAllItems.js";

const AdminProductItem = lazy(() => import("./AdminProductItem.jsx"));

const AdminProductsListComp = () => {
  const dispatch = useDispatch();
  const [renderCount, setRenderCount] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);

  const products = useSelector((state) => state.products.productData) || [];
  const orders = useSelector((state) => state.orders.ordersData);
  const [dataChange, setDataChange] = useState(false)

  const fetchData = useCallback(async () => {
    await Promise.all([
      dispatch(fetchProductsData()),
      dispatch(fetchOrdersData()),
      dispatch(fetchCategoriesData()),
    ]);
    setDataFetched(true);
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //add artificial delay to simulate loading
  useEffect(() => {
    if (dataFetched && renderCount < products.length) {
      const interval = setInterval(() => {
        setRenderCount((prev) => (prev < products.length ? prev + 1 : prev));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [dataFetched, renderCount, products.length]);

  const ordersData = useMemo(() => getAllItems(orders), [orders]);

  const renderProductItem = useCallback(
    (product, index) => (
      <Grid item xs={12} sm={6} md={4} key={product._id}>
        {index < renderCount ? (
          <Suspense fallback={<CircularProgress />}>
            <AdminProductItem
              product={product}
              orders={ordersData.filter(
                (order) => order.productId === product._id
              )}
              
            />
          </Suspense>
        ) : (
          <LoadingPlaceholder />
        )}
      </Grid>
    ),
    [renderCount, ordersData]
  );

  return (
    <Box>
      <Grid container spacing={2}>
        {products.map(renderProductItem)}
      </Grid>
    </Box>
  );
};

export default React.memo(AdminProductsListComp);
