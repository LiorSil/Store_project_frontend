import React, { useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledDialog = styled(Box)({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9999,
  width: 300,
  padding: 20,
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  backgroundColor: "#fff",
  textAlign: "center",
});

const Overlay = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 9998,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const NoticeMessageComp = ({ message, onClose, color, IconComp }) => {
  const okButtonRef = useRef(null);

  const IconComponent = styled(IconComp)(({ color }) => ({
    color: color || "green", // Default to green if color prop is not provided
    fontSize: 48,
    marginBottom: 20,
  }));

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" || event.key === "Escape") {
        handleClose();
      } else {
        event.preventDefault();
      }
    };

    const handleFocus = (event) => {
      if (okButtonRef.current && !okButtonRef.current.contains(event.target)) {
        okButtonRef.current.focus();
        event.stopPropagation();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("focusin", handleFocus, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("focusin", handleFocus, true);
    };
  }, []);

  return (
    <Overlay>
      <StyledDialog>
        <IconComponent
          color={color}
          styled={{
            fontSize: 48,
            marginBottom: 20,
          }}
        />
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {message}
        </Typography>
        <Button
          ref={okButtonRef}
          variant="contained"
          color="primary"
          onClick={handleClose}
        >
          OK
        </Button>
      </StyledDialog>
    </Overlay>
  );
};

export default NoticeMessageComp;
