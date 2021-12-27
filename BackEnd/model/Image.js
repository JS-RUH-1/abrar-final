const mongoose = require('mongoose')
const Schema=mongoose.Schema;

const ImageSchema = new Schema({
    Image :{
        type:String,
        required:[true , "Image shold be provided"]
    },
    description :{
        type :String,
    }
})

const Image= mongoose.model("image",ImageSchema);
module.exports=Image;