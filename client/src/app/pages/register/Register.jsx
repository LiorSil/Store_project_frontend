import React, { lazy, Suspense } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Stack,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import classes from "./Register.module.css";
import Loading from "../../../utils/shared/Loading";
import useRegister from "../../../hooks/pages/register/useRegister";  
import { Controller } from "react-hook-form";
import {
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
  usernameValidator,
} from "../../../utils/validators/account/accountIndex";

const LazyNoticeMessage = lazy(() =>
  import("../../../utils/shared/NoticeMessage")
);

const Register = () => {
  const customTheme = createTheme({
    breakpoints: { values: { smallScreenMobile: 480 } },
  });
  const isSmallScreen = useMediaQuery(
    customTheme.breakpoints.down("smallScreenMobile")
  );

  const {
    register,
    control,
    handleSubmit,
    errors,
    loading,
    noticeMessage,
    onSubmit,
    closeNoticeMessage,
  } = useRegister();

  const noticeDialog = noticeMessage.open && (
    <Suspense fallback={<Loading />}>
      <LazyNoticeMessage
        open={true}
        message={noticeMessage.message}
        IconComp={noticeMessage.icon}
        color={noticeMessage.color}
        onClose={closeNoticeMessage}
      />
    </Suspense>
  );

  return (
    <>
      {noticeDialog}
      {loading && <Loading />}
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

            <Grid item xs={12} sm={6}>
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
            </Grid>

            <Grid item xs={12}>
              <Grid container justifyContent="space-between">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: isSmallScreen ? 125 : 150,
                    fontSize: isSmallScreen ? "0.9rem" : "1.1rem",
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: isSmallScreen ? 125 : 150,
                    fontSize: isSmallScreen ? "0.9rem" : "1.1rem",
                  }}
                  onClick={() => closeNoticeMessage}
                >
                  Back to Login
                </Button>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography variant="body2" color="textSecondary">
                  Password must contain at least one lowercase letter, one
                  uppercase letter, one number, and be at least 6 characters
                  long.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default Register;
