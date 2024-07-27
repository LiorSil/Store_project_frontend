import React from "react";
import { Typography } from "@mui/material";
import classes from "./MaxPriceTypography.module.css";

const MaxPriceTypography = ({ maxPrice }) => {
  return (
    <Typography gutterBottom className={classes.maxPriceText}>
      Max Price: {`${maxPrice}$`}
    </Typography>
  );
};

export default MaxPriceTypography;
