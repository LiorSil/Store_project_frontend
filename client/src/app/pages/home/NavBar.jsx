import React, { memo } from "react";
import { AppBar, Toolbar, Button, Stack } from "@mui/material";
import Cookies from "universal-cookie";

// Memoized Button to prevent unnecessary re-renders
const MemoizedButton = memo(({ page, selectedPage, onSelectedPage }) => (
  <Button
    color="inherit"
    onClick={() => onSelectedPage(page)}
    sx={{
      maxWidth: 100,
      borderBottom:
        selectedPage === page ? "2px solid white" : "2px solid transparent",
      "&:hover": {
        borderBottom: "2px solid white",
      },
      "@media (max-width: 768px)": {
        maxWidth: 80,
        fontSize: "0.8rem",
      },
      "@media (max-width: 480px)": {
        maxWidth: 60,
        fontSize: "0.7rem",
      },
    }}
  >
    {page}
  </Button>
));

const NavBar = ({ pages, onSelectedPage, selectedPage }) => {
  const cookies = new Cookies();
  const isAdmin = cookies.get("isAdmin"); // Retrieve admin status from cookies and parse it as a boolean
  const buttonWidth = 100; // width of each button in pixels
  const totalWidth = pages.length * buttonWidth + (pages.length - 1) * 16; // total width including spacing

  return (
    <AppBar
      position="static"
      sx={{
        margin: "0 auto",
        maxWidth: `${totalWidth}px`,
        borderRadius: 4,
        backgroundColor: isAdmin ? "primary.main" : "secondary.main",
        "@media (max-width: 768px)": {
          maxWidth: "90%",
          borderRadius: 0,
        },
      }}
    >
      <Toolbar
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
          "@media (max-width: 768px)": {
            flexDirection: "column",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{
            margin: "0 auto",
            "@media (max-width: 768px)": {
              flexWrap: "wrap",
              justifyContent: "center",
            },
          }}
        >
          {pages.map((page, index) => (
            <MemoizedButton
              key={index}
              page={page}
              selectedPage={selectedPage}
              onSelectedPage={onSelectedPage}
            />
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
