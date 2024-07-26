import React from "react";
import { AppBar, Toolbar, Stack } from "@mui/material";
import useNavBar from "../../../hooks/pages/home/useNavBar";
import MemoizedButton from "./MemoizedButton";
import classes from "./NavBar.module.css"; // Import the CSS module

const NavBar = ({ pages, onSelectedPage, selectedPage }) => {
  const { isAdmin } = useNavBar();


  const buttonWidth = 100; // width of each button in pixels
  const totalWidth = pages.length * buttonWidth + (pages.length - 1) * 16; // total width including spacing

  return (
    <AppBar
      position="static"
      className={`${classes.appBar} ${
        isAdmin ? classes.appBarAdmin : classes.appBarUser
      }`}
      style={{ maxWidth: `${totalWidth}px` }}
    >
      <Toolbar className={classes.toolbar}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          className={classes.stack}
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
