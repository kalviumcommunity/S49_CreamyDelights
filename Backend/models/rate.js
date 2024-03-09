const mongoose = require('mongoose');

// Define the user schema
const rateSchema = new mongoose.Schema({
  flavour: String,
  rate: String,
  Feedback: String
});

// Create a model from the schema
const RateModel = mongoose.model('Rate', rateSchema); 

module.exports = RateModel;
