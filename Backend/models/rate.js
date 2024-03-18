const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  flavour: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  feedback: {
    type: String
  }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
