const express= require('express')
const router = express.Router()
const User = require('../model/User');
const Image =require('../model/Image')
router.use(express.json());

//UPDATE
router.put('/:id' , async (req,res) =>{
    if (req.body.userId === req.params.id)
    {
        if (req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        try{
            const upDateUser = await User.findByIdAndUpdate(req.params.id , {
                $set:req.body,
            });
            res.status(200).json(upDateUser);

        }catch(err){
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("you can update only your account!")
    }

});

//DELETE
router.delete('/:id' , async (req,res) =>{
    if (req.body.userID === req.params.id){
        try{
            const user = await User.findById(req.params.id);
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted ... ");
        }catch(err){
            res.status(500).json(err); }
        }catch(err){
            res.status(404).json("User not found !");
        
        }
    }

});

//Get user 
router.get("/:id" , async (req , res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password , ...others}=user._doc;
        res.status(200).json(others);

    }catch{

        res.status(500).json(err)
    }
})



//Post
router.post('/CreatePic/:id' , async (req , res )=>{

    const _id = req.params.id;
    const user = await User.findById(req.params.id)
    console.log(user)
    const Newimage = new Image ({
        Image:req.body.Image,
        description:req.body.description
       
    })
    user.images.push(Newimage)
    
    try {
        await user.save()
        res.status(201)
        res.send(user)
    }
    catch(e) {
        console.error(e)
    }
    console.log("Add");
} )



router.get('/image/:id' , async (req , res )=>{
    try{
           const user= await User.findById(req.params.id);
           if (!user){
             res.status(404).send("not found user");
           }
           res.status(201).send(user);
        

    }catch{
        res.status(500).send("not found city ")

    }
})


//delete
router.delete("/delete/:id", async (req,res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user.username === req.body.username) {
        try {
          await user.delete();
          res.status(200).json("city has been deleted...");
          
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your !");
      }
    } catch (err) {
      res.status(500).json(err);
    }
})






module.exports = router;
