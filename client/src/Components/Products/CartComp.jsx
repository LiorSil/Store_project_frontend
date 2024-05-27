import React from "react";
import { Drawer, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CartComp = ({ isOpen, toggleCart }) => (
  <Drawer anchor="left" open={isOpen} onClose={toggleCart}>
    <Box sx={{ width: 300, padding: 2 }} role="presentation">
      <IconButton onClick={toggleCart}>
        <CloseIcon />
      </IconButton>
      {/* Cart content goes here */}
    </Box>
  </Drawer>
);

export default CartComp;
