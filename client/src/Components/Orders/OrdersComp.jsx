import React, { useCallback, useEffect, useMemo, useState } from "react";

import useFetch from "../../Hooks/useFetch";
import { LoadingComp, MaterialTableComp } from "../Utils/indexUtil";
import { transformOrdersToProducts } from "../../Services/OrderService";
import Cookies from "universal-cookie";
import { Avatar } from "@mui/material";
import { orderTableColumns } from "../../Constants/orderTableColumns";
import API_BASE_URL from "../../Constants/serverUrl";
import { defaultDate } from "../../Constants/defaultDates";

const OrdersComp = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const [tableData, setTableData] = useState([]);
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
        await fetchData(`${API_BASE_URL}/orders/getCustomerOrders`, options);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };
    fetchOrders();
  }, [fetchData, cookies]);

  const transformedData = useCallback(async () => {
    if (!data || data.length === 0) return [];

    const transformed = transformOrdersToProducts(data).map((item, index) => ({
      key: index,
      title: item.title || "Unknown",
      quantity: item.quantity || 0,
      total: item.total || 0,
      date: new Date(item?.date).toLocaleString("en-GB") || defaultDate,
      image: (
        <Avatar
          src={item.imageUrl || "https://via.placeholder.com/150"}
          sx={{ width: 100, height: 100, borderRadius: 2 }}
        />
      ),
    }));

    setTableData(transformed);
  }, [data]);

  useEffect(() => {
    transformedData();
  }, [transformedData]);

  // loading and error handling
  if (loading) {
    return <LoadingComp />;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  }

  return tableData.length > 0 ? (
    <MaterialTableComp columns={orderTableColumns} data={tableData} />
  ) : (
    <div>No orders found</div>
  );
};

export default OrdersComp;
