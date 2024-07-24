import React from "react";
import {
  Box,
  Skeleton,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";

const LoadingPlaceholder = () => {
  return (
    <Card sx={{ margin: 2, boxShadow: 3 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Skeleton variant="rectangular" width="100%" height={200} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="text" width="40%" height={30} />
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="text" width="80%" height={60} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", gap: 1 }}>
        <Skeleton variant="rectangular" width={70} height={36} />
        <Skeleton variant="rectangular" width={70} height={36} />
      </CardActions>
    </Card>
  );
};

export default LoadingPlaceholder;
