import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [debounceTimeout, setDebounceTimeout] = useState("");
  const [inputs, setInputs] = useState(() => {
    // ✅ Load chats from localStorage when app starts
    const saved = localStorage.getItem("inputs");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save chats whenever inputs change
  useEffect(() => {
    localStorage.setItem("inputs", JSON.stringify(inputs));
  }, [inputs]);

  const addInputs = (msg) => {
    setInputs((prev) => [...prev, msg]);
  };

  const clearInputs = () => {
    setInputs([]);
    localStorage.removeItem("inputs"); // clear stored chats too
  };

  return (
    <AppContext.Provider
      value={{ debounceTimeout, setDebounceTimeout, inputs, addInputs, clearInputs }}
    >
      {children}
    </AppContext.Provider>
  );
}
