import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AdminProductsListComp from "./AdminProductListComp";
import AddNewProductForm from "./AddNewProductForm";
import { fetchCategoriesData } from "../../../Redux/Reducers/categoriesReducer";

/**
 * AdminProductsComp Component
 *
 * This component renders the admin interface for managing products. It includes
 * a form for adding new products and a list of existing products.
 */
const AdminProductsComp = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data || []);

  // Fetch categories data on component mount
  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mt: 2,
          ml: 2,
        }}
      >
        <AddNewProductForm categories={categories} />
      </Box>
      <AdminProductsListComp />
    </Container>
  );
};

export default AdminProductsComp;
