import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
 


function Notes() {
    const contex = useContext(noteContext);
    const {notes,getNotes} = contex;

    useEffect(()=>{
      getNotes()
    },[])
  return (
    <>
        <AddNote/>
      <div className="row my-3">
        <h2>Your Notes</h2>

        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
}

export default Notes;
