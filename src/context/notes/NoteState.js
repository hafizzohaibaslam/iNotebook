import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
const host = "http://localhost:5000";
const notesInitial = []

const [notes, setNotes] = useState(notesInitial)

// Add a Note

//tO DO API call

  //API CAll
  const addNote=async (title,description,tag)=>{


  const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiNjc1ZjY4OGFjM2EwMDAyNWNiNzczIn0sImlhdCI6MTY1NjEyNDkzMn0.h2JzO0FIrSA5-kulC_l2QMbYTog11ZzMJiGRT8tIPSw"
    },
    
    body: JSON.stringify(title,description,tag)
  });


   const note =  {
    "_id": "62b695a475c00a3a06c9abf31",
    "user": "62b675f688ac3a00025cb7732",
    "title": "my notes",
    "description": "good notes",
    "tag": "personal",
    "date": "2022-06-25T04:57:08.613Z",
    "__v": 0
  }
    setNotes(notes.concat(note))
}


// gET all  Notes

//tO DO API call

  //API CAll
  const getNotes=async ()=>{


    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiNjc1ZjY4OGFjM2EwMDAyNWNiNzczIn0sImlhdCI6MTY1NjEyNDkzMn0.h2JzO0FIrSA5-kulC_l2QMbYTog11ZzMJiGRT8tIPSw"
      },
    });
  
    const json = await response.json()
  console.log(json)
   
    setNotes(json)
  }





// Delete a Note
const deleteNote= (id)=>{
console.log("Deleting the note with id" + id);
const newNotes = notes.filter((note)=>{
 return note._id!==id
})
setNotes(newNotes);
}

//Edit a Note
const editNote= async(id,title,description,tag)=>{


  //API CAll

  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiNjc1ZjY4OGFjM2EwMDAyNWNiNzczIn0sImlhdCI6MTY1NjEyNDkzMn0.h2JzO0FIrSA5-kulC_l2QMbYTog11ZzMJiGRT8tIPSw"
    },
    
    body: JSON.stringify(title.description,tag)
  });
 const json = response.json;

  
for (let index = 0; index < notes.length; index++) {
  const element = notes[index];
  if(element._id ==id){
    element.title= title;
    element.description=description;
    element.tag = tag;
  }
    
}
}


  //   const s1 = {
  //     name: "zohaib",
  //     class: "cs",
  //   };

  //   const [state, setState] = useState(s1);
  //   const update = () => {
  //     setTimeout(() => {
  //       setState({
  //         name: "awais",
  //         class: "SE",
  //       });
  //     }, 1000);
  //   };

  return (
    <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>{props.children}</noteContext.Provider>
  );
};

export default NoteState;
