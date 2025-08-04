import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import Content from "./models/Content.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/shers";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  });

// Get content by code
app.get("/api/content/:code", async (req, res) => {
  try {
    const contents = await Content.find({ code: req.params.code });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

// Upload content
app.post("/api/content", upload.single("file"), async (req, res) => {
  try {
    const { code, type, text } = req.body;
    let content = { code, type };

    if (type === "text") {
      content.text = text;
    } else if (req.file) {
      content.filename = req.file.originalname;
      content.fileData = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await Content.create(content);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Failed to upload content" });
  }
});

// Delete content
app.delete("/api/content/:id", async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete content" });
  }
});
