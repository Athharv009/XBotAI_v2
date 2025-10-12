import { useEffect, useState } from "react";
import Chat from "../chat/Chat";
import styles from "./Home.module.css";

export default function Home() {
  const [inputBox, setInputBox] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState("");
  const [toggler, setToggler] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceTimeout(inputBox);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputBox]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAskBtn = (e) => {
    e.preventDefault();
    if (!inputBox.trim()) return;
    console.log("Message to BotAI", inputBox);
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

      <div className={styles.mainHomeContent}>
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
            <h1 className={styles.bot_h1}>Bot AI</h1>
          </div>
        )}

        <div className={styles.mainContent}>
          <div className={styles.context}>
            <h1 className={styles.question}>How Can I Help You Today?</h1>
            <img
              src={require("../../assets/logo.png")}
              alt="bot"
              className={styles.botLogo}
            />
          </div>

          <div className={styles.mainGroupOption}>
            <div className={styles.groupOption}>
              <div className={styles.optionCard}>
                <h3>Hi, what is the weather</h3>
                <p>Get immediate AI generated response</p>
              </div>
              <div className={styles.optionCard}>
                <h3>Hi, what is my location</h3>
                <p>Get immediate AI generated response</p>
              </div>
            </div>
            <div className={styles.groupOption}>
              <div className={styles.optionCard}>
                <h3>Hi, what is the temperature</h3>
                <p>Get immediate AI generated response</p>
              </div>
              <div className={styles.optionCard}>
                <h3>Hi, how are you</h3>
                <p>Get immediate AI generated response</p>
              </div>
            </div>
          </div>

          {
            isMobile && 
            <div className={styles.mobileOptionView}>
              <div className={styles.optionCard}>
                <h3>Hi, what is the weather</h3>
                <p>Get immediate AI generated response</p>
              </div>
              <div className={styles.optionCard}>
                <h3>Hi, what is my location</h3>
                <p>Get immediate AI generated response</p>
              </div>
              <div className={styles.optionCard}>
                <h3>Hi, how are you</h3>
                <p>Get immediate AI generated response</p>
              </div>
            </div>
          }

          <div className={styles.chatBoxComponenet}>
            <form className={styles.chatboxSection} onSubmit={handleAskBtn}>
              <input
                className={styles.inputBox}
                type="text"
                placeholder="Message Bot AI…"
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
