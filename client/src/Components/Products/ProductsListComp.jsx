import React from "react";
import { Box, Typography } from "@mui/material";

const ProductsListComp = () => (
  <Box sx={{ flex: 1, padding: 2, backgroundColor: "#f8f8f8" }}>
    <Typography variant="h4" gutterBottom>
      Products
    </Typography>
    {/* List of products goes here */}
  </Box>
);

export default ProductsListComp;
