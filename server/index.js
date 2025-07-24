import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import Content from './models/Content.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get('/', (req, res) => {
  res.send('Welcome to the SHER server!');
});

app.get('/api/code/:code', async (req, res) => {
  try {
    const items = await Content.find({ code: req.params.code }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { code, text } = req.body;
    let newItem;

    if (req.file) {
      newItem = new Content({
        code,
        type: req.file.mimetype.startsWith('audio') ? 'audio' : 'file',
        filename: req.file.originalname,
        fileData: {
          data: req.file.buffer,
          contentType: req.file.mimetype
        }
      });
    } else {
      newItem = new Content({
        code,
        type: 'text',
        text
      });
    }

    await newItem.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process if DB fails
  });
