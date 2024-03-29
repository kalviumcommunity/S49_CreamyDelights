const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const icecreamModel = require('./models/Icecream.js');
const userModel = require('./models/Users.js'); 
const { required } = require('joi');
require("dotenv").config();
const uri = process.env.mongoURi;
const jwt = require('jsonwebtoken');
const Key=process.env.secretKey;



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
app.post('/postUserData', (req, res) => { 
  let userData = req.body; 
  userModel.create(userData)
    .then(user => {
      const token = jwt.sign({ userId: user._id, username: user.name }, Key, { expiresIn: '1h' });
      res.cookie("token", token);
      res.json({ message: "Signed up Successfully", token });
    })
    .catch(err => res.json(err));
});

app.get('/getUserData', (req, res) => {
  userModel.find()
    .then(users => res.json(users))
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


app.post('/postrate', async (req, res) => {
  try {
    const { flavour, rate, Feedback } = req.body;
    console.log('Received Rating:', { flavour, rate, Feedback });
    res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/getUserData/names', async (req, res) => {
    const names = await userModel.distinct('name');
    const unames = names.filter(username=>username)
    res.json({ Names: unames });
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
