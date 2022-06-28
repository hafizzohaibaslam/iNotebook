import React,{useContext,useState} from 'react';
import Notes from './Notes';
import noteContext from "../context/notes/noteContext";

function AddNote() { 

    const contex = useContext(noteContext);
    const {addNote} = contex;  //ye ma context me se addNote ko le ay
    
const [note, setNote] = useState({title: "",description:"" , tag: ""})

    const handleClick =(e)=>{
        e.preventDefault();
         addNote(note.title,note.description,note.tag); 
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    
  return (
    <div>
        <div className="container my-3">
      <h2>Add a Note</h2>
      <form>
  <div className="mb-3 my-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text"></div>
  </div>
  <div className="mb-3">
    <label htmlFor="desc" className="form-label">Description</label>
    <input type="text" className="form-control" id="desc" name="descripton" onChange={onChange}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>

</div>
    </div>
  )
}

export default AddNote