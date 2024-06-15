import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmComp from "../Utils/ConfirmComp";
import Cookies from "universal-cookie";

const LogoutComp = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear cookies
    cookies.remove("token", { path: "/" });
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <>
      <ConfirmComp
        open={true}
        onClose={handleCancel}
        onConfirm={handleLogout}
        title="Logout"
        description="Are you sure you want to logout?"
      />
    </>
  );
};

export default LogoutComp;
