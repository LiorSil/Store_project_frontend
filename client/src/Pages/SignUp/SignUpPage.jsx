import React, { lazy, Suspense, useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
  usernameValidator,
} from "../../Components/Utils/Validators/accountDetailsValidators/userIndexValidator";

import classes from "./SignUpPage.module.css";
import API_BASE_URL from "../../Constants/serverUrl";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import LoadingComp from "../../Components/Utils/LoadingComp";

const LazyNoticeMessageComp = lazy(() =>
  import("../../Components/Utils/NoticeMessageComp")
);

const SignUpPage = () => {
  const [noticeMessage, setNoticeMessage] = useState({ open: false });
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const onSubmit = async (data) => {
    data = { customerRegisterDate: new Date().toISOString(), ...data };
    try {
      const response = await fetch(`${API_BASE_URL}/users/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setNoticeMessage({
          open: true,
          message: "Successfully updated user",
          icon: CheckCircleIcon,
          color: "green",
        });
      } else {
        setNoticeMessage({
          open: true,
          message: "Failed to update user",
          icon: ErrorIcon,
          color: "red",
        });
      }
    } catch (error) {
      console.error("Error occurred during sign up:", error);
    }
  };

  const noticeDialog = noticeMessage.open && (
    <Suspense fallback={<LoadingComp />}>
      <LazyNoticeMessageComp
        open={true}
        message={noticeMessage.message}
        IconComp={noticeMessage.icon}
        color={noticeMessage.color}
        onClose={() => {
          setNoticeMessage((prevMessage) => ({
            ...prevMessage,
            open: false,
          }));
          navigate("/login");
        }}
      />
    </Suspense>
  );
  return (
    <>
      {noticeDialog}
      <Stack className={classes[`registration-form`]} direction="column">
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/** First Name Field*/}
              <TextField
                name="firstName"
                id="firstName"
                label="First Name"
                noValidate
                {...register("firstName", {
                  required: "First name is required",
                  validate: firstNameValidator,
                })}
                error={errors.firstName ? true : false}
                helperText={errors.firstName?.message}
              />
            </Grid>

            <br />

            {/** Last Name Field*/}

            <Grid item xs={12} sm={6}>
              {/** First Name Field*/}
              <TextField
                name="lastName"
                fullWidth
                id="lastName"
                label="Last Name"
                noValidate
                {...register("lastName", {
                  required: "Last name is required",
                  validate: lastNameValidator,
                })}
                error={errors.lastName ? true : false}
                helperText={errors.lastName?.message}
              />
            </Grid>

            {/* /** username  */}
            <Grid item xs={12}>
              <TextField
                name="username"
                fullWidth
                id="username"
                label="UserName"
                noValidate
                {...register("username", {
                  required: "Username is required",
                  validate: usernameValidator,
                })}
                error={errors.username ? true : false}
                helperText={errors.username?.message}
              />
            </Grid>

            {/** Password Field */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",

                  validate: passwordValidator,
                })}
                noValidate
                error={errors.password ? true : false}
                helperText={errors.password?.message}
              />
            </Grid>
            <br />

            {/* set grid for checkbox */}
            <Grid item xs={12}>
              <Controller
                name="allowOthersToSeePurchasedProducts"
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                      />
                    }
                    label="Allow others to see my orders"
                  />
                )}
              />

              <Grid item xs={12}>
                <Grid container justifyContent="space-between">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: 150 }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="text"
                    color="primary"
                    sx={{ mt: 3, mb: 2, width: 150 }}
                    onClick={() => navigate("/login")}
                  >
                    Back to Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default SignUpPage;
