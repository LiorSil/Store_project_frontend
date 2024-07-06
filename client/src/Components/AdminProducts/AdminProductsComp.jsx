import React, { useState } from "react";
import AdminProductsListComp from "./AdminProductListComp";
import AddNewProductForm from "./AddNewProductForm";
import { Button, TextField, Container } from "@mui/material";
import ConfirmComp from "../Utils/ConfirmComp";

const AdminProductsComp = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [filter, setFilter] = useState("");

  const handleAddProduct = () => {
    setShowAddForm(true);
  };

  const handleConfirmAdd = () => {
    setConfirmMessage(true);
  };

  return (
    <Container>
      <h1>Admin Products</h1>
      <TextField
        label="Filter Products"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddProduct}>
        Add New Product
      </Button>
      {showAddForm && <AddNewProductForm onConfirm={handleConfirmAdd} />}
      <AdminProductsListComp filter={filter} />
      <ConfirmComp
        open={confirmMessage}
        onClose={() => setConfirmMessage(false)}
        onConfirm={() => {
          // Add confirm logic here
          setConfirmMessage(false);
        }}
        title="Confirm Add New Product"
        description="Are you sure you want to add this new product?"
      />
    </Container>
  );
};

export default AdminProductsComp;
