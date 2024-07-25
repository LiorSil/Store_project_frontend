import React from "react";
import { Container, Box } from "@mui/material";
import AdminProductsList from "./AdminProductsList";
import AddNewProductForm from "./AddNewProductForm";
import useAdminProducts from "../../../hooks/admin/products/useAdminProducts"; // Adjust the path according to your project structure

const AdminProducts = () => {
  const { categories } = useAdminProducts();

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
      <AdminProductsList />
    </Container>
  );
};

export default AdminProducts;
