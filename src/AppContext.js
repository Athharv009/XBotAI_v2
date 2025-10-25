import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [inputs, setInputs] = useState(() => {
    try {
      const saved = localStorage.getItem("inputs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("inputs", JSON.stringify(inputs));
  }, [inputs]);

  const addInputs = (msg) => {
    setInputs((prev) => [...prev, msg]);
  };

  const clearInputs = () => {
    setInputs([]);
    localStorage.removeItem("inputs");
  };

  return (
    <AppContext.Provider value={{ inputs, addInputs, clearInputs }}>
      {children}
    </AppContext.Provider>
  );
}
