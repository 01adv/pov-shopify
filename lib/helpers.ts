import { v4 as uuidv4 } from "uuid";

export const getOrCreateSessionId = () => {
  const storedSessionId = localStorage.getItem("chatSessionId");
  if (storedSessionId) return storedSessionId;

  const newSessionId = uuidv4(); // ← industry-standard UUIDv4
  localStorage.setItem("chatSessionId", newSessionId);
  return newSessionId;
};
