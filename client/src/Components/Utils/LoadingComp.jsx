import { CircularProgress, Box } from "@mui/material";

const LoadingComp = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress color="success" size={80} />
    </Box>
  );
};

export default LoadingComp;
