import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIcon from "@mui/icons-material/Assignment";
import classes from "./Login.module.css";

import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box,
} from "@mui/material";

function Login() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    // Handle login logic here
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
                  name="email"
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
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

export default Login;
