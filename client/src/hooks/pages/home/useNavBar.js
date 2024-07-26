//src/hooks/pages/home/useNavBar.js
import { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";

const useNavBar = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = cookies.get("isAdmin");
    setIsAdmin(adminStatus);
  }, [cookies]);

  useEffect(() => {}, [isAdmin]);

  return {
    isAdmin,
  };
};

export default useNavBar;
