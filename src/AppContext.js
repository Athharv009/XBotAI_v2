import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [debounceTimeout, setDebounceTimeout] = useState("");
  const [inputs, setInputs] = useState(() => {
    // ✅ Load saved messages from localStorage on first render
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Whenever inputs change, update localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(inputs));
  }, [inputs]);

  const addInputs = (msg) => {
    setInputs((prev) => [...prev, msg]);
  };

  const clearInputs = () => {
    setInputs([]);
    localStorage.removeItem("chatMessages"); // also clear localStorage
  };

  return (
    <AppContext.Provider
      value={{
        debounceTimeout,
        setDebounceTimeout,
        inputs,
        addInputs,
        clearInputs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
