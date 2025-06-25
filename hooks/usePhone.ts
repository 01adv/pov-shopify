// "use client";
// import { useState, useEffect } from "react";

// const useIsPhone = () => {
//   const [isPhone, setIsPhone] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const mediaQuery = window.matchMedia("(max-width: 600px)");

//     const handleChange = () => {
//       setIsPhone(mediaQuery.matches);
//     };

//     // Initial check
//     handleChange();

//     // Add listener
//     mediaQuery.addEventListener("change", handleChange);

//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   return isPhone;
// };

// export default useIsPhone;

// "use client";
// import { useEffect, useState } from "react";

// const useIsPhone = () => {
//   const [isPhone, setIsPhone] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const checkIfPhone = () => {
//       const width = window.innerWidth;
//       setIsPhone(width <= 600); // Or any threshold you define as "phone"
//     };

//     checkIfPhone();

//     window.addEventListener("resize", checkIfPhone);
//     return () => window.removeEventListener("resize", checkIfPhone);
//   }, []);

//   return isPhone;
// };

// export default useIsPhone;

"use client";
import { useMediaQuery } from "react-responsive";

const useIsPhone = () => {
  const isPhone = useMediaQuery({ maxWidth: 768 });
  return isPhone;
};

export default useIsPhone;
