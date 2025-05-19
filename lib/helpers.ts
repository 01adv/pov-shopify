import { v4 as uuidv4 } from "uuid";

export const getOrCreateSessionId = (): string | null => {
  // Check if localStorage is available (e.g., not in SSR or if disabled)
  if (
    typeof window === "undefined" ||
    typeof window.localStorage === "undefined"
  ) {
    console.warn(
      "localStorage is not available. Session ID cannot be retrieved or persisted."
    );
    // Return null to indicate that the session ID could not be managed via localStorage.
    // Consumers of this function should handle the null case.
    return null;
  }

  const sessionIdKey = "chatSessionId";

  try {
    const storedSessionId = localStorage.getItem(sessionIdKey);
    if (storedSessionId) {
      return storedSessionId;
    }

    const newSessionId = uuidv4(); // ← industry-standard UUIDv4
    localStorage.setItem(sessionIdKey, newSessionId);
    return newSessionId;
  } catch (error) {
    console.error("Error accessing localStorage for session ID:", error);
    // Return null if any error occurs during localStorage access (e.g., QuotaExceededError)
    return null;
  }
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

      productArray.forEach((item) => {
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
