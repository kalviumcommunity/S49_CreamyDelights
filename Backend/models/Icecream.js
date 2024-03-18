const mongoose = require('mongoose')

const icecreamSchema =  new mongoose.Schema({
    flavour : String,
    description: String,
    imageurl: String,
    username: String
    
})

const icecreamModel = mongoose.model("flavours",icecreamSchema)
module.exports = icecreamModel