const express = require('express');
const app=express();
const mongoose=require('mongoose');
const City = require('./model/City');
const Image =require('./model/Image');
const Admin = require('./Router/AdminRouter');
const User = require('./Router/UserRouter');
const AthuntecationUser =require('./Router/AthuntecatonUser')
var cors = require('cors')
const PORT = process.env.PORT ||5000

app.use(cors())
app.use(express.json());


//Router
app.use('/app/admin' , Admin)
app.use('/app/user' , User)
app.use(AthuntecationUser);

//connect with mongoose
const URL= 'mongodb+srv://abrar_alzh:719719@cluster0.abt43.mongodb.net/saudiArabe?retryWrites=true&w=majority'
mongoose.connect(URL)
.then(console.log(""))

app.listen(PORT, () => console.log("up"))


