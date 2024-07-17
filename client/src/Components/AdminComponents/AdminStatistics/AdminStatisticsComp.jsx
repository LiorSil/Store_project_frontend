import React from "react";
import DoughnutChart from "./DoughnutChart";
import { Typography, Box } from "@mui/material";

/**
 * AdminStatisticsComp Component
 *
 * This component renders the statistics section of the admin panel, including a Doughnut chart.
 * The component is memoized using React.memo to prevent unnecessary re-renders.
 *
 * @returns {JSX.Element} - The rendered component.
 */
const AdminStatisticsComp = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Statistics
      </Typography>
      <DoughnutChart />
    </Box>
  );
};

export default React.memo(AdminStatisticsComp);
