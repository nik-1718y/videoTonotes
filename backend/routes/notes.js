const express = require("express");
const Notes = require("../models/Notes");

const router = express.Router();


// =========================
// 📥 GET ALL NOTES (Dashboard)
// =========================
router.get("/", async (req, res) => {
  try {
    const notes = await Notes.find().sort({ createdAt: -1 });

    res.json({
      message: "All notes fetched successfully",
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching notes",
      error: err.message,
    });
  }
});


// =========================
// 📄 GET SINGLE NOTE
// =========================
router.get("/:id", async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({
      message: "Note fetched successfully",
      data: note,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching note",
      error: err.message,
    });
  }
});


// =========================
// 🧹 DELETE NOTE (OPTIONAL)
// =========================
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Notes.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({ message: "Note not found" });
//     }

//     res.json({
//       message: "Note deleted successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Error deleting note",
//       error: err.message,
//     });
//   }
// });
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Notes.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting note",
      error: err.message,
    });
  }
});

module.exports = router;