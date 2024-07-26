import React from "react";
import { Avatar, Box } from "@mui/material";
import { Loading, MaterialTable } from "../../../utils/shared/commonComponents";
import { orderTableColumns } from "../../../constants/orderTableColumns";
import NoOrdersFound from "./NoOrdersFound";
import useOrders from "../../../hooks/user/orders/useOrders";
import classes from "./Orders.module.css";

const Orders = () => {
  const { tableData, loading, error } = useOrders();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className={classes.errorMessage}>Error: {error.message}</div>;
  }

  return tableData.length > 0 ? (
    <Box className={classes.ordersContainer}>
      <MaterialTable
        columns={orderTableColumns}
        data={tableData.map((item) => ({
          ...item,
          image: <Avatar src={item.image} className={classes.avatar} />,
        }))}
      />
    </Box>
  ) : (
    <NoOrdersFound />
  );
};

export default Orders;
