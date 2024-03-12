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
  let userData = req.body; 
  userModel.create(userData)
    .then(user => {res.json(user),console.log(user)})
    .catch(err => res.json(err))
});

app.get('/getUserData', (req, res) => {
  userModel.find()
    .then(users => {res.json(users),
    console.log(users)})
    .catch(err => res.json(err))
});

app.delete("/deleteUser/:id",async(req,res)=>{
  const id = req.params.id
  userModel.findByIdAndDelete({_id:id}).then(i=>res.json(i))
})

app.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateInfo = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(id, updateInfo);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ updatedUser, Message: "Done" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.get("/",async(req,res)=>{
  res.json({Message:"Connected"})
})

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;
