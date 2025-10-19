import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import styles from "../home/Home.module.css";
import { AppContext } from "../../AppContext";

export default function ChatBoxComponent({ setInputBox, handleAskBtn }) {
  const { inputs, clearInputs } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSaveBtn = () => {
    if (inputs.length === 0) {
      alert("No conversation to save!");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const savedChats = JSON.parse(localStorage.getItem("chatMessages")) || {};
    const newKey = `chat_${today}_${Date.now()}`;

    // Keep only today's chats
    const todayChats = Object.fromEntries(
      Object.entries(savedChats).filter(([key]) => key.includes(today))
    );

    todayChats[newKey] = inputs;

    localStorage.setItem("chatMessages", JSON.stringify(todayChats));
    alert("Today's chat saved successfully!");

    clearInputs();
    setInputBox("");
  };

  const handleAskBtnLocal = (e) => {
    e.preventDefault();
    const message = e.target.querySelector("input").value.trim();
    if (!message) return;
    navigate("/conversations", { state: { message } });
  };

  return (
    <div className={styles.chatBoxComponenet}>
      <form className={styles.chatboxSection} onSubmit={handleAskBtnLocal}>
        <input
          className={styles.inputBox}
          type="text"
          placeholder='Message Bot AI...'
          onChange={(e) => setInputBox(e.target.value)}
        />
        <button type="submit" className={styles.btn}>
          Ask
        </button>
        <button
          type="button"
          className={styles.btn}
          onClick={handleSaveBtn}
        >
          Save
        </button>
      </form>
    </div>
  );
}
