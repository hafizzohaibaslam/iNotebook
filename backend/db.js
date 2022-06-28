const mongoose = require('mongoose');
mongoURI = "mongodb://localhost:27017/zohaib";
const connectToMongo=()=>{
    mongoose.connect(mongoURI,{useNewUrlParser: true,useUnifiedTopology:true})
    .then(()=>console.log("Mongo connection successfull..."))
    .catch((err)=>console.log(err));
}

module.exports = connectToMongo;
