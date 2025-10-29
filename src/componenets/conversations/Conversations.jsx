import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "../chat/Chat";
import styles from "./Conversations.module.css";
import { AppContext } from "../../AppContext";

export default function Conversations() {
  const location = useLocation();
  const { inputs, addInputs, setInputs } = useContext(AppContext);
  const [inputBox, setInputBox] = useState("");

  // ✅ Load saved chats from localStorage on mount
  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("savedConversations")) || [];
    if (savedChats.length > 0 && inputs.length === 0) {
      setInputs(savedChats);
    }
  }, [setInputs, inputs.length]);

  // ✅ Whenever inputs change, update localStorage
  useEffect(() => {
    localStorage.setItem("savedConversations", JSON.stringify(inputs));
  }, [inputs]);

  // ✅ Handle new message from Home or form
  useEffect(() => {
    if (location.state?.message) {
      addInputs(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, addInputs]);

  const handleAskBtn = (e) => {
    e.preventDefault();
    if (!inputBox.trim()) return;
    addInputs(inputBox);
    setInputBox("");
  };

  return (
    <div className={styles.conversationsPage}>
      <div className={styles.chatContainer}>
        <Chat />
      </div>

      <form onSubmit={handleAskBtn} className={styles.chatboxSection}>
        <input
          className={styles.inputBox}
          type="text"
          placeholder="Type a message..."
          value={inputBox}
          onChange={(e) => setInputBox(e.target.value)}
        />
        <button type="submit" className={styles.btn}>Ask</button>
      </form>
    </div>
  );
}
