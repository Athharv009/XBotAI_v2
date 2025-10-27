import { Link } from "react-router";
import styles from "./Chat.module.css";

export default function Chat() {
  return (
    <div className={styles.mainChatContainer}>
      <div className={styles.chatComponent}>
        <Link to={'/'}>
          <img
            src={require("../../assets/logo.png")}
            alt="Logo"
            className={styles.chatLogo}
            height={"100%"}
            width={"100%"}
          />
        </Link>

        <div className={styles.mainChatTextEdit}>
          
          <a href="/" style={{ textDecoration: "none" }} className={styles.mainChatTextEdit}>
            <h2 className={styles.chatText}>New Chat</h2>
          <img
            src={require("../../assets/edit.png")}
            alt="Logo"
            className={styles.chatEdit}
          />
          </a>
          
          
        </div>
      </div>
      <div className={styles.pastConversationContainer}>
        <Link to={"/history"}>
          <button className={styles.pastBtn}>Past Conversations</button>
        </Link>
      </div>
    </div>
  );
}
