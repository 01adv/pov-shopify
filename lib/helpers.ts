const generateSessionId = () =>
  `session${Math.random().toString(36).substring(2, 15)}`;

export const getOrCreateSessionId = () => {
  const storedSessionId = localStorage.getItem("chatSessionId");
  if (storedSessionId) return storedSessionId;
  const newSessionId = generateSessionId();
  localStorage.setItem("chatSessionId", newSessionId);
  return newSessionId;
};
