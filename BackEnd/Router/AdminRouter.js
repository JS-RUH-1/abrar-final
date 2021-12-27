const express= require('express')
const router = express.Router()
router.use(express.json());
const City = require('../model/City');
const User = require('../model/User');
const please =require('../model/Place');


//POST //Done 
router.post('/CreateCity' , async (req , res )=>{

    const NewCity = new City ({
        name:req.body.data.name,
        BigImage:req.body.data.BigImage,
        centerImage:req.body.data.centerImage,
        museumsImage:req.body.data.museumsImage,
        trendImage:req.body.data.trendImage,
    })
    
    try {
        await NewCity.save()
        res.status(200)
        const cityToSend = await City.find({});
      res.status(200).send(cityToSend)
    }
    catch(e) {
        console.error(e)
    }
    console.log("Add");
} )

//getPlease
router.get('/getPlease/:id/:category' , async(req , res)=>{
  try{
    City.findById({_id:req.params.id}).then((city)=>{
      result=(city.places.filter((e)=>{
        return e.type==req.params.category
      }))

      res.send(result)
    })
  }catch{
    res.status(500).send()
  }
})

//router for pleace  Done
router.post('/CreatePleace/:id' , async (req , res )=>{
    const _id = req.params.id;
    const city = await City.findById(req.params.id)
    const NewPleace = new please ({
        type:req.body.data.type,
        image:req.body.data.image,
        description:req.body.data.description,
        location:req.body.data.location,
        
    });
    city.places.push(NewPleace)

    try {
        await city.save()
        res.status(200)
        res.send(city)
    }
    catch(e) {
        console.error(e)
    }
    console.log("Add");
} )

//get 
router.get('/getCity' , async (req , res )=>{
    try{
            City.find({}).then((city)=>{
                res.send(city)
        })

    }catch{
        res.status(500).send()

    }
})

//get 
router.get('/city/:id' , async (req , res )=>{
    try{
           const city= await City.findById(req.params.id);
           if (!city){
             res.status(404).send("not found city");
           }
           res.status(201).send(city);
        

    }catch{
        res.status(500).send("not found city ")

    }
})

//Update //schema insaed schema //Done 
//update please
router.put("/place/:idcity/:idplaese", async (req,res) => {
  City.update(
    {"places._id":req.params.idplaese},
    {
      $set:{
        "places.$.image":req.body.image,
        "places.$.description":req.body.description,
        "places.$.location":req.body.location
      },
    },
    function(err){
      if(err){
        console.log(err)
        return res.send(err)

      }
    }
  );

  const city = await City.findById(req.params.idcity);
  res.status(201).send(city);

    // try {
    //   const pleac = await please.findById(req.params.id);
    //   if (pleac.type === req.body.type) {
    //     try {
    //       const updatedCity = await please.findByIdAndUpdate(req.params.id, {
    //           $set: req.body,
    //         },
    //         { new: true }
    //       );
    //       res.status(200).json(updatedCity);
        
    //     } catch (err) {
    //       res.status(500).json(err);
    //     }
    //   } else {
    //     res.status(401).json("You can update only your !");
    //   }
    // } catch (err) {
    //   res.status(500).json(err);
    // }
})

//done
router.put("/city/:id", async (req,res) => {
  const allowedUpdates = ['name', 'BigImage', 'centerImage', 'museumsImage', 'trendImage'];
  const updates = Object.keys(req.body)
  const isValidOperation  = updates.every((update)=> allowedUpdates.includes(update))
  if(!isValidOperation) {
      return res.status(400).send({error: 'Invalid updates'});
  }
  try {
      const city = await City.findOne({_id: req.params.id});
      if(!city) {return res.status(404).send(404).send()}
      updates.forEach((update)=> {
          city[update] = req.body[update]
      })
      await city.save()
      const cityToSend = await City.find({});
      res.status(200).send(cityToSend)
  } catch(e){
      res.status(400).send(e)
      console.error(e)
  }
})



//delete city Done
router.delete("/deleteCity/:id", async (req,res) => {
  try {
    const city = await City.findById({_id:req.params.id});
    if (city._id == req.params.id) {
      try {
        await city.delete();
        City.find({}).then((city)=>{
          res.status(200).send(city)
        })
        
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("wrong city id");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})






















module.exports = router;