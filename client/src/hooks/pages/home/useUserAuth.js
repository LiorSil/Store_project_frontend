// src/hooks/useUserAuth.js

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const useUserAuth = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const navigate = useNavigate();

  const isAdmin = cookies.get("isAdmin");
  const token = cookies.get("token");

  if (isAdmin === undefined || token === undefined) {
    alert("You are not logged in!");
    navigate("/login", { replace: true });
  }

  return { isAdmin };
};

export default useUserAuth;
