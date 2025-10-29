import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [inputs, setInputs] = useState(() => {
    const savedInputs = JSON.parse(localStorage.getItem("inputs"));
    return savedInputs || [];
  });

  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    localStorage.setItem("inputs", JSON.stringify(inputs));
  }, [inputs]);

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
          ...msg,
          time:
            msg.time ||
            new Date().toLocaleTimeString([], {
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
