import React, { useEffect, useMemo } from "react";
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
import useFetch from "../../Hooks/useFetch";
import Cookies from "universal-cookie";

const AccountComp = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const response = await fetch("http://localhost:5000/users/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("token"),
        },
      });
      const data = await response.json();
      return data;
    },
  });

  const onSubmit = async (data) => {
    console.log(data); // Handle form submission logic here
  };

  return (
    <Stack className={classes["account-form"]} direction="column">
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
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
                <Checkbox {...register("allowOrders")} color="primary" />
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
  );
};

export default AccountComp;
