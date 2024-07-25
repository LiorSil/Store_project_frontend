import React from "react";
import { Typography, Box } from "@mui/material";
import DoughnutChart from "./DoughnutChart";
import useStatistics from "../../../hooks/admin/statistics/useStatistics"; // Adjust the path according to your project structure

const Statistics = () => {
  /* The data is not really used in the component, but it here to future implementation
   of the statistics component.
  */
  const data = useStatistics();

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Statistics
      </Typography>
      <DoughnutChart data={data} />
    </Box>
  );
};

export default React.memo(Statistics);
