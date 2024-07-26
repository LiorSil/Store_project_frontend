import React from "react";
import { Box, Typography, Button } from "@mui/material";
import classes from "./NotFound.module.css"; // Import the CSS module
import useNotFound from "../../../hooks/pages/error/useNotFound";

const NotFound = () => {
  const { handleGoLoginPage } = useNotFound();
  return (
    <Box className={classes.container}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        className={classes.heading}
      >
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom className={classes.bodyText}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoLoginPage}>
        Go to Login Page
      </Button>
    </Box>
  );
};

export default NotFound;
