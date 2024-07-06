import React, { useState } from "react";
import AdminProductsListComp from "./AdminProductListComp";
import AddNewProductForm from "./AddNewProductForm";
import { Button, TextField, Container } from "@mui/material";
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
      <AdminProductsListComp filters={filters} />
    </Container>
  );
};

export default AdminProductsComp;
