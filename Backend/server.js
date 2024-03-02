const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const icecreamModel = require('./models/Icecream.js');
const userModel = require('./models/Users.js'); // Change the import name
require("dotenv").config();
const uri = process.env.mongoURi;

app.use(cors());
app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Use routes
app.use('/', routes);

app.get('/getIcecream', (req, res) => {
  icecreamModel.find()
    .then(icecream => res.json(icecream))
    .catch(err => res.json(err))
});

app.post('/postUserData', (req, res) => { // Change to app.post for handling POST request
  let userData = req.body; // No need to wrap req.body in an object
  userModel.create(userData)
    .then(user => res.json(user))
    .catch(err => res.json(err))
});

app.get('/getUserData', (req, res) => {
  userModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;
