import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../home/Home.module.css";
import Chat from "../chat/Chat";
import cstyles from "./Conversations.module.css";
import { AppContext } from "../../AppContext";
import sampleData from "../../data/sampleData.json";

export default function Conversations() {
  const [inputBox, setInputBox] = useState("");
  const [toggler, setToggler] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const { inputs, addInputs } = useContext(AppContext);
  const location = useLocation();
  const prefilledMessage = location.state?.message || "";

  useEffect(() => {
    if (prefilledMessage) {
      setInputBox(prefilledMessage);
      setTimeout(() => {
        document
          .querySelector("form")
          ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      }, 800);
    }
  }, [prefilledMessage]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAskBtn = (e) => {
    e.preventDefault();
    if (!inputBox.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg = { sender: "You", text: inputBox, time };
    addInputs(userMsg);

    const userText = inputBox.toLowerCase().trim();
    setInputBox("");

    const matched = sampleData.find(
      (item) => item.question.toLowerCase() === userText
    );

    const replyText = matched
      ? matched.response
      : "Sorry, Did not understand your query!";

    const reply = {
      sender: "Soul AI",
      text: replyText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    addInputs(reply);
  };

  const handleSaveBtn = () => {
    setShowModal(true);
  };

  const handleFeedbackSubmit = () => {
    const today = new Date().toISOString().split("T")[0];
    const savedChats = JSON.parse(localStorage.getItem("chatMessages")) || {};
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    const newKey = `chat_${today}_${Date.now()}`;
    const todayChats = Object.fromEntries(
      Object.entries(savedChats).filter(([key]) => key.includes(today))
    );

    todayChats[newKey] = inputs;
    localStorage.setItem("chatMessages", JSON.stringify(todayChats));

    feedbacks.push({ chatId: newKey, date: today, feedback });
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    setShowModal(false);
    setFeedback("");
    alert("Chat and feedback saved successfully!");
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <div className={styles.home}>
      <div
        className={`${styles.chatSection} ${
          isMobile && toggler ? styles.drawerOpen : ""
        }`}
      >
        {isMobile && toggler && (
          <button
            className={styles.closeDrawerBtn}
            onClick={() => setToggler(false)}
          >
            ←
          </button>
        )}
        <Chat />
      </div>

      <div className={cstyles.mainContainer}>
        {(!isMobile || !toggler) && (
          <div className={styles.togglerBtn}>
            {isMobile && (
              <button
                className={styles.menuBtn}
                onClick={() => setToggler(true)}
              >
                ☰
              </button>
            )}
            <h1 className={styles.bot_h1}>Soul AI</h1>
          </div>
        )}

        <div className={cstyles.chatBoxMainContainer}>
          {inputs.map((msg, i) => (
            <div className={cstyles.chatCardContainer} key={i}>
              <div className={cstyles.imgUser}>
                <img
                  src={
                    msg.sender === "Soul AI"
                      ? require("../../assets/logo.png")
                      : require("../../assets/user.png")
                  }
                  alt={msg.sender}
                  className={cstyles.avatar}
                />
              </div>
              <div>
                <div className={cstyles.textContent}>
                  <span className={cstyles.user}>{msg.sender}</span>
                  <p>{msg.text}</p>
                </div>
                <div className={cstyles.time}>
                  <small>{msg.time}</small>
                </div>
              </div>
            </div>
          ))}

          <div className={styles.chatBoxComponenet}>
            <form className={styles.chatboxSection} onSubmit={handleAskBtn}>
              <input
                className={styles.inputBox}
                type="text"
                placeholder="Message Bot AI..."
                value={inputBox}
                onChange={(e) => setInputBox(e.target.value)}
              />
              <button type="submit" className={styles.btn}>Ask</button>
              <button
                type="button"
                className={styles.btn}
                onClick={handleSaveBtn}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={cstyles.modalOverlay}>
          <div className={cstyles.modalContent}>
            <h2>Feedback</h2>
            <textarea
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className={cstyles.modalBtns}>
              <button onClick={handleFeedbackSubmit}>Submit</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
