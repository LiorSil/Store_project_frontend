import React from "react";
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
import { DevTool } from "@hookform/devtools";

import classes from "./SignUpPage.module.css";

const SignUpPage = () => {
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
      const response = await fetch("http://localhost:5000/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Sign up successful");
        navigate("/login");
      } else {
        alert("Sign up failed");
      }
    } catch (error) {
      console.error("Error occurred during sign up:", error);
    }
  };
  return (
    <>
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
                  validate: {
                    adminCheck: (value) =>
                      value !== "admin" || "admin is not allowed",
                    noSpecialCharacters: (value) =>
                      !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      "Special characters are not allowed",
                    atLeastTwoLetters: (value) =>
                      value.length >= 2 ||
                      "First name must be at least 2 characters",
                  },
                })}
                error={errors.firstName ? true : false}
              />
              {errors.firstName && <p>{errors.firstName.message}</p>}
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
                  validate: {
                    adminCheck: (value) =>
                      value !== "admin" || "admin is not allowed",
                    noSpecialCharacters: (value) =>
                      !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      "Special characters are not allowed",
                    atLeastTwoLetters: (value) =>
                      value.length >= 2 ||
                      "Last name must be at least 2 characters",
                  },
                })}
                error={errors.lastName ? true : false}
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
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
                  validate: {
                    adminCheck: (value) =>
                      !value.startsWith("admin") || "admin is not allowed",
                    noSpecialCharacters: (value) =>
                      !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      "Special characters are not allowed",
                    atLeastFourCharacters: (value) =>
                      value.length >= 4 ||
                      "Username must be at least 4 characters",
                  },
                })}
                error={errors.username ? true : false}
              />
              {errors.username && <p>{errors.username.message}</p>}
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

                  validate: {
                    minLength: (value) =>
                      value.length >= 8 ||
                      "Password must be at least 8 characters",
                    atLeastOneUppercase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password must contain at least one uppercase letter",
                    atLeastOneLowercase: (value) =>
                      /[a-z]/.test(value) ||
                      "Password must contain at least one lowercase letter",
                    atLeastOneDigit: (value) =>
                      /[0-9]/.test(value) ||
                      "Password must contain at least one number",
                    atLeastOneSpecialCharacter: (value) =>
                      /[@$!%*?&]/.test(value) ||
                      "Password must contain at least one special character",
                  },
                })}
                noValidate
                error={errors.password ? true : false}
              />
              {errors.password && <p>{errors.password.message}</p>}
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

      <DevTool control={control} />
    </>
  );
};

export default SignUpPage;
