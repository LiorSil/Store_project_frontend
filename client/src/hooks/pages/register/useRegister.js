//src/hooks/pages/register/useRegister.js

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useFetch from "../../../hooks/useFetch"; // Adjust the path accordingly
import API_BASE_URL from "../../../constants/serverUrl";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const useRegister = () => {
  const [noticeMessage, setNoticeMessage] = useState({ open: false });
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const { data, loading, error, fetchData } = useFetch();

  const onSubmit = useCallback(
    async (formData) => {
      const data = {
        customerRegisterDate: new Date().toISOString(),
        ...formData,
      };
      await fetchData(`${API_BASE_URL}/users/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    [fetchData]
  );

  useEffect(() => {
    if (data) {
      setNoticeMessage({
        open: true,
        message: "Successfully registered user",
        icon: CheckCircleIcon,
        color: "green",
      });
    }
    if (error) {
      setNoticeMessage({
        open: true,
        message: "Failed to register user",
        icon: ErrorIcon,
        color: "red",
      });
    }
  }, [data, error]);

  const closeNoticeMessage = useCallback(() => {
    setNoticeMessage((prevMessage) => ({
      ...prevMessage,
      open: false,
    }));
    navigate("/login");
  }, [navigate]);

  return {
    register,
    control,
    handleSubmit,
    errors,
    loading,
    noticeMessage,
    onSubmit,
    closeNoticeMessage,
  };
};

export default useRegister;
