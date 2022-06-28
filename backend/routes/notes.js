const express= require('express');
const router = express.Router();
const {body , validationResult} = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
const Notes= require('../models/Notes');
// Route 1: get All the Notes using GET "/api/notes/getuse" 

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
     
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);
})  

// Route 2: add new Notes using post "/api/notes/addnote" 

router.post('/addnote',fetchuser,
// [
//   body('title', 'Enter a valid title').isLenght({min : 3}),
//      body('description', 'Enter a valid description').isLenght({min : 5}),
// ],
async (req,res)=>{

    const {title,description,tag} = req.body;
     // if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array()});
  }

  const note = new Notes({
    title,description,tag,user:req.user.id
  })
 const saveNote =await note.save()
    res.json(saveNote);
})  


// Route 3: update an existing Notes using post "/api/notes/updatenote" 
router.put('/updatenote/:id',fetchuser,async (req,res)=>{

const{title,description,tag} = req.body;
// create a newnote object
 
const newNotes = {};
if(title){newNotes.title = title};
if(title){newNotes.description = description};
if(title){newNotes.tag = tag};


// find the note to be updated and update 

let note =await Notes.findById(req.params.id);
if(!note){return res.status(404).send("not found")}

if(note.user.toString()!== req.user.id){
  return res.status(401).send("not allowed");
}

note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNotes},{new:true})

res.json({note});

})



// Route 4: delete an existing Notes using:Delete "/api/notes/updatenote" 
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{

const{title,description,tag} = req.body;


// find the note to be deleted and delete 

let note =await Notes.findById(req.params.id);
if(!note){return res.status(404).send("not found")}

// alow deletion onlu if user owns this Note 

if(note.user.toString()!== req.user.id){
  return res.status(401).send("not allowed");
}

note = await Notes.findByIdAndDelete(req.params.id)

res.json({"Succes": "Note has been deleted"});

})



module.exports=router;