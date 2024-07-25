import React from "react";
import { Avatar, Box } from "@mui/material";
import { Loading, MaterialTable } from "../../../utils/shared/commonComponents";
import { orderTableColumns } from "../../../constants/orderTableColumns";
import NoOrdersFound from "./NoOrdersFound";
import useOrders from "../../../hooks/user/orders/useOrders";

const Orders = () => {
  const { tableData, loading, error } = useOrders();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return tableData.length > 0 ? (
    <Box
      sx={{
        maxWidth: "75vw",
        width: "60vw",
        margin: "auto",
        fontFamily: "'Open Sans', sans-serif",
        "@media (max-width: 768px)": {
          width: "90vw",
          maxWidth: "90vw",
        },
      }}
    >
      <MaterialTable
        columns={orderTableColumns}
        data={tableData.map((item) => ({
          ...item,
          image: (
            <Avatar
              src={item.image}
              sx={{ width: 100, height: 100, borderRadius: 2 }}
            />
          ),
        }))}
      />
    </Box>
  ) : (
    <NoOrdersFound />
  );
};

export default Orders;
