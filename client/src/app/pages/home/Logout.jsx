import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ConfirmComp from "../../../utils/shared/Confirm";
import useLogout from "../../../hooks/pages/home/useLogout";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [confirmMessageDialog, setConfirmMessageDialog] = useState(true);

  const handleCancel = () => {
    setConfirmMessageDialog(false);
    navigate("/home");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
          backgroundColor: "#f4f6f8",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: -1,
        }}
      >
        <Typography variant="h4" component="h1">
          Are you leaving?
        </Typography>
      </Box>
      <ConfirmComp
        open={confirmMessageDialog}
        onClose={handleCancel}
        onConfirm={logout}
        title="Logout"
        description="Are you sure you want to logout?"
      />
    </>
  );
};

export default Logout;
