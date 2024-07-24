import { useState, useCallback } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, options) => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      if (response.status === 401)
        throw new Error(
          "Failed to authenticate user: Invalid username or password."
        );
      if (!response.ok) {
        throw new Error(response.statusText || "HTTP error occurred");
      }
      const data = await response.json();
      setData(data);
      return data;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};

export default useFetch;
