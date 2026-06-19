
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!video) {
      alert("Please select a video");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("userId", localStorage.getItem("userId"));

    try {
      setLoading(true);

      const res = await axios.post(
        // "http://localhost:5000/upload",
        "https://videotonotes-1.onrender.com",
        formData
      );

      setResult(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Upload failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.glow}></div>

      <div style={styles.uploadCard}>
        <h1 style={styles.heading}>🎥 Upload Video</h1>

        <p style={styles.subHeading}>
          Upload your video and let AI generate smart notes,
          summaries and transcripts.
        </p>

        <div style={styles.fileBox}>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>

        {video && (
          <div style={styles.fileInfo}>
            📁 {video.name}
          </div>
        )}

        <div style={styles.buttonContainer}>
          <button
            style={styles.generateBtn}
            onClick={handleUpload}
          >
            🚀 Generate AI Notes
          </button>

          <button
            style={styles.backBtn}
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </button>
        </div>

        {loading && (
          <div style={styles.loadingCard}>
            <h3>🤖 AI Processing...</h3>
            <p>Extracting Audio → Transcribing → Generating Notes</p>

            <div style={styles.spinner}></div>
          </div>
        )}
      </div>

      {result && (
        <div style={styles.resultContainer}>
          <div style={styles.resultCard}>
            <h2>📌 Summary</h2>
            <p>{result.summary}</p>
          </div>

          <div style={styles.resultCard}>
            <h2>📝 AI Notes</h2>
            <pre style={styles.pre}>
              {result.notes}
            </pre>
          </div>

          <div style={styles.resultCard}>
            <h2>🎙 Transcript</h2>
            <pre style={styles.pre}>
              {result.transcript}
            </pre>
          </div>
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
    position: "relative",
  },

  glow: {
    position: "absolute",
    top: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "500px",
    height: "500px",
    background: "#3b82f6",
    filter: "blur(180px)",
    opacity: 0.15,
    borderRadius: "50%",
  },

  uploadCard: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "24px",
    padding: "40px",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },

  heading: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "10px",
  },

  subHeading: {
    color: "#94a3b8",
    marginBottom: "30px",
    lineHeight: "1.8",
  },

  fileBox: {
    padding: "30px",
    border: "2px dashed rgba(255,255,255,0.15)",
    borderRadius: "18px",
    marginBottom: "20px",
  },

  fileInfo: {
    marginBottom: "20px",
    color: "#60a5fa",
    fontWeight: "600",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  generateBtn: {
    padding: "14px 24px",
    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
  },

  backBtn: {
    padding: "14px 24px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: "#fff",
    cursor: "pointer",
  },

  loadingCard: {
    marginTop: "30px",
    padding: "25px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "18px",
  },

  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(255,255,255,0.2)",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    margin: "20px auto",
    animation: "spin 1s linear infinite",
  },

  resultContainer: {
    maxWidth: "1100px",
    margin: "30px auto",
  },

  resultCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "25px",
    marginBottom: "20px",
  },

  pre: {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    color: "#cbd5e1",
    lineHeight: "1.8",
    fontFamily: "inherit",
  },
};

export default Upload;

