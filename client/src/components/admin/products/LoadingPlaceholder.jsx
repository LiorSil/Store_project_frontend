import React from "react";
import {
  Box,
  Skeleton,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import classes from "./LoadingPlaceholder.module.css"; // Import the CSS module

const LoadingPlaceholder = () => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box className={classes.imgContainer}>
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box className={classes.cardContent}>
              <Skeleton
                className={classes.skeletonText}
                variant="text"
                width="60%"
                height={30}
              />
              <Skeleton
                className={classes.skeletonText}
                variant="text"
                width="40%"
                height={30}
              />
              <Skeleton
                className={classes.skeletonText}
                variant="text"
                width="60%"
                height={30}
              />
              <Skeleton
                className={classes.skeletonText}
                variant="text"
                width="80%"
                height={60}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Skeleton variant="rectangular" width={70} height={36} />
        <Skeleton variant="rectangular" width={70} height={36} />
      </CardActions>
    </Card>
  );
};

export default LoadingPlaceholder;
