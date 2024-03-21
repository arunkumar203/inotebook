import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext'; 
import Notes from './Notes';
import CreateNote from './CreateNote';

// import { useContext } from 'react';
function Home(props) {
  // const context=useContext(NoteContext);
  // const {notes,setnotes}=context;
  // const {showAlert}=props;
  
  return (
    <>
    <CreateNote showAlert={props.showAlert}/>
    <Notes showAlert={props.showAlert}/>    

    </>
  );
}

export default Home;
