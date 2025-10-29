import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [inputs, setInputs] = useState(() => {
    try {
      const savedInputs = JSON.parse(localStorage.getItem("inputs"));
      if (Array.isArray(savedInputs)) {
        return savedInputs.map((msg) => ({
          sender: msg?.sender || "You",
          text: msg?.text || "",
          // ✅ ensures valid time string even if old data is corrupted
          time:
            typeof msg?.time === "string" && msg.time.trim() !== ""
              ? msg.time
              : new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
        }));
      }
    } catch (e) {
      console.warn("Error parsing inputs from localStorage:", e);
    }
    return [];
  });

  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // ✅ keep localStorage updated
  useEffect(() => {
    localStorage.setItem("inputs", JSON.stringify(inputs));
  }, [inputs]);

  // ✅ safely add user or bot messages
  const addInputs = (msg) => {
    const messageObj =
      typeof msg === "string"
        ? {
            sender: "You",
            text: msg,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }
        : {
            sender: msg?.sender || "You",
            text: msg?.text || "",
            time:
              typeof msg?.time === "string" && msg.time.trim() !== ""
                ? msg.time
                : new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
          };

    setInputs((prev) => [...prev, messageObj]);
  };

  const clearInputs = () => {
    setInputs([]);
    localStorage.removeItem("inputs");
  };

  return (
    <AppContext.Provider
      value={{
        inputs,
        addInputs,
        clearInputs,
        debounceTimeout,
        setDebounceTimeout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
