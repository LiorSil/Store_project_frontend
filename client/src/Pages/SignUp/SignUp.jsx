import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";

import { DevTool } from "@hookform/devtools";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { blue } from "@mui/material/colors";

import classes from "./SignUp.module.css";

const SignUp = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({});

  const onSubmit = (data) => console.log("DATA:", { ...data });
  return (
    <>
      <div className={classes[`registration-form`]}>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/** First Name Field*/}
              <TextField
                autoComplete="fname"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                noValidate
                {...register("firstName", {
                  required: "First name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "invalid first name",
                  },
                  validate: {
                    adminCheck: (value) =>
                      value !== "admin" || "admin is not allowed",
                    noSpecialCharacters: (value) =>
                      !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      "Special characters are not allowed",
                  },
                })}
              />
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </Grid>

            <br />

            {/** Last Name Field*/}

            <Grid item xs={12} sm={6}>
              {/** First Name Field*/}
              <TextField
                autoComplete="lname"
                name="lastName"
                fullWidth
                id="lastName"
                label="First Name"
                autoFocus
                noValidate
                {...register("lastName", {
                  required: "Last name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "invalid last name",
                  },
                  validate: {
                    adminCheck: (value) =>
                      value !== "admin" || "admin is not allowed",
                    noSpecialCharacters: (value) =>
                      !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      "Special characters are not allowed",
                  },
                })}
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
            </Grid>

            {/** username */}
            <Grid item xs={12}>
              <TextField
                autoComplete="uname"
                name="username"
                fullWidth
                id="username"
                label="UserName"
                autoFocus
                noValidate
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[A-Za-z0-9]{1,10}$/i,
                    message: "invalid username",
                  },
                  validate: {
                    adminCheck: (value) =>
                      value !== "admin" || "admin is not allowed",
                    noSpecialCharacters: (value) =>
                      !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      "Special characters are not allowed",
                  },
                })}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </Grid>

            {/** Password Field*/}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "invalid password",
                  },
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
              />
              {errors.password && <p>{errors.password.message}</p>}
            </Grid>
            <br />

            {/* set grid for checkbox */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Allow others to see my orders"
              />
            </Grid>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Grid>
        </Box>
      </div>

      <DevTool control={control} />
    </>
  );
};

export default SignUp;
