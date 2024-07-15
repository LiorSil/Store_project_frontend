import React, { useEffect } from "react";
import AdminProductsListComp from "./AdminProductListComp";
import AddNewProductForm from "./AddNewProductForm";
import { Container, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesData } from "../../../Redux/Reducers/categoriesReducer";

const AdminProductsComp = () => {
  const dispatch = useDispatch();
  const { data: categories = [] } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  return (
    <Container>
      <Box
        sx={{ display: "flex", justifyContent: "left", mt: 2, marginLeft: 2 }}
      >
        <AddNewProductForm categories={categories} />
      </Box>
      <AdminProductsListComp />
    </Container>
  );
};

export default AdminProductsComp;
