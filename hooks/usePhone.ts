"use client";
import { useState, useEffect } from "react";

const useIsPhone = () => {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 600px)");

    const handleChange = () => {
      setIsPhone(mediaQuery.matches);
    };

    // Initial check
    handleChange();

    // Add listener
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isPhone;
};

export default useIsPhone;
