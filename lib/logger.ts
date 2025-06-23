// "use client";
// import { getOrCreateSessionId } from "./helpers";

// interface DeviceInfo {
//   browser: string;
//   os: string;
//   screen: string;
// }

// // Define expected data structure for append_conversation
// interface ConversationLogData {
//   event: string;
//   session_id: string;
//   message: {
//     role: "user" | "assistant" | "nudge";
//     content: string;
//     timestamp: string;
//   };
//   tags?: string[];
// }

// // Generic data type for other log types
// type LogData = ConversationLogData | Record<string, any>;

// const getDeviceInfo = (): DeviceInfo => ({
//   browser: navigator.userAgent,
//   os: navigator.platform,
//   screen: `${window.screen.width}x${window.screen.height}`,
// });

// export const logEvent = async (
//   logType: string,
//   data: LogData
// ): Promise<void> => {
//   const sessionId = getOrCreateSessionId(); // Fix: Call the function to get the session ID
//   const userId: string | null = null; // Placeholder for authenticated user ID (e.g., from Firebase Auth)

//   // Log only in development for debugging
//   if (process.env.NODE_ENV !== "production") {
//     console.log("Logging event:", {
//       sessionId,
//       userId,
//       logType,
//       data,
//       deviceInfo: getDeviceInfo(),
//     });
//   }

//   try {
//     const response = await fetch("/api/log", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         sessionId,
//         userId,
//         logType,
//         data,
//         deviceInfo: getDeviceInfo(),
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(
//         `Log request failed with status ${
//           response.status
//         }: ${await response.text()}`
//       );
//     }
//   } catch (error) {
//     console.error(`Error logging ${logType} event:`, error);
//     // Optional: Implement retry logic for critical logs
//     if (logType === "append_conversation") {
//       // Example: Retry once after a delay
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
//         const retryResponse = await fetch("/api/log", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             sessionId,
//             userId,
//             logType,
//             data,
//             deviceInfo: getDeviceInfo(),
//           }),
//         });
//         if (!retryResponse.ok) {
//           console.error(
//             `Retry for ${logType} failed with status ${retryResponse.status}`
//           );
//         }
//       } catch (retryError) {
//         console.error(`Retry for ${logType} failed:`, retryError);
//       }
//     }
//   }
// };

"use client";
import { getOrCreateSessionId } from "./helpers";

interface DeviceInfo {
  // browser: string;
  // os: string;
  screen: string;
}

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

type LogData = ConversationLogData | Record<string, any>;

const getDeviceInfo = (): DeviceInfo => ({
  // browser: navigator.userAgent,
  // os: navigator.platform,
  screen: `${window.screen.width}x${window.screen.height}`,
});

export const logEvent = async (
  logType: string,
  data: LogData
): Promise<void> => {
  const sessionId = getOrCreateSessionId();
  const userId: string | null = null; // Placeholder for authenticated user ID
  const logEndpoint =
    process.env.NEXT_PUBLIC_LOG_ENDPOINT ||
    "https://pov-shopify.vercel.app/api/log"; // Fallback to your Next.js API

  // Log event details for debugging
  console.log("Attempting to log event:", {
    sessionId,
    userId,
    logType,
    data,
    deviceInfo: getDeviceInfo(),
    targetEndpoint: logEndpoint,
  });

  try {
    const response = await fetch(logEndpoint, {
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
      const errorText = await response.text();
      throw new Error(
        `Log request failed with status ${response.status}: ${errorText}`
      );
    }
    console.log(`Successfully logged ${logType} event to ${logEndpoint}`);
  } catch (error) {
    console.error(`Error logging ${logType} event:`, error);
    // Retry for critical logs
    if (logType === "append_conversation") {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
        const retryResponse = await fetch(logEndpoint, {
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
          const retryErrorText = await retryResponse.text();
          console.error(
            `Retry for ${logType} failed with status ${retryResponse.status}: ${retryErrorText}`
          );
        } else {
          console.log(`Retry for ${logType} succeeded at ${logEndpoint}`);
        }
      } catch (retryError) {
        console.error(`Retry for ${logType} failed:`, retryError);
      }
    }
  }
};
