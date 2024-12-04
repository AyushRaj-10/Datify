const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Confession = require('./models/confession'); // Import the model

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/datify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
// POST /api/confessions (Add a new confession)
app.post('/confessions', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const newConfession = new Confession({ message });
    await newConfession.save();

    res.status(201).json(newConfession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET /api/confessions (Get last 50 confessions)
app.get('/api/confessions', async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ createdAt: -1 }).limit(50);
    res.json(confessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
