import { useEffect, useState } from "react";
import Chat from "../chat/Chat";
import styles from "../home/Home.module.css";
import hstyles from "./PastConversation.module.css";

export default function PastConversation() {
  const [toggler, setToggler] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
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
      </div>
    </div>
  );
}
