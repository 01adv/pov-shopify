"use client";
import { getOrCreateSessionId } from "./helpers";

interface DeviceInfo {
  browser: string;
  os: string;
  screen: string;
}

// Define expected data structure for append_conversation
interface ConversationLogData {
  event: string;
  session_id: string;
  message: {
    role: "user" | "assistant" | "nudge";
    content: string;
    timestamp: string;
  };
  tags?: string[];
}

// Generic data type for other log types
type LogData = ConversationLogData | Record<string, any>;

const getDeviceInfo = (): DeviceInfo => ({
  browser: navigator.userAgent,
  os: navigator.platform,
  screen: `${window.screen.width}x${window.screen.height}`,
});

export const logEvent = async (
  logType: string,
  data: LogData
): Promise<void> => {
  const sessionId = getOrCreateSessionId(); // Fix: Call the function to get the session ID
  const userId: string | null = null; // Placeholder for authenticated user ID (e.g., from Firebase Auth)

  // Log only in development for debugging
  if (process.env.NODE_ENV !== "production") {
    console.log("Logging event:", {
      sessionId,
      userId,
      logType,
      data,
      deviceInfo: getDeviceInfo(),
    });
  }

  try {
    const response = await fetch("/api/log", {
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

    if (!response.ok) {
      throw new Error(
        `Log request failed with status ${
          response.status
        }: ${await response.text()}`
      );
    }
  } catch (error) {
    console.error(`Error logging ${logType} event:`, error);
    // Optional: Implement retry logic for critical logs
    if (logType === "append_conversation") {
      // Example: Retry once after a delay
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
        const retryResponse = await fetch("/api/log", {
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
        if (!retryResponse.ok) {
          console.error(
            `Retry for ${logType} failed with status ${retryResponse.status}`
          );
        }
      } catch (retryError) {
        console.error(`Retry for ${logType} failed:`, retryError);
      }
    }
  }
};
