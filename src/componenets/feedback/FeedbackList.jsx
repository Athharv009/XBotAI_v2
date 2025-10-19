import { useState, useEffect } from "react";
import styles from "../home/Home.module.css";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(storedFeedbacks);
  }, []);

  const filteredFeedbacks = filter
    ? feedbacks.filter(f => f.rating === filter)
    : feedbacks;

  return (
    <div className={styles.home}>
      <h1 style={{ textAlign: "center" }}>All Feedback</h1>
      <div style={{ margin: "20px auto", textAlign: "center" }}>
        <label>Filter by Rating: </label>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="👍">👍</option>
          <option value="👎">👎</option>
        </select>
      </div>
      {filteredFeedbacks.length === 0 ? (
        <p style={{ textAlign: "center" }}>No feedbacks yet.</p>
      ) : (
        filteredFeedbacks.map((f, i) => (
          <div key={i} style={{ marginBottom: "20px", textAlign: "center" }}>
            <h3>{f.date}</h3>
            <p>{f.feedback}</p>
            {f.rating && <p>Rating: {f.rating}</p>}
          </div>
        ))
      )}
    </div>
  );
}
