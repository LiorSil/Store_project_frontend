import { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import useFetch from "../../useFetch";
import API_BASE_URL from "../../../constants/serverUrl";
import defaultDate from "../../../constants/defaultDates";

const useOrders = () => {
  const [tableData, setTableData] = useState([]);
  const { data, loading, error, fetchData } = useFetch();
  const cookies = useMemo(() => new Cookies(), []);

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

  const transformData = useCallback(() => {
    if (!data || data.length === 0) return;

    const transformed = data.map((item, index) => ({
      key: index,
      title: item.title || "Unknown",
      quantity: item.quantity || 0,
      total: `${item.total}$` || `0$`,
      date: new Date(item.date).toLocaleString("en-GB") || defaultDate,
      image: item.imageUrl || "https://via.placeholder.com/150",
    }));

    setTableData(transformed);
  }, [data]);

  useEffect(() => {
    transformData();
  }, [transformData]);

  return { tableData, loading, error };
};

export default useOrders;
