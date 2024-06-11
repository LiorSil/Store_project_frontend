import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIcon from "@mui/icons-material/Assignment";
import classes from "./LoginPage.module.css";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box,
} from "@mui/material";

function LoginPage() {
  const cookies = new Cookies();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const resp = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (resp.ok) {
      const { token } = await resp.json();
      const decodedToken = jwtDecode(token);
      cookies.set("token", token, {
        expires: new Date(decodedToken.exp * 1000),
      });

      navigate("/home");
    } else {
      alert("Login failed");
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/SignUp");
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box className={classes["login-form"]}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography component="h1" variant="h5" margin={2}>
              Sign in
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  fullWidth
                  id="username"
                  label="Username"
                  variant="outlined"
                  {...register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "Invalid username address",
                    },
                  })}
                  error={!!errors.username}
                  helperText={errors.username ? errors.username.message : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<LoginIcon />}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<AssignmentIcon />}
                  onClick={handleSignUpRedirect}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
      <DevTool control={control} />
    </>
  );
}

export default LoginPage;