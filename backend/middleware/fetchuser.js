const jwt = require ('jsonwebtoken');
const JWT_SECRET = "some secrettoken";


const fetchuser = (req,res,next)=>{
    //Get the user from the jwt token and add id to req object 
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "please authenticate using a vlaid token "})
    }

    const data = jwt.verify(token, JWT_SECRET)

    req.user = data.user;

    next()
}


module.exports=fetchuser;