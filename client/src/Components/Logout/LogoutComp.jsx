import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
