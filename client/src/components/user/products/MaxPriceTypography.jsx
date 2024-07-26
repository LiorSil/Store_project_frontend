import React from "react";
import { Typography } from "@mui/material";
import styles from "./MaxPriceTypography.module.css";

const MaxPriceTypography = ({ maxPrice }) => {
  return (
    <Typography gutterBottom className={styles.maxPriceText}>
      Max Price: {`${maxPrice}$`}
    </Typography>
  );
};

export default MaxPriceTypography;
