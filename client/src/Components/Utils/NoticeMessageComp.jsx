import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Importing CheckCircleIcon from MUI

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

const GreenCheckCircleIcon = styled(CheckCircleIcon)({
  color: "green",
  fontSize: 48,
  marginBottom: 20,
});

const NoticeMessageComp = ({ message, onClose }) => {
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
        <GreenCheckCircleIcon /> {/* Green CheckCircleIcon added here */}
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
