// src/hooks/useAdminProducts.js

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesData } from "../../../redux/reducers/categories"; // Adjust the path according to your project structure

const useAdminProducts = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data || []);

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  return { categories };
};

export default useAdminProducts;
