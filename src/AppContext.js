import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [inputs, setInputs] = useState([]);

  // ✅ Load messages from localStorage on first load
  useEffect(() => {
    const savedInputs = JSON.parse(localStorage.getItem("inputs")) || [];
    setInputs(savedInputs);
  }, []);

  // ✅ Keep localStorage in sync whenever inputs change
  useEffect(() => {
    localStorage.setItem("inputs", JSON.stringify(inputs));
  }, [inputs]);

  // ✅ Add new message to context
  const addInputs = (msg) => {
    const messageObj =
      typeof msg === "string"
        ? { sender: "You", text: msg, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
        : msg;
    setInputs((prev) => [...prev, messageObj]);
  };

  // ✅ Clear all inputs (used after Save)
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
