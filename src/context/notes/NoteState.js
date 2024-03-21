import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  

  const [notes, setNotes] = useState([]);
  // const getnotes=async()=>{
  //   const response = await fetch(`${host}/api/notes/fetchNotes`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // 'auth-token': localStorage.getItem('token')
  //       'auth-token': localStorage.getItem('token')
  //     },
  //   });
  //   const json = await response.json();
  //   console.log("Retrieved notes:", json); 
  //   setNotes(json.notes); 
  // }
  const getnotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchNotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
  
      const json = await response.json();
      console.log("Retrieved notes:", json); 
      setNotes(json.notes); 
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }
  
 
  const addNote = async (title, description, tag) => {
    try {
        // API integration
        const response = await fetch("http://localhost:5000/api/notes/addNote", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({id:localStorage.getItem('token'),title, description, tag})
        });

        if (!response.ok) {
            throw new Error('Failed to add note');
        }

        const note = await response.json(); 
        console.log(note);
        setNotes([...notes, note]);
    } catch (error) {
        console.error('Error adding note:', error);
    }
};


 
  
  const updateNote = async (id,title,description,tag) => {
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': localStorage.getItem('token')
        'auth-token':localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    let newnotes=JSON.parse(JSON.stringify(notes));

    for(let index = 0; index < newnotes.length; index++) {
      if(newnotes[index]._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setNotes(newnotes);
  };

  const deleteNote = (id) => {
    const response = fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': localStorage.getItem('token')
        'auth-token':localStorage.getItem('token'),
      },
    });
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, updateNote, deleteNote,getnotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
