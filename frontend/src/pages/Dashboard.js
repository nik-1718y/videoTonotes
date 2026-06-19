
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`http://localhost:5000/notes/${id}`);
      await axios.delete(`https://videotonotes-1.onrender.com/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNotes = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/notes");
      const res = await axios.get("https://videotonotes-1.onrender.com");
      setNotes(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.heading}>🚀 AI Video Notes</h1>
          <p style={styles.subHeading}>
            Transform videos into smart AI-generated notes
          </p>
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={styles.actionBar}>
        <button
          style={styles.uploadBtn}
          onClick={() => navigate("/upload")}
        >
          ➕ Upload New Video
        </button>
      </div>

      <div style={styles.grid}>
        {notes.map((note) => (
          <div
            key={note._id}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.borderColor = "#3b82f6";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(59,130,246,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#27272a";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.3)";
            }}
          >
            <div style={styles.icon}>📝</div>

            <h3 style={styles.cardTitle}>Generated Notes</h3>

            <p style={styles.text}>
              {note.notes?.substring(0, 200)}
              {note.notes?.length > 200 ? "..." : ""}
            </p>

            <div style={styles.buttonGroup}>
              <button
                style={styles.viewBtn}
                onClick={() => navigate(`/note/${note._id}`)}
              >
                View Notes
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div style={styles.emptyContainer}>
          <h2>No Notes Found</h2>
          <p>Upload a video to generate AI notes.</p>
        </div>
      )}
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

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  heading: {
    fontSize: "42px",
    fontWeight: "800",
    margin: 0,
    letterSpacing: "-1px",
  },

  subHeading: {
    color: "#94a3b8",
    marginTop: "8px",
    fontSize: "16px",
  },

  actionBar: {
    marginBottom: "30px",
  },

  uploadBtn: {
    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
  },

  logoutBtn: {
    background: "rgba(239,68,68,0.15)",
    color: "#f87171",
    border: "1px solid rgba(239,68,68,0.3)",
    padding: "12px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1px solid #27272a",
    borderRadius: "24px",
    padding: "25px",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  icon: {
    fontSize: "34px",
    marginBottom: "15px",
  },

  cardTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "12px",
  },

  text: {
    color: "#cbd5e1",
    lineHeight: "1.8",
    fontSize: "14px",
    minHeight: "110px",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  viewBtn: {
    flex: 1,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },

  deleteBtn: {
    flex: 1,
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },

  emptyContainer: {
    textAlign: "center",
    marginTop: "80px",
    color: "#94a3b8",
  },
};

export default Dashboard;

