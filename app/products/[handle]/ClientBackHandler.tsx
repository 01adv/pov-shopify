"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProductContext } from "@/hooks/useProduct";

export default function ClientBackHandler({ productName }: { productName: string }) {
    const router = useRouter();
    const { setProductName } = useProductContext()

    useEffect(() => {
        setProductName(productName)
    }, [productName])

    useEffect(() => {
        const handlePopState = () => {
            // Redirect to home instead of navigating back
            router.replace("/");
        };

        // Listen to browser back/forward events
        window.addEventListener("popstate", handlePopState);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [router]);

    return null; // This component doesn't render anything
}