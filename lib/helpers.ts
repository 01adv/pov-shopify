/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from "uuid";

export const getOrCreateSessionId = () => {
  const storedSessionId = sessionStorage.getItem("chatSessionId"); // Changed to sessionStorage
  if (storedSessionId) return storedSessionId;

  const newSessionId = uuidv4(); // ← industry-standard UUIDv4
  sessionStorage.setItem("chatSessionId", newSessionId); // Changed to sessionStorage
  return newSessionId;
};

// store a boolean in sessionStorage to indicate if the user has seen the welcome message
export const setWelcomeMessageSeen = (seen: boolean) => {
  if (typeof window === "undefined") return; // SSR-safe fallback

  sessionStorage.setItem("wlcm", JSON.stringify(seen));
};
export const getWelcomeMessageSeen = (): boolean => {
  if (typeof window === "undefined") return false; // SSR-safe fallback

  const seen = sessionStorage.getItem("wlcm");
  return seen ? JSON.parse(seen) : false;
};

export function extractProductNamesFromTranscript(
  transcript: string
): string[] {
  const productNames: string[] = [];

  // Case 1: Handle `products: [ "Product Name - $Price", ... ]`
  const jsonLikeMatch = transcript.match(/products:\s*\[([^\]]+)\]/);
  if (jsonLikeMatch) {
    try {
      // Turn the matched string into a real JSON array
      const productArrayStr = `[${jsonLikeMatch[1]}]`.replace(/'/g, '"');
      const productArray = JSON.parse(productArrayStr);

      productArray.forEach((item: any) => {
        const name = item.split(" - $")[0].trim();
        if (name) productNames.push(name);
      });
      return productNames;
    } catch (e) {
      console.warn("Failed to parse JSON-like product array:", e);
    }
  }

  // Case 2: Handle bolded product names (e.g., "**Aspire Flounce Dress with Piping Detail**")
  const boldRegex = /\*\*(.*?)\*\*/g;
  let match;
  while ((match = boldRegex.exec(transcript)) !== null) {
    const name = match[1].trim();
    if (name) productNames.push(name);
  }

  // Case 3: Handle numbered list format (e.g., "1. Product A 2. Product B")
  const numberedRegex = /\d+\.\s*([A-Z][^0-9]+)/g;
  while ((match = numberedRegex.exec(transcript)) !== null) {
    const name = match[1].trim().replace(/\s+/g, " ");
    if (name && !productNames.includes(name)) productNames.push(name);
  }

  return productNames;
}
