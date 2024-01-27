import React,{useContext} from 'react';
import NotesContext from "../contexts/notes/NotesContext";

function About() {
    const a = useContext(NotesContext);
  return (
    <div>
      <h1>This is the about component of {a.name} </h1>
    </div>
  )
}

export default About
