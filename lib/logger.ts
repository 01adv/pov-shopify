"use client";
import { getOrCreateSessionId } from "./helpers";

interface DeviceInfo {
  browser: string;
  os: string;
  screen: string;
}
const getSessionId = getOrCreateSessionId();
console.log("Session ID:", getSessionId);
const getDeviceInfo = (): DeviceInfo => ({
  browser: navigator.userAgent,
  os: navigator.platform,
  screen: `${window.screen.width}x${window.screen.height}`,
});

export const logEvent = async (
  logType: string,
  data: Record<string, any>
): Promise<void> => {
  const sessionId = getSessionId;
  const userId: string | null = null; // Replace with authenticated user ID if available
  console.log("Logging event:", {
    sessionId,
    userId,
    logType,
    data,
    deviceInfo: getDeviceInfo(),
  });

  try {
    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        userId,
        logType,
        data,
        deviceInfo: getDeviceInfo(),
      }),
    });
  } catch (error) {
    console.error("Error logging event:", error);
  }
};
