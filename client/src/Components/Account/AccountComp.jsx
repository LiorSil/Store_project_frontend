import React, { useEffect, useMemo, useState } from "react";
import LoadingComp from "../Utils/LoadingComp";
import { NoticeMessageComp, ConfirmComp } from "../Utils/indexUtil";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import classes from "./AccountComp.module.css";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setAccount, updateAccount } from "../../Redux/Reducers/accountReducer";

const AccountComp = () => {
  const cookies = useMemo(() => new Cookies(), []);

  //redux
  const dispatch = useDispatch();
  const { oldAccount, formData } = useSelector((state) => state.account);

  //loading state
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState({
    open: false,
    message: "",
    icon: "",
    color: "",
  });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleConfirmOrder = async () => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("token"),
        },
        body: JSON.stringify(formData),
      };

      const response = await fetch(
        "http://localhost:5000/users/updateUser",
        options
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(updateAccount(data));
        setOpenDialog(false);
        setNoticeMessage({
          open: true,
          message: "Successfully updated user",
          icon: CheckCircleIcon,
          color: "green",
        });
      }
    } catch (error) {
      console.error("Error updating user: ", error.message);
      setOpenDialog(false);
      setNoticeMessage({
        open: true,
        message: "Error updating user",
        icon: ErrorIcon,
        color: "red",
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Fetch user data and populate form fields
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      try {
        const response = await fetch("http://localhost:5000/users/getUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("token"),
          },
        });
        const data = await response.json();
        setValue("firstName", data.firstName);
        setValue("lastName", data.lastName);
        setValue("username", data.username);
        setValue("password", data.password);
        setValue("allowOrders", data.allowOrders);
        dispatch(setAccount(data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cookies, dispatch, setValue]);

  const handleOnSubmit = async (updatedAccountDetails) => {
    dispatch(updateAccount(updatedAccountDetails));
    handleOpenDialog();
  };

  const confirmDialog = (
    <ConfirmComp
      open={openDialog}
      onClose={handleCloseDialog}
      onConfirm={handleConfirmOrder}
      title="Confirm Order"
      description="Are you sure you want to place this order?"
    />
  );
  const noticeDialog = noticeMessage.open && (
    <NoticeMessageComp
      open={true}
      message={noticeMessage.message}
      IconComp={noticeMessage.icon}
      color={noticeMessage.color}
      onClose={() =>
        setNoticeMessage({
          open: false,
          message: "",
          icon: "",
          color: "",
        })
      }
    />
  );

  return (
    <>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          {confirmDialog}
          {noticeDialog}

          <Stack className={classes["account-form"]} direction="column">
            <Box
              component={"form"}
              onSubmit={handleSubmit(handleOnSubmit)}
              sx={{ mt: 3 }}
            >
              <Typography variant="h6" gutterBottom>
                Account Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must have at least 6 characters",
                      },
                    })}
                    type="password"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField {...register("username")} fullWidth disabled />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("allowOrders")}
                        defaultChecked={oldAccount.allowOrders}
                      />
                    }
                    label="Allow others to see my orders"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                Save
              </Button>
            </Box>
          </Stack>
        </>
      )}
    </>
  );
};

export default AccountComp;
