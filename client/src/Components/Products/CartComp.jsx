import React from "react";
import { Drawer, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CartComp = ({ isOpen, toggleCart }) => (
  <Drawer
    anchor="left"
    open={isOpen}
    onClose={toggleCart}
    sx={{ position: "fixed", top: 0, zIndex: 9999, height: "100vh" }}
  >
    <Box
      sx={{
        width: 300,
        padding: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
    >
      <Box>
        <IconButton onClick={toggleCart}>
          <CloseIcon />
        </IconButton>
        {/* Cart content goes here */}
      </Box>
      {/* Additional content or footer can go here */}
    </Box>
  </Drawer>
);

export default CartComp;
