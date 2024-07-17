import React, { memo } from "react";
import { AppBar, Toolbar, Button, Stack } from "@mui/material";
import Cookies from "universal-cookie";

// Memoized Button to prevent unnecessary re-renders
const MemoizedButton = memo(({ page, selectedPage, onSelectedPage }) => (
  <Button
    color="inherit"
    onClick={() => onSelectedPage(page)}
    sx={{
      borderBottom:
        selectedPage === page ? "2px solid white" : "2px solid transparent",
      "&:hover": {
        borderBottom: "2px solid white",
      },
    }}
  >
    {page}
  </Button>
));

const NavBarComp = ({ pages, onSelectedPage, selectedPage }) => {
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
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ margin: "0 auto" }}
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

export default NavBarComp;
