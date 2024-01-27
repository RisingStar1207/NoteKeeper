import React, { useContext, useRef, useState } from 'react'
import NotesContext from '../contexts/notes/NotesContext';
import Notes from './Notes';

function DisplayNotes() {
    const context = useContext(NotesContext);
    const { notes, editNotes } = context;

    const [note,setNote] = useState({eid:"",etitle:"",edescription:"",etags:""});

    const updateNote=(noteCurr)=>{
        ref.current.click(noteCurr);
        setNote({eid:noteCurr._id,etitle:noteCurr.title,edescription:noteCurr.description,etags:noteCurr.tags});
    }

    const Submit=(e)=>{
        e.preventDefault();
        editNotes(note.eid,note.etitle,note.edescription,note.etags);
        refClose.current.click();
    }

    const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    const ref= useRef(null);
    const refClose= useRef(null);
    return (
        <>
         <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Notes</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="Text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp"  onChange={handleChange}/>
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Desciption</label>
                        <textarea className="form-control" id="edescription" name="edescription" value={note.edescription} rows="5" onChange={handleChange}></textarea>
                        <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="etags" className="form-label">Tags</label>
                        <input type="text" className="form-control" id="etags" name="etags" value={note.etags} onChange={handleChange}/>
                </div>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={Submit} >Save changes</button>
            </div>
          </div>
        </div>
      </div>
            <h2>Your Notes</h2>
            <div className='container row my-3'>
                {notes.map((note) => {
                    return (
                        <Notes note={note} key={note._id} updateNote={updateNote}/>
                    )
                })
                }
            </div>
        </>
    )
}

export default DisplayNotes
