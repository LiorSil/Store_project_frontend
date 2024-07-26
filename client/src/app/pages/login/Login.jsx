import React from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import classes from "./Login.module.css";
import LoadingComp from "../../../utils/shared/Loading";
import NoticeMessageComp from "../../../utils/shared/NoticeMessage";
import useLogin from "../../../hooks/pages/login/useLogin";

function Login() {
  const {
    register,
    handleSubmit,
    errors,
    loading,
    noticeMessage,
    onSubmit,
    onGuestLogin,
    handleSignUpRedirect,
    closeNoticeMessage,
  } = useLogin();

  return (
    <Container component="main" maxWidth="xs">
      {loading && <LoadingComp />}
      {noticeMessage.open && (
        <NoticeMessageComp
          open={noticeMessage.open}
          message={noticeMessage.message}
          color={noticeMessage.color}
          IconComp={noticeMessage.icon}
          onClose={closeNoticeMessage}
        />
      )}
      <Box className={classes["login-form"]}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography component="h1" variant="h5" margin={2}>
            Sign in
          </Typography>
          <Typography component="h2" variant="subtitle1" margin={2}>
            for Admin: username: admin, password: admin
          </Typography>
          <Typography component="h3" variant="subtitle2" margin={2}>
            To wake up the server you have to wait longer than usual at the
            first login.
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
                disabled={loading}
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
            <Grid item xs={12} container justifyContent="center">
              <Grid item xs={8}>
                <Button
                  startIcon={<PersonOutlineIcon />}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={onGuestLogin}
                >
                  Guest Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
