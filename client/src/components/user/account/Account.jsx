import React, { lazy, Suspense } from "react";
import LoadingComp from "../../../utils/shared/Loading";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import {
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
} from "../../../utils/validators/account/accountIndex";
import classes from "./Account.module.css";
import useAccount from "../../../hooks/user/account/useAccount";

// Lazy load components
const LazyNoticeMessageComp = lazy(() =>
  import("../../../utils/shared/NoticeMessage")
);
const LazyConfirmComp = lazy(() => import("../../../utils/shared/Confirm"));

const Account = () => {
  const {
    register,
    handleSubmit,
    errors,
    isDirty,
    loading,
    confirmMessage,
    setConfirmMessage,
    noticeMessage,
    setNoticeMessage,
    handleConfirmOrder,
    handleOnSubmit,
  } = useAccount();

  const confirmDialog = (
    <Suspense fallback={<LoadingComp />}>
      <LazyConfirmComp
        open={confirmMessage}
        onClose={() => setConfirmMessage(false)}
        onConfirm={handleConfirmOrder}
        title="Confirm Order"
        description="Are you sure you want to update your account details?"
      />
    </Suspense>
  );

  const noticeDialog = noticeMessage.open && (
    <Suspense fallback={<LoadingComp />}>
      <LazyNoticeMessageComp
        open={true}
        message={noticeMessage.message}
        IconComp={
          noticeMessage.icon === "CheckCircleIcon" ? CheckCircleIcon : ErrorIcon
        }
        color={noticeMessage.color}
        onClose={() => {
          setNoticeMessage((prevMessage) => ({
            ...prevMessage,
            open: false,
          }));
          window.location.reload();
        }}
      />
    </Suspense>
  );

  return (
    <Suspense fallback={<LoadingComp />}>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          {confirmDialog}
          {noticeDialog}

          <Stack
            className={classes["account-form"]}
            direction="column"
            sx={{
              "@media (max-width: 768px)": {
                padding: 2,
              },
            }}
          >
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
                      validate: firstNameValidator,
                    })}
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    sx={{
                      "@media (max-width: 768px)": {
                        marginBottom: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("lastName", {
                      required: "Last name is required",
                      validate: lastNameValidator,
                    })}
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    sx={{
                      "@media (max-width: 768px)": {
                        marginBottom: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("password", {
                      required: "Password is required",
                      validate: passwordValidator,
                    })}
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{
                      "@media (max-width: 768px)": {
                        marginBottom: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("username")}
                    fullWidth
                    disabled
                    sx={{
                      "@media (max-width: 768px)": {
                        marginBottom: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("allowOthersToSeePurchasedProducts")}
                        defaultChecked={false}
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
                disabled={!isDirty}
              >
                Save
              </Button>
            </Box>
          </Stack>
        </>
      )}
    </Suspense>
  );
};

export default Account;
