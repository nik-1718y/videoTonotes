

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);

  const fetchNote = async () => {
    try {
      // const res = await axios.get(`http://localhost:5000/notes/${id}`);
      const res = await axios.get(`https://videotonotes-1.onrender.com/${id}`);
      setNote(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  if (!note) {
    return (
      <div style={styles.loadingContainer}>
        <h2 style={styles.loading}>⏳ Loading Notes...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button
          style={styles.backBtn}
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      <h1 style={styles.heading}>🧠 AI Notes Details</h1>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.icon}>📌</span>
          <h2>Summary</h2>
        </div>

        <p style={styles.text}>{note.summary}</p>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.icon}>📝</span>
          <h2>Full Notes</h2>
        </div>

        <pre style={styles.pre}>{note.notes}</pre>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.icon}>🎙️</span>
          <h2>Transcript</h2>
        </div>

        <pre style={styles.pre}>{note.transcript}</pre>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background:
      "linear-gradient(135deg, #0f172a 0%, #111827 50%, #020617 100%)",
    color: "#fff",
    fontFamily: "Inter, Segoe UI, sans-serif",
  },

  loadingContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },

  loading: {
    color: "#60a5fa",
  },

  topBar: {
    marginBottom: "25px",
  },

  backBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
    color: "white",
    fontWeight: "600",
    boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
  },

  heading: {
    fontSize: "40px",
    fontWeight: "800",
    marginBottom: "30px",
    letterSpacing: "-1px",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "24px",
    padding: "28px",
    marginBottom: "25px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },

  icon: {
    fontSize: "24px",
  },

  text: {
    color: "#d1d5db",
    lineHeight: "1.9",
    fontSize: "16px",
  },

  pre: {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    color: "#cbd5e1",
    lineHeight: "1.8",
    fontSize: "15px",
    fontFamily: "inherit",
  },
};

export default NoteDetail;

