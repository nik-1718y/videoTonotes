// const express = require("express");
// const multer = require("multer");
// const ffmpeg = require("fluent-ffmpeg");
// const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
// const fs = require("fs");

// const OpenAI = require("openai");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const Notes = require("../models/Notes");

// const router = express.Router();

// ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// // OpenAI (Whisper)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Gemini
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const geminiModel = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// // Multer Storage
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post("/", upload.single("video"), async (req, res) => {
//   try {
//     const videoPath = req.file.path;
//     const audioPath = `uploads/audio-${Date.now()}.mp3`;

//     // Extract Audio
//     await new Promise((resolve, reject) => {
//       ffmpeg(videoPath)
//         .toFormat("mp3")
//         .save(audioPath)
//         .on("end", resolve)
//         .on("error", reject);
//     });

//     // Transcription (OpenAI Whisper)
//     const transcription = await openai.audio.transcriptions.create({
//       file: fs.createReadStream(audioPath),
//       model: "whisper-1",
//     });

//     const transcript = transcription.text;

//     // Notes Generation (Gemini)
//     const result = await geminiModel.generateContent(`
// Convert this transcript into:

// 1. Short Summary
// 2. Detailed Notes with Headings
// 3. Key Points

// Transcript:
// ${transcript}
//     `);

//     const notes = result.response.text();

//     // Save to DB
//     const savedNotes = await Notes.create({
//       userId: req.body.userId,
//       transcript,
//       notes,
//       summary: notes,
//     });

//     // Cleanup
//     if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
//     if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);

//     res.json({
//       success: true,
//       message: "AI Notes generated successfully",
//       data: savedNotes,
//     });
//   } catch (err) {
//     console.error(err);

//     res.status(500).json({
//       success: false,
//       message: "AI processing failed",
//       error: err.message,
//       code: err.code || null,
//     });
//   }
// });

// module.exports = router;















// const express = require("express");
// const multer = require("multer");
// const ffmpeg = require("fluent-ffmpeg");
// const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
// const fs = require("fs");
// const { spawn } = require("child_process");

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const Notes = require("../models/Notes");

// const router = express.Router();

// ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// // =========================
// // 🔑 GEMINI SETUP
// // =========================
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const geminiModel = genAI.getGenerativeModel({
//   model: "gemini-3.5-flash",
// });

// // =========================
// // 📦 MULTER STORAGE
// // =========================
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // =========================
// // 🚀 UPLOAD VIDEO → AI NOTES
// // =========================
// router.post("/", upload.single("video"), async (req, res) => {
//   try {
//     const videoPath = req.file.path;
//     const audioPath = `uploads/audio-${Date.now()}.mp3`;

//     // =========================
//     // 🎥 1. EXTRACT AUDIO (FFMPEG)
//     // =========================
//     await new Promise((resolve, reject) => {
//       ffmpeg(videoPath)
//         .toFormat("mp3")
//         .save(audioPath)
//         .on("end", resolve)
//         .on("error", reject);
//     });

//     // =========================
//     // 🎙️ 2. TRANSCRIPTION (LOCAL WHISPER - FREE)
//     // =========================
//     const transcript = await new Promise((resolve, reject) => {
//       const python = spawn("python", ["transcribe.py", audioPath]);

//       let data = "";

//       python.stdout.on("data", (chunk) => {
//         data += chunk.toString();
//       });

//       python.stderr.on("data", (err) => {
//         console.log("Whisper error:", err.toString());
//       });

//       python.on("close", () => {
//         resolve(data.trim());
//       });
//     });

//     // =========================
//     // 🧠 3. GEMINI NOTES GENERATION
//     // =========================
//     const result = await geminiModel.generateContent(`
// Convert this transcript into:

// 1. 📌 Short Summary
// 2. 🧠 Detailed Notes with Headings
// 3. 🔑 Key Points

// Transcript:
// ${transcript}
//     `);

//     const notes = result.response.text();

//     // =========================
//     // 💾 4. SAVE TO DB
//     // =========================
//     const savedNotes = await Notes.create({
//       userId: req.body.userId,
//       transcript,
//       notes,
//       summary: notes,
//     });

//     // =========================
//     // 🧹 CLEANUP
//     // =========================
//     if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
//     if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);

//     // =========================
//     // 📤 RESPONSE
//     // =========================
//     res.json({
//       success: true,
//       message: "AI Notes generated successfully (Gemini + Local Whisper)",
//       data: savedNotes,
//     });

//   } catch (err) {
//     console.error(err);

//     res.status(500).json({
//       success: false,
//       message: "AI processing failed",
//       error: err.message,
//       code: err.code || null,
//     });
//   }
// });

// module.exports = router;













const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const fs = require("fs");
const { spawn } = require("child_process");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Notes = require("../models/Notes");

const router = express.Router();

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// =========================
// 🔑 GEMINI SETUP
// =========================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// =========================
// 📦 MULTER STORAGE
// =========================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// =========================
// 🚀 UPLOAD VIDEO → AI NOTES
// =========================
router.post("/", upload.single("video"), async (req, res) => {
  let videoPath = null;
  let audioPath = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No video uploaded",
      });
    }

    videoPath = req.file.path;
    audioPath = `uploads/audio-${Date.now()}.mp3`;

    // =========================
    // 🎥 1. EXTRACT AUDIO
    // =========================
    await new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .toFormat("mp3")
        .save(audioPath)
        .on("end", resolve)
        .on("error", reject);
    });

    // =========================
    // 🎙️ 2. TRANSCRIBE AUDIO
    // =========================
    const transcript = await new Promise((resolve, reject) => {
      const python = spawn("python", ["transcribe.py", audioPath]);

      let output = "";
      let errorOutput = "";

      python.stdout.on("data", (data) => {
        output += data.toString();
      });

      python.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      python.on("close", (code) => {
        if (code !== 0) {
          return reject(
            new Error(errorOutput || "Whisper transcription failed")
          );
        }

        resolve(output.trim());
      });
    });

    if (!transcript) {
      throw new Error("Transcript is empty");
    }

    // =========================
    // 🧠 3. GENERATE NOTES
    // =========================
    const result = await geminiModel.generateContent(`
You are an expert study assistant.

The transcript may contain speech recognition mistakes.
Understand the content and automatically correct obvious errors.

Generate professional study notes in this format:

# 📌 Summary

# 🧠 Detailed Notes

# 🔑 Key Points

# 📚 Important Terms

Rules:
- Return ONLY notes.
- Do NOT include transcript.
- Do NOT repeat content.
- Use proper headings.
- Use bullet points where necessary.
- Make notes easy to revise.

Transcript:
${transcript}
`);

    let notes = result.response.text();

    // Remove accidental transcript section
    notes = notes
      .replace(/🎙️ Transcript[\s\S]*/i, "")
      .replace(/Transcript[\s\S]*/i, "")
      .trim();

    // =========================
    // 💾 SAVE TO DATABASE
    // =========================
    const savedNotes = await Notes.create({
      userId: req.body.userId,
      transcript,
      notes,
      summary: notes,
    });

    // =========================
    // 🧹 CLEANUP FILES
    // =========================
    if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);

    // =========================
    // 📤 RESPONSE
    // =========================
    return res.status(200).json({
      success: true,
      message: "AI Notes generated successfully",
      data: savedNotes,
    });
  } catch (err) {
    console.error("Upload Error:", err);

    // Cleanup on error
    if (videoPath && fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }

    if (audioPath && fs.existsSync(audioPath)) {
      fs.unlinkSync(audioPath);
    }

    return res.status(500).json({
      success: false,
      message: "AI processing failed",
      error: err.message,
    });
  }
});

module.exports = router;