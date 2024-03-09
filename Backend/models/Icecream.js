const mongoose = require('mongoose')

const icecreamSchema =  new mongoose.Schema({
    flavour : String,
    description: String,
    imageurl: String 

    
})

const icecreamModel = mongoose.model("flavours",icecreamSchema)
module.exports = icecreamModel