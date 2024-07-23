import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import LoadingComp from "../../../utils/shared/Loading";
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
import { useForm, useFormState } from "react-hook-form";
import classes from "./Account.module.css";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setAccount, updateAccount } from "../../../redux/reducers/account";
import {
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
} from "../../../utils/validators/account/accountIndex";
import API_BASE_URL from "../../../constants/serverUrl";
import { createSelector } from "reselect";

// Lazy load components
const LazyNoticeMessageComp = lazy(() =>
  import("../../../utils/shared/NoticeMessage")
);
const LazyConfirmComp = lazy(() => import("../../../utils/shared/Confirm"));

// Memoized selector using reselect
const selectAccountState = createSelector(
  (state) => state.account,
  (account) => ({
    oldAccount: account.oldAccount,
    formData: account.formData,
  })
);

const Account = () => {
  // Create a memoized instance of Cookies to avoid re-instantiation on every render
  const cookies = useMemo(() => new Cookies(), []);

  // Redux hooks
  const dispatch = useDispatch();
  const { oldAccount, formData } = useSelector(selectAccountState);

  // Form management using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: oldAccount,
  });

  // Get the dirty state of the form
  const { isDirty } = useFormState({ control });

  // Component state for loading, confirmation dialog, and notice message
  const [loading, setLoading] = useState(true);
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState({ open: false });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/getUser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("token"),
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (typeof data !== "object" || Array.isArray(data)) {
          throw new Error("Invalid data format");
        }

        // Batch updating form values
        Object.keys(data).forEach((key) => {
          setValue(key, data[key]);
        });

        dispatch(setAccount(data));
      } catch (error) {
        console.error("Error fetching user data: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cookies, dispatch, setValue]);

  // Handle the confirm order action
  const handleConfirmOrder = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("token"),
        },
        body: JSON.stringify(formData),
      };

      const response = await fetch(`${API_BASE_URL}/users/updateUser`, options);
      if (response.ok) {
        const data = await response.json();
        dispatch(updateAccount(data));
        setConfirmMessage(false);
        setNoticeMessage({
          open: true,
          message: "Successfully updated user",
          icon: CheckCircleIcon,
          color: "green",
        });
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      let errorMessage = await error.message;
      if (errorMessage.includes("412"))
        errorMessage = "412 - Cannot update guest user.";
      setConfirmMessage(false);
      setNoticeMessage({
        open: true,
        message: errorMessage,
        icon: ErrorIcon,
        color: "red",
      });
    } finally {
      setLoading(false); // End loading
    }
  }, [cookies, dispatch, formData]);

  // Handle form submission
  const handleOnSubmit = useCallback(
    async (updatedAccountDetails) => {
      dispatch(updateAccount(updatedAccountDetails));
      setConfirmMessage(true);
    },
    [dispatch]
  );

  // Confirmation dialog component
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

  // Notice message component
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
          window.location.reload();
        }}
      />
    </Suspense>
  );

  // Render the component with loading state handling
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
                        defaultChecked={
                          oldAccount.allowOthersToSeePurchasedProducts
                        }
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
