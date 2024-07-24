import React from "react";
import { Box, Skeleton } from "@mui/material";

const LoadingItemPlaceholder = () => {
  return (
    <Box
      sx={{
        flex: 1,
        padding: 2,
        backgroundColor: "#f8f8f8",
        borderRadius: 5,
        borderStyle: "solid",
        borderColor: "primary.main",
        margin: 2,
      }}
    >
      {/* Placeholder for title */}
      <Skeleton variant="text" height={30} width="80%" />

      {/* Placeholder for description */}
      <Skeleton variant="text" height={20} width="60%" />
      <Skeleton variant="text" height={20} width="50%" />

      {/* Placeholder for image */}
      <Skeleton variant="rectangular" height={200} sx={{ my: 2 }} />

      {/* Placeholder for action buttons and quantity */}
      <Box display="flex" alignItems="center">
        <Skeleton variant="rectangular" height={36} width={36} />
        <Box mx={4}>
          <Skeleton variant="text" height={30} width={30} />
        </Box>
        <Skeleton variant="rectangular" height={36} width={36} />
        <Box alignContent="flex-end" ml="auto">
          <Skeleton variant="circular" height={36} width={36} />
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingItemPlaceholder;
