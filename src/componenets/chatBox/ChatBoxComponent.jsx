import styles from "../home/Home.module.css";
export default function ChatBoxComponent({ setInputBox, handleAskBtn }) {
  return (
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
  );
}
