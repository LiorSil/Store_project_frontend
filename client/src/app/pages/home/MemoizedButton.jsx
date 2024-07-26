import React, { memo } from "react";
import { Button } from "@mui/material";
import classes from "./MemoizedButton.module.css"; // Import the CSS module

const MemoizedButton = memo(({ page, selectedPage, onSelectedPage }) => {
  const buttonClass =
    selectedPage === page
      ? `${classes.button} ${classes.buttonSelected}`
      : classes.button;

  return (
    <Button
      color="inherit"
      onClick={() => onSelectedPage(page)}
      className={buttonClass}
    >
      {page}
    </Button>
  );
});

export default MemoizedButton;
