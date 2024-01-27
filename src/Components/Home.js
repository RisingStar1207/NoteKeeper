import React, { useContext, useEffect } from 'react';
import Form from './Form';
import NotesContext from '../contexts/notes/NotesContext';
import DisplayNotes from './DisplayNotes';
import { useNavigate } from 'react-router-dom';


function Home() {
  const context = useContext(NotesContext);
  const navigate = useNavigate();

  const { allNotes } = context;
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      allNotes();
    }
    else {
      navigate("/login");
    }
  }, [])


  return (
    <>
      <div className="container my-3">
        <h2>Add your Note</h2>
        <Form />
      </div>
      <div className='container'>
        <DisplayNotes />
      </div>
    </>
  )
}

export default Home
