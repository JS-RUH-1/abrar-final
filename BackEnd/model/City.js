const mongoose = require('mongoose')
const Schema=mongoose.Schema;
const Place = require('./Place').schema;

const CitySchema = new Schema({
    name: {
        type: String,
        required: [true, "City name should be provided"]
    },
    
    BigImage :{
        type:String ,
        required:[true , "Image for city shold be provided"]
    },

    centerImage :{
        type:String,
        required:[true , "Image for city center shold be provided"]
    },

    museumsImage :{
        type:String,
        required:[true , "Image for museums shold be provided"]
    },

    trendImage :{
        type:String,
        // required:[true , "Image for Markts shold be provided"]
    },

    

    places:[Place]

})
const City= mongoose.model("City",CitySchema);
module.exports=City;