const mongoose = require('mongoose')
const Schema=mongoose.Schema


const PlaceSchema =new Schema({
    type :{
        type:String,
    },

    image:{
        type:String
    },

    description:{
        type:String
    },
    location:{
        type:String

    }

})

const pleace= mongoose.model("place",PlaceSchema)
module.exports=pleace;