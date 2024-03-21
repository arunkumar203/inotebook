import logo from './logo.svg';
import './App.css';
import {  BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Navbar from './components/navbar';
import NoteState from './context/notes/NoteState';
import Notes from './components/Notes';
// import CreateNote from './components/CreateNote';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(msg,type)=>{
    setAlert({
      msg:`:${msg}`,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
   <>
   <NoteState>
   <BrowserRouter>
    <Navbar showAlert={showAlert}/>
    <Alert alert={alert}/>
      <div className="container">
    <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert} />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/login" element={<Login  showAlert={showAlert}/>} />
      <Route exact path="/signup" element={<Signup  showAlert={showAlert}/>} />
      {/* <Route exact path ="notes" element={Notes}/> */}
      {/* <Route exact path ="CreateNote" element={<CreateNote/>}/> */}
      
    </Routes>
      </div>
    </BrowserRouter>
   </NoteState>
    
   </>
  );
}

export default App;
