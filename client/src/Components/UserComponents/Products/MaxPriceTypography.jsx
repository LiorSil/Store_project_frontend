import React from "react";
import { Typography } from "@mui/material";

const MaxPriceTypography = ({ maxPrice }) => {
  return (
    <Typography
      gutterBottom
      sx={{
        color: "#4285F4", // Custom color
        fontWeight: "bold", // Bold font
        fontSize: "1.2rem", // Slightly larger font size
        padding: "8px 16px", // Padding around the text
        backgroundColor: "#f5f5f5", // Light background color
        borderRadius: "8px", // Rounded corners
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        display: "inline-block", // Makes padding effective
      }}
    >
      Max Price: {`${maxPrice}$`}
    </Typography>
  );
};

export default MaxPriceTypography;
