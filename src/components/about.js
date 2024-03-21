// import React, { useContext } from 'react'
// import Navbar from './navbar'
// import noteContext from '../context/notes/noteContext'

// const  about =()=> {
//   const a=useContext(noteContext)
//   return (
//     <>
//     <div>this is about page</div>
//     <div>this is  {a.name}</div>
//     </>
    
//   )
// }

// export default about



import React, { useContext } from 'react'; // Import React and useContext hook
import Navbar from './navbar';
import NoteContext from '../context/notes/NoteContext'; // Import NoteContext (adjust the path if necessary)

const About = () => { // Rename the function to start with uppercase
  const a = useContext(NoteContext); // Use useContext hook to access context data

  return (
    <>
      <div>This is the about page</div>
      <div>This is {a.name}</div> {/* Access context data */}
    </>
  );
}

export default About; // Export the component properly with uppercase name
