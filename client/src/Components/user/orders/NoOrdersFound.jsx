import React from "react";
import { Box, Typography } from "@mui/material";

const NoOrdersFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        textAlign: "center",
        backgroundColor: "#f4f6f8",
        borderRadius: 2,
        padding: 4,
        "@media (max-width: 768px)": {
          padding: 2,
        },
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        No Orders Found 😢
      </Typography>
      <Typography variant="body1">
        You have not placed any orders yet. Start shopping now!
      </Typography>
    </Box>
  );
};

export default NoOrdersFound;
