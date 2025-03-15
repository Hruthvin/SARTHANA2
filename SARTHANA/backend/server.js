require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const wordExtractor = require('word-extractor');
const fs = require('fs');
const fetch = require('node-fetch');
const cron = require('node-cron');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend requests

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sarthana')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Mongoose Schemas and Models
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const currentAffairsSchema = new mongoose.Schema({
  title: String,
  description: String,
  source: String,
  url: String,
  publishedAt: Date,
});

const Note = mongoose.model('Note', noteSchema);
const CurrentAffair = mongoose.model('CurrentAffair', currentAffairsSchema);

// API for Importing Notes
app.post('/import-notes', async (req, res) => {
  const filePaths = process.env.NOTES_FILE_PATHS?.split(',') || [
    "S:\\HISTORY\\MODERN INDIAN HISTORY NOTES.docx",
    "S:\\HISTORY\\WORLD HISTORY NOTES.docx",
    "S:\\HISTORY\\ANICIENT INDIAN HISTORY NOTES.docx",
    "S:\\HISTORY\\MEDIEVAL INDIAN HISTORY NOTES.docx"
  ];

  try {
    const extractor = new wordExtractor();
    const notesPromises = filePaths.map(async (filePath) => {
      if (fs.existsSync(filePath)) {
        const document = await extractor.extract(filePath);
        const title = filePath.split("\\").pop().replace(".docx", "");
        const content = document.getBody();

        const existingNote = await Note.findOne({ title });
        if (!existingNote) {
          const note = new Note({ title, content });
          return note.save();
        }
      } else {
        console.error(`File not found: ${filePath}`);
      }
    });

    await Promise.all(notesPromises);
    res.status(201).json({ message: 'Notes imported successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to import notes' });
  }
});

// API for Fetching Notes
app.get('/notes', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const notes = await Note.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Fetch Current Affairs Daily Using Cron and NewsAPI
cron.schedule('0 0 * * *', async () => {
  console.log('Fetching current affairs...');
  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=India&apiKey=d3205315263f4498ad12b482b6485204`);
    const data = await response.json();

    if (data.articles) {
      const currentAffairsData = data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        source: article.source.name,
        url: article.url,
        publishedAt: article.publishedAt,
      }));

      await CurrentAffair.insertMany(currentAffairsData);
      console.log('Current affairs updated successfully.');
    } else {
      console.log('No articles found.');
    }
  } catch (err) {
    console.error('Error fetching current affairs:', err);
  }
});

// API for Fetching Current Affairs
app.get('/current-affairs', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const affairs = await CurrentAffair.find()
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(affairs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching current affairs' });
  }
});

// Start Server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
