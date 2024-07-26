//src/hooks/pages/login/useLogin.js
import { useEffect, useMemo, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import useFetch from "../../../hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from "../../../constants/serverUrl";
import ErrorIcon from "@mui/icons-material/Error";

const useLogin = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const [noticeMessage, setNoticeMessage] = useState({
    open: false,
    message: "",
    color: "",
    icon: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { data, loading, error, fetchData } = useFetch();

  const onSubmit = useCallback(
    (formData) => {
      fetchData(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    },
    [fetchData]
  );

  const onGuestLogin = useCallback(() => {
    fetchData(`${API_BASE_URL}/users/guest`, {
      method: "POST",
    });
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      const { token } = data;
      const decodedToken = jwtDecode(token);

      cookies.remove("token");
      cookies.remove("isAdmin");

      cookies.set("token", token, {
        expires: new Date(decodedToken.exp * 1000),
      });

      cookies.set("isAdmin", decodedToken.isAdmin, {
        expires: new Date(decodedToken.exp * 1000),
      });

      navigate("/home");
    }
  }, [data, cookies, navigate]);

  useEffect(() => {
    if (error) {
      setNoticeMessage({
        open: true,
        message: error.message,
        color: "red",
        icon: ErrorIcon,
      });
    }
  }, [error]);

  const handleSignUpRedirect = useCallback(() => {
    navigate("/SignUp");
  }, [navigate]);

  const closeNoticeMessage = useCallback(() => {
    setNoticeMessage({
      open: false,
      message: "",
      color: "",
      icon: null,
    });
  }, []);

  return {
    register,
    handleSubmit,
    errors,
    loading,
    noticeMessage,
    onSubmit,
    onGuestLogin,
    handleSignUpRedirect,
    closeNoticeMessage,
  };
};

export default useLogin;
