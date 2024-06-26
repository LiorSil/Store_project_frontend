import React, { useEffect, useMemo, useState } from "react";
import LoadingComp from "../Utils/LoadingComp";
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
import { useForm } from "react-hook-form";
import classes from "./AccountComp.module.css";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setAccount } from "../../Redux/Reducers/accountReducer";

const AccountComp = () => {
  const cookies = useMemo(() => new Cookies(), []);

  //redux
  const dispatch = useDispatch();
  const { oldAccount, newAccount } = useSelector((state) => state.account);

  //loading state
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Fetch user data and populate form fields

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/users/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("token"),
        },
      });
      const data = await response.json();
      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      setValue("username", data.username);
      setValue("allowOrders", data.allowOrders);
      dispatch(setAccount(data));
      console.log("User data fetched: ", data);
    };

    if (Object.keys(oldAccount).length === 0) {
      console.log("Fetching user data...");
      fetchData().finally(() => setLoading(false));
    } else {
      setValue("firstName", oldAccount.firstName);
      setValue("lastName", oldAccount.lastName);
      setValue("username", oldAccount.username);
      setValue("allowOrders", oldAccount.allowOrders);
      setLoading(false);
    }
  }, [oldAccount, cookies, dispatch, setValue]);

  /**
   * Handle form submission logic here
   * @param {object} data - Form data
   */

  const handleOnSubmit = async () => {
    try {
      //handle data
      const updateData = {};
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("token"),
        },
        body: JSON.stringify(updateData),
      };
      const response = await fetch(
        "http://localhost:5000/users/updateUser",
        options
      );
    } catch (error) {
      console.error("Error updating user: ", error.message);
    }
  };

  const onSubmit = async (formData) => {
    console.log("Form data submitted: ", formData);
  };

  return (
    <>
      {loading && <LoadingComp />}

      <Stack className={classes["account-form"]} direction="column">
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
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
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
                type="password"
                fullWidth
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
                    color="primary"
                    // checked={oldAccount.allowOrders}
                    // onChange={(e) =>
                    //   dispatch(
                    //     setAccount({
                    //       ...newAccount,
                    //       allowOrders: e.target.checked,
                    //     })
                    //   )
                    // }
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
          >
            Save
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default AccountComp;
