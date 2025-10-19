import { useEffect, useState } from "react";
import Chat from "../chat/Chat";
import styles from "../home/Home.module.css";
import hstyles from "./PastConversation.module.css";
import cstyles from "../conversations/Conversations.module.css";

export default function PastConversation() {
  const [toggler, setToggler] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [savedChats, setSavedChats] = useState({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Load saved chats
  useEffect(() => {
    const chats = JSON.parse(localStorage.getItem("chatMessages")) || {};
    setSavedChats(chats);
  }, []);

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

        {/* ✅ Render saved chats dynamically */}
        <div>
          {Object.keys(savedChats).length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "30px" }}>
              No saved conversations yet.
            </p>
          ) : (
            Object.entries(savedChats)
              .sort((a, b) => b[0].localeCompare(a[0]))
              .map(([chatId, chatData]) => (
                <div key={chatId}>
                  <h2 className={hstyles.h2Heading}>
                    Conversation:{" "}
                    {new Date(Number(chatId.split("_")[1])).toLocaleString()}
                  </h2>

                  <div className={hstyles.conversationContainer}>
                    {chatData.map((msg, index) =>
                      msg.sender === "Soul AI" ? (
                        <div className={hstyles.soulAI} key={index}>
                          <div className={cstyles.imgUser}>
                            <img
                              src={require("../../assets/logo.png")}
                              alt="SoulAI"
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
                                  alt="DisLike"
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
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
