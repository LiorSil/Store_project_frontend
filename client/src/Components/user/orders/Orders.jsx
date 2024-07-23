import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Avatar, Box } from "@mui/material";
import Cookies from "universal-cookie";
import useFetch from "../../../hooks/useFetch";
import { Loading, MaterialTable } from "../../utils/shared/commonComponents";
import { orderTableColumns } from "../../../constants/orderTableColumns";
import API_BASE_URL from "../../../constants/serverUrl";
import { defaultDate } from "../../../constants/defaultDates";
import NoOrdersFound from "./NoOrdersFound";

/**
 * Orders component fetches and displays customer orders in a table.
 * It uses the `useFetch` hook to manage fetching data and handles loading and error states.
 * The fetched data is transformed and passed to the MaterialTable for rendering.
 */
const Orders = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const [tableData, setTableData] = useState([]);
  const { data, loading, error, fetchData } = useFetch();

  // Fetch orders data on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        };
        await fetchData(
          `${API_BASE_URL}/orders/getProductsFromOrders`,
          options
        );
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };
    fetchOrders();
  }, [fetchData, cookies]);

  // Transform the fetched orders data into a format suitable for the table
  const transformData = useCallback(() => {
    if (!data || data.length === 0) return;

    const transformed = data.map((item, index) => ({
      key: index,
      title: item.title || "Unknown",
      quantity: item.quantity || 0,
      total: `${item.total}$` || `0$`,
      date: new Date(item.date).toLocaleString("en-GB") || defaultDate,
      image: (
        <Avatar
          src={item.imageUrl || "https://via.placeholder.com/150"}
          sx={{ width: 100, height: 100, borderRadius: 2 }}
        />
      ),
    }));

    setTableData(transformed);
  }, [data]);

  // Update table data whenever the fetched data changes
  useEffect(() => {
    transformData();
  }, [transformData]);

  // Render loading, error, or the data table based on the state
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
      <MaterialTable columns={orderTableColumns} data={tableData} />
    </Box>
  ) : (
    <NoOrdersFound />
  );
};

export default Orders;
