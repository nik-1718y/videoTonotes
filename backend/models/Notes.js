const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "AI Generated Notes",
  },
  transcript: String,
  notes: String,
  summary: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notes", notesSchema);
