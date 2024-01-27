import { useState } from "react";
import NotesContext from "./NotesContext";

const NotesState = (props) => {
    const host = `http://localhost:${process.env.REACT_APP_PORT}`;
    //Fetch all notes
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    const allNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "authToken": localStorage.getItem("Token")
            }
        });
        const json = await response.json();
        const Notes = json.notes;
        setNotes(Notes);
    }

    //Add Notes
    const addNotes = async ({title, description, tags}) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "authToken": localStorage.getItem("Token"),
            },
            body: JSON.stringify({title, description, tags})
        });
        const json = await response.json();
        if(!json.error)
        setNotes(notes.concat(json));
    }

    //Delete Notes
    const deleteNotes = async (_id) => {
        const response = await fetch(`${host}/api/notes/deleteNotes/${_id}`, {
            method: "DELETE",
            headers: {
                "authToken": localStorage.getItem("Token"),
            }
        });
        const json = await response.json();
        const freshNotes= notes.filter((note)=>{return note._id!==_id});
        setNotes(freshNotes);
    }

    //Edit Notes
    const editNotes = async (id,title, description, tags) => {
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                "authToken": localStorage.getItem("Token"),
            },
            body: JSON.stringify({title, description, tags})
        });
        const json = await response.json();
        console.log(json);
        let newNotes= JSON.parse(JSON.stringify(notes));
        for(var i=0;i<newNotes.length;i++){
            if(newNotes[i]._id=== id){
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tags = tags;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NotesContext.Provider value={{ notes, allNotes, deleteNotes, addNotes, editNotes}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesState;