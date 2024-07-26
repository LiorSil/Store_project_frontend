//src/hooks/pages/home/useWelcome.js
import { useCallback } from "react";

const useWelcome = (onSelectedPage) => {
  const handleStartShopping = useCallback(() => {
    onSelectedPage("Products");
  }, [onSelectedPage]);

  return {
    handleStartShopping,
  };
};

export default useWelcome;
