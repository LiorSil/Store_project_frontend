// src/hooks/useAdminProductsList.js

import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../../../redux/reducers/products";
import { fetchOrdersData } from "../../../redux/reducers/orders";
import { fetchCategoriesData } from "../../../redux/reducers/categories";
import { fetchUsersAndProductsData } from "../../../redux/reducers/user";
import getAllItems from "../../../components/admin/products/getAllItems"; // Adjust the path according to your project structure

const useAdminProductsList = () => {
  const dispatch = useDispatch();
  const [renderCount, setRenderCount] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);

  const products = useSelector((state) => state.products.productsData);
  const customers = useSelector((state) => state.users.customers);
  const orders = useSelector((state) => state.orders.ordersData);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  return {
    products,
    customers,
    processedOrders,
    renderCount,
  };
};

export default useAdminProductsList;
