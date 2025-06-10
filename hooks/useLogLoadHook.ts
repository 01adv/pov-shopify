"use client";
import { logEvent } from "@/lib/logger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useLogPageLoad = (pageName?: string) => {
  const pathname = usePathname();

  useEffect(() => {
    const hasLogged = sessionStorage.getItem("entry_logged");
    if (hasLogged) return;

    logEvent("agent_loaded", {
      event: "page_load",
      page_path: pageName || pathname || "unknown",
      tags: ["page", "load", "initial"],
      source: "site_entry",
    });

    sessionStorage.setItem("entry_logged", "true");
  }, [pathname, pageName]);
};
