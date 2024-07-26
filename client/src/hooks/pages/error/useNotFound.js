// src/hooks/pages/error/useNotFound.js

import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const useNotFound = () => {
  const navigate = useNavigate();

  const handleGoLoginPage = () => {
    const cookies = new Cookies();
    const allCookies = cookies.getAll();

    // Loop through all cookies and remove them
    Object.keys(allCookies).forEach((cookieName) => {
      cookies.remove(cookieName, { path: "/" });
    });

    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Navigate to the login page
    navigate("/login", { replace: true });
  };

  return { handleGoLoginPage };
};

export default useNotFound;
