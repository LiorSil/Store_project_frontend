import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

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

const WelcomePage = ({ onSelectedPage }) => {
  const handleStartShopping = () => {
    onSelectedPage("Products");
  };

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "#f4f6f8",
        padding: 4,
        borderRadius: 2,
        "@media (max-width: 768px)": {
          padding: 2,
          borderRadius: 1,
        },
      }}
    >
      <Typography
        component={motion.h1}
        initial={{ y: -250 }}
        animate={{ y: -10 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        variant="h2"
        gutterBottom
        sx={{
          fontWeight: "bold",
          fontFamily: "Open Sans, sans-serif",
          "@media (max-width: 768px)": {
            fontSize: "1.5rem",
          },
        }}
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
        sx={{
          fontFamily: "Open Sans, sans-serif",
          marginBottom: 4,
          "@media (max-width: 768px)": {
            fontSize: "1rem",
            marginBottom: 2,
          },
        }}
      >
        Discover a variety of products at the best prices. Enjoy your shopping
        experience with us!
      </Typography>
      <Button
        component={motion.button}
        variants={buttonVariants}
        whileHover="hover"
        onClick={handleStartShopping}
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          padding: "10px 20px",
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "Open Sans, sans-serif",
          borderRadius: "5px",
          textTransform: "none",
          "@media (max-width: 768px)": {
            padding: "8px 16px",
            fontSize: "16px",
          },
        }}
      >
        Start Shopping
      </Button>
    </Container>
  );
};

export default WelcomePage;
