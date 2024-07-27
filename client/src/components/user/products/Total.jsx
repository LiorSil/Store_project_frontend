import React from "react";
import { Box, Typography } from "@mui/material";
import classes from "./Total.module.css";

const Total = ({ total }) => {
  return (
    <Box className={classes.container}>
      <Typography variant="h6" className={classes.totalLabel}>
        Total:
      </Typography>
      <Typography variant="h4" className={classes.totalAmount}>
        ${total}
      </Typography>
    </Box>
  );
};

export default Total;
