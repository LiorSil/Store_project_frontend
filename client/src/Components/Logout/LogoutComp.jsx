import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmComp from "../Utils/ConfirmComp";
import Cookies from "universal-cookie";

const LogoutComp = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [confirmMessageDialog, setConfirmMessageDialog] = useState(true);
  const handleLogout = () => {
    // Clear cookies
    cookies.remove("token", { path: "/" });
    localStorage.clear();
    sessionStorage.clear();
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
