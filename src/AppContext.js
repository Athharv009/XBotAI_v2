import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [debounceTimeout, setDebounceTimeout] = useState("");
  const [inputs, setInputs] = useState([]);
  
  const addInputs = (msg) => {
    setInputs((prev) => [...prev, msg]);
  };

  return (
    <AppContext.Provider value={{ debounceTimeout, setDebounceTimeout, inputs, addInputs }}>
      {children}
    </AppContext.Provider>
  );
}
