import React, { useContext, useState } from 'react'
import NotesContext from '../contexts/notes/NotesContext'

function Form() {
    const context= useContext(NotesContext);
    const {addNotes} = context;
    const [note,setNote] = useState({title:"",description:"",tags:""});
    const Submit=(e)=>{
        e.preventDefault();
        addNotes(note);
    }
    const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="Text" className="form-control" id="title" name="title" aria-describedby="emailHelp"  onChange={handleChange}/>
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Desciption</label>
                        <textarea className="form-control" id="description" name="description" rows="5" onChange={handleChange}></textarea>
                        <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tags</label>
                        <input type="text" className="form-control" id="tags" name="tags" onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={Submit}>Submit</button>
            </form>
        </div>
    )
}

export default Form
