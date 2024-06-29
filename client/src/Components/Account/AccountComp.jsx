import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { useForm, useFormState } from "react-hook-form";
import classes from "./AccountComp.module.css";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setAccount, updateAccount } from "../../Redux/Reducers/accountReducer";
import {
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
} from "../Utils/Validators/indexValidator";
import API_BASE_URL from "../../Constants/serverUrl";

const AccountComp = () => {
  const cookies = useMemo(() => new Cookies(), []);
  //redux
  const dispatch = useDispatch();
  const { oldAccount, formData } = useSelector((state) => state.account);

  //form management
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: oldAccount,
  });

  //dirty fields
  const { isDirty } = useFormState({ control });

  //loading state
  const [loading, setLoading] = useState(true);

  //dialog states
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState({
    open: false,
  });

  // Fetch user data and populate form fields
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      try {
        const response = await fetch(`${API_BASE_URL}/users/getUser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("token"),
          },
        });
        const data = await response.json();
        //populate form fields
        for (const key in data) {
          setValue(key, data[key]);
        }

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

  const handleConfirmOrder = useCallback(async () => {
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
      }
    } catch (error) {
      console.error("Error updating user: ", error.message);
      setConfirmMessage(false);
      setNoticeMessage({
        open: true,
        message: "Error updating user",
        icon: ErrorIcon,
        color: "red",
      });
    }
  }, [cookies, dispatch, formData]);

  const handleOnSubmit = async (updatedAccountDetails) => {
    dispatch(updateAccount(updatedAccountDetails));

    setConfirmMessage(true);
  };

  const confirmDialog = (
    <ConfirmComp
      open={confirmMessage}
      onClose={() => setConfirmMessage(false)}
      onConfirm={handleConfirmOrder}
      title="Confirm Order"
      description="Are you sure you want to update your account details?"
    />
  );
  const noticeDialog = noticeMessage.open && (
    <NoticeMessageComp
      open={true}
      message={noticeMessage.message}
      IconComp={noticeMessage.icon}
      color={noticeMessage.color}
      onClose={() =>
        setNoticeMessage((prevMessage) => ({
          ...prevMessage,
          open: false,
        }))
      }
    />
  );

  return (
    <Suspense fallback={<LoadingComp />}>
      {!loading && (
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
                      validate: firstNameValidator,
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
                      validate: lastNameValidator,
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
                      validate: passwordValidator,
                    })}
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
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

export default AccountComp;
