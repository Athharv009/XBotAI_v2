import { useEffect, useState, useContext } from "react";
import Chat from "../chat/Chat";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import ChatBoxComponent from "../chatBox/ChatBoxComponent";

export default function Home() {
  const [inputBox, setInputBox] = useState("");
  const { setDebounceTimeout } = useContext(AppContext);
  const [toggler, setToggler] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { addInputs } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceTimeout(inputBox);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputBox, setDebounceTimeout]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAskBtn = (e) => {
    e.preventDefault();
    if (!inputBox.trim()) return;
    addInputs(inputBox);
    navigate("/conversations");
  };

  const handleMessage1 = () => {
    const message = "Hi, what is the weather?";
    navigate("/conversations", { state: { message } });
  };
  const handleMessage2 = () => {
    const message = "Hi, what is my location?";
    navigate("/conversations", { state: { message } });
  };
  const handleMessage3 = () => {
    const message = "Hi, what is the temperature?";
    navigate("/conversations", { state: { message } });
  };
  const handleMessage4 = () => {
    const message = "Hi, how are you?";
    navigate("/conversations", { state: { message } });
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
            <header>
              <h1 className={styles.bot_h1}>Bot AI</h1>
            </header>
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
              <div className={styles.optionCard} onClick={handleMessage1}>
                <h3>Hi, what is the weather</h3>
                <p>Get immediate AI generated response</p>
              </div>
              <div className={styles.optionCard} onClick={handleMessage2}>
                <h3>Hi, what is my location</h3>
                <p>Get immediate AI generated response</p>
              </div>
            </div>
            <div className={styles.groupOption}>
              <div className={styles.optionCard} onClick={handleMessage3}>
                <h3>Hi, what is the temperature</h3>
                <p>Get immediate AI generated response</p>
              </div>
              <div className={styles.optionCard} onClick={handleMessage4}>
                <h3>Hi, how are you</h3>
                <p>Get immediate AI generated response</p>
              </div>
            </div>
          </div>

          {isMobile && (
            <div className={styles.mobileOptionView}>
              <div className={styles.optionCard} onClick={handleMessage1}>
                <h3>Hi, what is the weather</h3>
                <p>Get immediate AI generated response</p>
              </div>
              <div className={styles.optionCard} onClick={handleMessage2}>
                <h3>Hi, what is my location</h3>
                <p>Get immediate AI generated response</p>
              </div>
              <div className={styles.optionCard} onClick={handleMessage4}>
                <h3>Hi, how are you</h3>
                <p>Get immediate AI generated response</p>
              </div>
            </div>
          )}

          <ChatBoxComponent
            setInputBox={setInputBox}
            handleAskBtn={handleAskBtn}
          />
        </div>
      </div>
    </div>
  );
}
