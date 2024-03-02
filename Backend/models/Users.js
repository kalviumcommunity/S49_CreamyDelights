const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String
});

// Create a model from the schema
const user = mongoose.model('users', userSchema);

module.exports = user;
