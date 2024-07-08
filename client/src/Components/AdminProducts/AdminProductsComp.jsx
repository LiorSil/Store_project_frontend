import React, { useEffect, useState } from "react";
import AdminProductsListComp from "./AdminProductListComp";
import AddNewProductForm from "./AddNewProductForm";
import { Button, TextField, Container, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesData } from "../../Redux/Reducers/categoriesReducer";
import ConfirmComp from "../Utils/ConfirmComp";

const AdminProductsComp = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [filters, setFilters] = useState("");

  const dispatch = useDispatch();
  const { data: categories = [] } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  const handleAddProduct = () => {
    setShowAddForm(true);
  };

  const handleConfirmAdd = () => {
    setConfirmMessage(true);
  };

  return (
    <Container>
      <Box
        sx={{ display: "flex", justifyContent: "left", mt: 2, marginLeft: 2 }}
      >
        <AddNewProductForm categories={categories} />
      </Box>
      <AdminProductsListComp filters={filters} />
    </Container>
  );
};

export default AdminProductsComp;
