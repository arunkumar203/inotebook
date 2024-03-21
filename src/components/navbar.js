import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar(props) {
  const location = useLocation();
  const history = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = location.pathname;
  
    if (!token && currentPath !== '/login' && currentPath !== '/signup') {
      history('/login');
    }
  
    setIsLoggedIn(token);

    // Fetch user's name if logged in
    if (token) {
      fetchUserData();
    }
  }, [location.pathname]);

  // Function to fetch user's data
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUserName(data.name); // Set user's name if response is successful
        
      } else {
        console.error('Error fetching user data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.showAlert('logged out successfully', 'success');
    setIsLoggedIn(false);
    setUserName(''); // Clear user name on logout
    history('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar navbar-dark bg-dark">
      <Link className="navbar-brand px-3" to="/">inotebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav d-flex">
          <li className="nav-item active pl-3">
            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to="/">Home</Link>
          </li>
          <li className="nav-item pl-2">
            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
          </li>
          <li className="nav-item pl-2">
            <Link className={`nav-link ${location.pathname === '/CreateNote' ? "active" : ""}`} to="/CreateNote">Create note</Link>
          </li>
        </ul>
        {isLoggedIn ? (
          <form className='d-flex flex-row-reverse'>
            <span className='navbar-text mx-2'>{userName}</span> {/* Display user's name */}
            <button className='btn btn-primary mx-2' onClick={handleLogout}>Logout</button>
          </form>
        ) : (
          <form className='d-flex flex-row-reverse'>
            <Link className='btn btn-primary mx-2' to='/login' role='button'>Login</Link>
            <Link className='btn btn-primary mx-2' to='/signup' role='button'>Sign up</Link>
          </form>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
