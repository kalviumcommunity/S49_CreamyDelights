const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const { MongoClient } = require("mongodb");
const routes = require('./routes');
const icecreamModel = require('./models/Icecream.js')
require("dotenv").config();
const uri = process.env.mongoURi;
const mongoose = require('mongoose')


// Importing route handlers
 // Assuming your routes are defined in a file named routes.js

// MongoDB connection URL

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors())
app.use(express.json())

mongoose.connect(uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
 

// app.use(express.json());

// Use routes
app.use('/', routes);

// app.get("/flavours", async (req, res) => {
//   try {
//     // Connect to the MongoDB database
//     await client.connect(uri);

//     // Check if the connection is successful
//     if (client.topology.isConnected()) {
//       res.json({ message: "pong", database_status: "Connected" });
//       console.log("yes");
//     } else {
//       res.json({ message: "pong", database_status: "Disconnected" });
//       console.log("no");
//     }
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // define the ping route
// app.get('/ping',(req,res)=>{
//   res.send('pong');
// });




app.get('/getIcecream',(req,res)=>{
  icecreamModel.find()
  .then(icecream => res.json(icecream))
  .catch(err => res.json(err))
})


if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}


module.exports = app;
