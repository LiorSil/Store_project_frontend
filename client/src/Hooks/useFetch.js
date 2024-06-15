import { useState, useEffect, useCallback } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, options) => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
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
