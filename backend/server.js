// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const authRoutes = require("./routes/auth.js");
// const uploadRoutes = require("./routes/uploads.js");
// const notesRoutes = require("./routes/notes.js");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/auth", authRoutes);
// app.use("/upload", uploadRoutes);
// app.use("/notes", notesRoutes);

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("Mongo Error:", err));

// app.listen(5000, () => {
//   console.log("🚀 Server running on port 5000");
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.js");
const uploadRoutes = require("./routes/uploads.js");
const notesRoutes = require("./routes/notes.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Running 🚀",
  });
});

// Routes
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/notes", notesRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});