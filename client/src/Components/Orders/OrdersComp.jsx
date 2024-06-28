import React, { useEffect, useMemo } from "react";

import useFetch from "../../Hooks/useFetch";
import { LoadingComp, MaterialTableComp } from "../Utils/indexUtil";
import { transformOrdersToProducts } from "../../Services/OrderService";
import Cookies from "universal-cookie";
import { Avatar } from "@mui/material";

const OrdersComp = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const tableData = [];
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("token"),
          },
        };
        await fetchData(
          "http://localhost:5000/orders/getCustomerOrders",
          options
        );
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };
    fetchOrders();
  }, [fetchData, cookies]);

  if (loading) {
    return <LoadingComp />;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  }

  const columns = [
    { key: "title", title: "Title" },
    { key: "image", title: "Image" },
    { key: "quantity", title: "Quantity" },
    { key: "total", title: "Total" },
    { key: "date", title: "Date" },
  ];

  return (
    <>
      {data && data.length > 0 ? (
        transformOrdersToProducts(data).map((item, index) => {
          tableData.push({
            key: index,
            title: item?.title || "Unknown",
            quantity: item?.quantity || 0,
            total: item?.total || 0,
            date: new Date(item.date).toLocaleString("en-GB"),
            image: (
              <Avatar
                src={item.imageUrl || "https://via.placeholder.com/150"}
                sx={{ width: 100, height: 100, borderRadius: 2 }}
              />
            ),
          });
          return null; // Add a return statement
        })
      ) : (
        <div>No orders found</div>
      )}

      <MaterialTableComp columns={columns} data={tableData} />
    </>
  );
};

export default OrdersComp;
