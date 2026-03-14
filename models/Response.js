const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  answer: {
    type: String,
    enum: ['yes', 'No really'],
    required: true
  },
  expectationsHtml: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Response', responseSchema);