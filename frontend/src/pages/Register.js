
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // await axios.post("http://localhost:5000/auth/register",
       await axios.post("https://videotonotes-1.onrender.com/auth/register",  
        {
        name,
        email,
        password,
      });

      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundGlow}></div>

      <div style={styles.box}>
        <div style={styles.logo}>🚀</div>

        <h1 style={styles.title}>Create Account</h1>

        <p style={styles.subtitle}>
          Join AI Video Notes and start generating smart notes
        </p>

        <input
          style={styles.input}
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleRegister}>
          Create Account
        </button>

        <p
          style={styles.link}
          onClick={() => navigate("/")}
        >
          Already have an account? Sign In →
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #0f172a 0%, #111827 50%, #020617 100%)",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Inter, Segoe UI, sans-serif",
  },

  backgroundGlow: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "#7c3aed",
    filter: "blur(180px)",
    opacity: 0.2,
    borderRadius: "50%",
  },

  box: {
    width: "430px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px",
    padding: "40px",
    textAlign: "center",
    boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
    zIndex: 2,
  },

  logo: {
    fontSize: "55px",
    marginBottom: "15px",
  },

  title: {
    color: "#fff",
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "15px",
    marginBottom: "30px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(90deg, #7c3aed, #8b5cf6)",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 10px 25px rgba(124,58,237,0.4)",
  },

  link: {
    color: "#a78bfa",
    marginTop: "20px",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default Register;

