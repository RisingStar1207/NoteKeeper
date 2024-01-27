import React,{useContext} from 'react'
import NotesContext from '../contexts/notes/NotesContext'

function Notes(props) {
    const context= useContext(NotesContext);
    const {deleteNotes} = context;

    const deleteNote=()=>{
        deleteNotes(props.note._id);
    }
    return (
            <div className="card col-4 mx-2 my-2" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">{props.note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={deleteNote} ></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{props.updateNote(props.note)}}></i>
                </div>
            </div>
    )
}

export default Notes
