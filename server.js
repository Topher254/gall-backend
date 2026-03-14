require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Response = require('./models/Response');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow requests from your frontend (you can restrict later)
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/submit', async (req, res) => {
  try {
    const { answer, expectationsHtml } = req.body;

    // Basic validation
    if (!answer || !expectationsHtml) {
      return res.status(400).json({ error: 'Answer and expectations are required' });
    }

    const newResponse = new Response({ answer, expectationsHtml });
    await newResponse.save();

    res.status(201).json({ message: 'Response saved successfully' });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});