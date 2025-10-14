import { useContext, useEffect, useState } from "react";
import styles from "../home/Home.module.css";
import Chat from "../chat/Chat";
import cstyles from "./Conversations.module.css";
import { AppContext } from "../../AppContext";
import sampleData from "../../data/sampleData.json";

export default function Conversations() {
  const [inputBox, setInputBox] = useState("");
  const [toggler, setToggler] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [typingMessage, setTypingMessage] = useState(""); // For typing animation

  const { inputs, addInputs } = useContext(AppContext);

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

    addInputs({ sender: "You", text: inputBox, time });

    const userText = inputBox.toLowerCase();
    setInputBox("");

    const matched = sampleData.find((item) =>
      userText.includes(item.question.toLowerCase())
    );

    const replyText = matched
      ? matched.response
      : "As an AI Language Model, I don’t have the details";

    setTypingMessage("");
    let i = 0;
    const typingInterval = setInterval(() => {
      setTypingMessage(replyText.slice(0, i + 1));
      i++;
      if (i === replyText.length) {
        clearInterval(typingInterval);
        const replyTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        addInputs({ sender: "Soul AI", text: replyText, time: replyTime });
        setTypingMessage("");
      }
    }, 25);
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
                  <span>{msg.text}</span>
                </div>
                <div className={cstyles.time}>
                  <small>{msg.time}</small>
                  {
                    msg.sender === 'Soul AI' ? 
                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                      <img src={require('../../assets/like.png')} alt="Like" className={cstyles.like} />
                      <img src={require('../../assets/like.png')} alt="DisLike" style={{transform: 'rotate(180deg)'}} className={cstyles.like}/>
                    </div> : null
                  }
                </div>
              </div>
            </div>
          ))}
          {typingMessage && (
            <div className={cstyles.chatCardContainer}>
              <div className={cstyles.imgUser}>
                <img
                  src={require("../../assets/logo.png")}
                  alt="Soul AI"
                  className={cstyles.avatar}
                />
              </div>
              <div>
                <div className={cstyles.textContent}>
                  <span className={cstyles.user}>Soul AI</span>
                  <span>{typingMessage}</span>
                </div>
                <div className={cstyles.time}>
                  <small>typing...</small>
                </div>
              </div>
            </div>
          )}

          <div className={styles.chatBoxComponenet}>
            <form className={styles.chatboxSection} onSubmit={handleAskBtn}>
              <input
                className={styles.inputBox}
                type="text"
                placeholder="Message Soul AI…"
                value={inputBox}
                onChange={(e) => setInputBox(e.target.value)}
              />
              <button type="submit" className={styles.btn}>
                Ask
              </button>
              <button type="button" className={styles.btn}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
