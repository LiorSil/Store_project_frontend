import React, {
  useEffect,
  Suspense,
  lazy,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsData } from "../../../redux/reducers/products";
import { fetchOrdersData } from "../../../redux/reducers/orders";
import { fetchCategoriesData } from "../../../redux/reducers/categories";
import { fetchUsersAndProductsData } from "../../../redux/reducers/user";
import { Grid, Box, CircularProgress } from "@mui/material";
import LoadingPlaceholder from "./LoadingPlaceholder";
import getAllItems from "./getAllItems";

const AdminProductItem = lazy(() => import("./AdminProductItem"));

/**
 * AdminProductsList Component
 *
 * This component fetches and displays a list of products for the admin.
 * It handles data fetching for products, orders, categories, and users,
 * and renders each product item with its associated orders and customers.
 */
const AdminProductsList = () => {
  const dispatch = useDispatch();
  const [renderCount, setRenderCount] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);

  const products = useSelector((state) => state.products.productsData);
  const customers = useSelector((state) => state.users.customers);
  const orders = useSelector((state) => state.orders.ordersData);

  /**
   * Fetch all necessary data when the component mounts.
   * Uses useCallback to memoize the fetch function.
   */
  const fetchData = useCallback(async () => {
    try {
      await Promise.all([
        dispatch(fetchProductsData()),
        dispatch(fetchOrdersData()),
        dispatch(fetchCategoriesData()),
        dispatch(fetchUsersAndProductsData()),
      ]);
      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [dispatch]);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * Incrementally render product items for better performance.
   */
  useEffect(() => {
    if (dataFetched && renderCount < products.length) {
      const interval = setInterval(() => {
        setRenderCount((prevCount) =>
          prevCount < products.length ? prevCount + 1 : prevCount
        );
      }, 200);
      return () => clearInterval(interval);
    }
  }, [dataFetched, renderCount, products.length]);

  const processedOrders = useMemo(() => getAllItems(orders), [orders]);

  /**
   * Render a product item or a loading placeholder based on the render count.
   *
   * @param {Object} product - The product data.
   * @param {number} index - The index of the product in the list.
   */
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
