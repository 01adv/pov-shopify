// hooks/usePageInfoListener.ts
import { useEffect } from "react";

export function usePageInfoListener(
  callback: (data: { pageName: string; fullPath?: string }) => void
) {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== "https://testing-pov.myshopify.com") return;

      if (event.data?.type === "PAGE_INFO") {
        const pageName = event.data.payload?.pageName ?? "unknown-page";
        const fullPath = event.data.payload?.fullPath;

        console.log("Received from Shopify:", pageName, fullPath);
        callback({ pageName, fullPath });
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [callback]);
}
