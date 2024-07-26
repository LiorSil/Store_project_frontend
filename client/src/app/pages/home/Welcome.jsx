import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import classes from "./Welcome.module.css";

import useWelcome from "../../../hooks/pages/home/useWelcome";

const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255, 255, 255)",
    boxShadow: "0px 0px 8px rgb(255, 255, 255)",
    transition: {
      yoyo: Infinity,
    },
  },
};

const Welcome = ({ onSelectedPage }) => {
  const { handleStartShopping } = useWelcome(onSelectedPage);

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={classes.container}
    >
      <Typography
        component={motion.h1}
        initial={{ y: -250 }}
        animate={{ y: -10 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        variant="h2"
        gutterBottom
        className={classes.heading}
      >
        Welcome to Our E-commerce Site!
      </Typography>
      <Typography
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        variant="h6"
        gutterBottom
        className={classes.paragraph}
      >
        Discover a variety of products at the best prices. Enjoy your shopping
        experience with us!
      </Typography>
      <Button
        component={motion.button}
        variants={buttonVariants}
        whileHover="hover"
        onClick={handleStartShopping}
        className={classes.button}
      >
        Start Shopping
      </Button>
    </Container>
  );
};

export default Welcome;
