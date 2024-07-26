import React from "react";
import { Container, Box } from "@mui/material";
import AdminProductsList from "./AdminProductsList";
import AddNewProductForm from "./AddNewProductForm";
import useAdminProducts from "../../../hooks/admin/products/useAdminProducts"; // Adjust the path according to your project structure
import classes from "./AdminProducts.module.css"; // Import the CSS module

const AdminProducts = () => {
  const { categories } = useAdminProducts();

  return (
    <Container>
      <Box className={classes.container}>
        <AddNewProductForm categories={categories} />
      </Box>
      <AdminProductsList />
    </Container>
  );
};

export default AdminProducts;
