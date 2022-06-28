const express= require('express');
const User = require('../models/User');
const router = express.Router();
const {body , validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "some secrettoken";

//Route 1 Create a User using: POST "/api/auth/createuser".


router.post('/createuser',[ 
body('name','Enter a valid name').isLength({min: 3}),
body('email','Enter a valid email').isEmail(),
body('email','Password must be atleast 5 characters').isLength({min: 5}),
], async (req,res)=>{
  //  console.log(req.body);
  // const user = User(req.body);
  // user.save();

  // if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array()});
  }

  // check weather the user with this email exists alredy
try{

  let user =await User.findOne({email:req.body.email});
  if(user){
    return res.status(400).json({error: "sorry a user with this email already exists"});

  }
const salt =await bcrypt.genSalt(10);
const secPass =await bcrypt.hash(req.body.password,salt); 

  // create a new user 
  user = await User.create({      

    name: req.body.name,
    email:req.body.email,
    password:secPass,
  })

  const data ={
    user:{
      id:user.id
    }
  }
  // const data=user.id;

  const authtoken=jwt.sign(data,JWT_SECRET);
res.json({authtoken});

  // res.json({user});
  //.then (user=>res.json(user));
  // res.json(req.body);
}catch(error){
  console.error(error.message);
  res.status(500).send("some error occured");
}



})





//Route 2 authenticate a User using: POST "/api/auth/createuser"

router.post('/login',[
body('email','Enter a valid email').isEmail(),
body('password','password cannot be blank').exists()

], async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    return res.state(400).json({errors:errors.array()});
  }
const {email,password} = req.body

try{
  let user =await User.findOne({email});
  if(!user){
  return res.status(400).json({error:"Please enter corret credentials"});
}

const passwordcompare = bcrypt.compare(password,user.password);

if(!passwordcompare)
{
   return res.status(400).json({error:"Please enter corret credentials"});
}

const data ={
  user:{
    id:user.id
  }
}
const authtoken = jwt.sign(data,JWT_SECRET);
res.json(authtoken);
}
catch(error){
  console.error(error.message);
  res.status(500).send("some error occured");
}
})

// Route 3 Get loggedin user  Detail using : POST "/api/auth/getuser". login required

router.post('/getuser',fetchuser, async (req,res)=>{

try{
   userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
}
catch(error){
  console.error(error.message);
  res.status(500).send("some error occured");
}

})


module.exports=router;