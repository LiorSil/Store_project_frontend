import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledDialog = styled(Box)({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9999,
  width: 300,
  padding: 20,
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  backgroundColor: "#fff",
  textAlign: "center",
});

const NoticeMessageComp = ({ message, onClose, color, IconComp }) => {
  const IconComponent = styled(IconComp)(({ color }) => ({
    color: color || "green", // Default to green if color prop is not provided
    fontSize: 48,
    marginBottom: 20,
  }));

  const handleClose = () => {
    onClose();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StyledDialog>
        <IconComponent
          color={color}
          styled={{
            fontSize: 48,
            marginBottom: 20,
          }}
        />{" "}
        {/* Render the chosen icon component */}
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {message}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClose}>
          OK
        </Button>
      </StyledDialog>
    </Box>
  );
};

export default NoticeMessageComp;
