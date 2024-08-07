import React from "react";
import { Box, Skeleton } from "@mui/material";
import classes from "./LoadingItemPlaceholder.module.css";

const LoadingItemPlaceholder = () => {
  return (
    <Box className={classes.container}>
      {/* Placeholder for title */}
      <Skeleton variant="text" height={30} width="100%" />

      {/* Placeholder for description */}
      <Skeleton variant="text" height={20} width="60%" />
      <Skeleton variant="text" height={20} width="50%" />
      <Skeleton variant="text" height={20} width="30%" />
      <Skeleton variant="text" height={20} width="40%" />
      <Skeleton variant="text" height={20} width="10%" />

      {/* Placeholder for image */}
      <Skeleton
        variant="rectangular"
        height={250}
        width={250}
        className={classes.imageSkeleton}
      />
      <Box className={classes.actionContainer}>
        <Skeleton variant="rectangular" className={classes.buttonSkeleton} />
        <Box mx={4}>
          <Skeleton variant="text" className={classes.textSkeleton} />
        </Box>
        <Skeleton variant="rectangular" className={classes.buttonSkeleton} />
        <Box className={classes.alignEnd}>
          <Skeleton variant="circular" className={classes.buttonSkeleton} />
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingItemPlaceholder;
