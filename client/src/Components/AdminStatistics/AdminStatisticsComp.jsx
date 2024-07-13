import React from "react";
import DoughnutChart from "./DoughnutChart";
import { Typography } from "@mui/material";

const AdminStatisticsComp = () => {
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Statistics
      </Typography>
      <DoughnutChart />
    </>
  );
};

export default AdminStatisticsComp;
