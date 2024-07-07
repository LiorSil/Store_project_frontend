import React, { useState } from "react";
import AdminProductsListComp from "./AdminProductListComp";
import AddNewProductForm from "./AddNewProductForm";
import { Button, TextField, Container, Box } from "@mui/material";
import ConfirmComp from "../Utils/ConfirmComp";

const AdminProductsComp = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [filters, setFilters] = useState("");

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
        <AddNewProductForm />
      </Box>
      <AdminProductsListComp filters={filters} />
    </Container>
  );
};

export default AdminProductsComp;
