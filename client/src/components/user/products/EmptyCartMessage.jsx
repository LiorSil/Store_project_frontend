import React from "react";
import { Box, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import classes from "./EmptyCartMessage.module.css";

const EmptyCartMessage = () => {
  return (
    <Box className={classes.container}>
      <ShoppingCartOutlinedIcon className={classes.icon} />
      <Typography variant="h6" className={classes.title}>
        Your Cart is Empty
      </Typography>
      <Typography variant="body2" className={classes.message}>
        Looks like you haven't added anything to your cart yet.
      </Typography>
    </Box>
  );
};

export default EmptyCartMessage;
