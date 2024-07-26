//src/hooks/pages/home/usePageNavigation.js

import { useMemo, useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const usePageNavigation = (isAdmin, adminComponents, userComponents) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = useMemo(() => {
    let path = location.pathname.split("/").pop();
    return path.charAt(0).toUpperCase() + path.slice(1);
  }, [location.pathname]);

  const [selectedPage, setSelectedPage] = useState(() => {
    const components = isAdmin ? adminComponents : userComponents;
    if (currentPath in components) {
      return currentPath;
    }
    return "Home"; // Default to Home if currentPath is not valid
  });

  useEffect(() => {
    const components = isAdmin ? adminComponents : userComponents;
    if (currentPath in components) {
      setSelectedPage(currentPath);
    } else if (currentPath === "Admin%20products") {
      setSelectedPage("Admin Products");
    } else {
      setSelectedPage("Home"); // Default to Home if currentPath is not valid
    }
  }, [currentPath, isAdmin, adminComponents, userComponents]);

  const handleSelectedPage = useCallback(
    (page) => {
      setSelectedPage(page);
      navigate(`/home/${page.toLowerCase()}`);
    },
    [navigate]
  );

  const handleGoHome = useCallback(() => {
    console.log("Go Home");
    setSelectedPage("Home");
    navigate("/home");
  }, [navigate]);

  return { selectedPage, handleSelectedPage, handleGoHome };
};

export default usePageNavigation;
