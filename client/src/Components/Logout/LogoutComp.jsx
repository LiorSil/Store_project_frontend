import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ConfirmComp from "../Utils/ConfirmComp";
import Cookies from "universal-cookie";

const LogoutComp = () => {
  const navigate = useNavigate();
  const [confirmMessageDialog, setConfirmMessageDialog] = useState(true);

  const handleLogout = () => {
    const cookies = new Cookies();
    const allCookies = cookies.getAll();

    // Loop through all cookies and remove them
    Object.keys(allCookies).forEach((cookieName) => {
      // Remove cookies with different paths and domains
      cookies.remove(cookieName, { path: "/" });
      cookies.remove(cookieName, {
        path: "/",
        domain: window.location.hostname,
      });
      cookies.remove(cookieName);
    });

    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Navigate to the login page
    navigate("/login", { replace: true });
  };

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
        onConfirm={handleLogout}
        title="Logout"
        description="Are you sure you want to logout?"
      />
    </>
  );
};

export default LogoutComp;
