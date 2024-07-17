import React from "react";
import { Box, Typography } from "@mui/material";

const TotalComp = ({ total }) => {
  return (
    <Box
      sx={{
        background:
          "radial-gradient(circle, rgba(85,140,189,0.2) 35%, rgba(141,156,213,0.1) 95%)",
        color: "black",
        padding: "16px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "16px 0",
        border: "2px solid rgba(85,140,189,0.5)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
      >
        Total:
      </Typography>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
      >
        ${total}
      </Typography>
    </Box>
  );
};

export default TotalComp;
