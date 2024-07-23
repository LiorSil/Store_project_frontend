import React from "react";
import { Box, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const EmptyCartMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontFamily: "Roboto",
        backgroundColor: "#f5f5f5",
        padding: 2,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <ShoppingCartOutlinedIcon sx={{ fontSize: 50, color: "grey.500" }} />
      <Typography
        variant="h6"
        sx={{
          marginTop: 2,
          color: "grey.700",
          fontWeight: "bold",
        }}
      >
        Your Cart is Empty
      </Typography>
      <Typography
        variant="body2"
        sx={{
          marginTop: 1,
          color: "grey.600",
        }}
      >
        Looks like you haven't added anything to your cart yet.
      </Typography>
    </Box>
  );
};

export default EmptyCartMessage;
