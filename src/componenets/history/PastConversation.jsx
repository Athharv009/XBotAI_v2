import { useEffect, useState } from "react";
import Chat from "../chat/Chat";
import styles from "../home/Home.module.css";
import hstyles from "./PastConversation.module.css";
import cstyles from "../conversations/Conversations.module.css";

export default function PastConversation() {
  const [toggler, setToggler] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [savedChats, setSavedChats] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const chats = JSON.parse(localStorage.getItem("chatMessages")) || {};
    const feedbackData = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setSavedChats(chats);
    setFeedbacks(feedbackData);
  }, []);

  useEffect(() => {
    // ✅ Auto-include unsaved inputs for persistence
    const liveInputs = JSON.parse(localStorage.getItem("inputs")) || [];
    if (liveInputs.length > 0) {
      setSavedChats((prev) => ({
        ...prev,
        temp_auto_saved_chat: liveInputs,
      }));
    }
  }, []);

  const getFeedbackForDate = (dateString) => {
    const fb = feedbacks.find((f) => f.date === dateString);
    return fb ? fb.feedback : null;
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

      <div className={hstyles.content}>
        <div className={hstyles.mobileViewToggler}>
          {isMobile && (
            <button className={styles.menuBtn} onClick={() => setToggler(true)}>
              ☰
            </button>
          )}
          <h1 className={hstyles.heading}>Conversation History</h1>
        </div>

        <div>
          {Object.keys(savedChats).length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "30px" }}>
              No saved conversations yet.
            </p>
          ) : (
            Object.entries(savedChats)
              .sort((a, b) => b[0].localeCompare(a[0]))
              .map(([chatId, chatData]) => {
                const parts = chatId.split("_");
                const timestamp = parts[parts.length - 1];

                // ✅ Safe date parsing to prevent "Invalid time value"
                let readableDate = "Unknown Date";
                let dateOnly = "";
                const parsedTimestamp = Number(timestamp);
                if (!isNaN(parsedTimestamp) && parsedTimestamp > 0) {
                  const dateObj = new Date(parsedTimestamp);
                  if (!isNaN(dateObj.getTime())) {
                    readableDate = dateObj.toLocaleString();
                    dateOnly = dateObj.toISOString().split("T")[0];
                  }
                }

                const feedbackText = getFeedbackForDate(dateOnly);

                return (
                  <div key={chatId} className={hstyles.conversationBlock}>
                    <h2 className={hstyles.h2Heading}>
                      Conversation: {readableDate}
                    </h2>

                    <div className={hstyles.conversationContainer}>
                      {chatData.map((msg, index) =>
                        msg.sender === "Soul AI" ? (
                          <div className={hstyles.soulAI} key={index}>
                            <div className={cstyles.imgUser}>
                              <img
                                src={require("../../assets/logo.png")}
                                alt="Soul AI"
                                className={cstyles.avatar}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                              }}
                            >
                              <div className={cstyles.textContent}>
                                <span className={cstyles.user}>{msg.sender}</span>
                                <span>{msg.text}</span>
                              </div>
                              <div style={{ display: "flex", gap: "15px" }}>
                                <div>{msg.time}</div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <img
                                    src={require("../../assets/like.png")}
                                    alt="Like"
                                    className={cstyles.like}
                                  />
                                  <img
                                    src={require("../../assets/like.png")}
                                    alt="Dislike"
                                    className={cstyles.like}
                                    style={{ transform: "rotate(180deg)" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className={hstyles.userEnd} key={index}>
                            <div className={cstyles.imgUser}>
                              <img
                                src={require("../../assets/user.png")}
                                alt="User"
                                className={cstyles.avatar}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                              }}
                            >
                              <div className={cstyles.textContent}>
                                <span className={cstyles.user}>{msg.sender}</span>
                                <span>{msg.text}</span>
                              </div>
                              <div>{msg.time}</div>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {feedbackText && (
                      <div className={hstyles.feedbackSection}>
                        <h3>Feedback:</h3>
                        <p>{feedbackText}</p>
                      </div>
                    )}
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}
