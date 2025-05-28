import { v4 as uuidv4 } from "uuid";

export const getOrCreateSessionId = () => {
  const storedSessionId = sessionStorage.getItem("chatSessionId"); // Changed to sessionStorage
  if (storedSessionId) return storedSessionId;

  const newSessionId = uuidv4(); // ← industry-standard UUIDv4
  sessionStorage.setItem("chatSessionId", newSessionId); // Changed to sessionStorage
  return newSessionId;
};
