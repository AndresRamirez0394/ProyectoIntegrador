import React from 'react';
import { Link } from 'react-router-dom'
import './App.css'

function App(){
  return (
    <div className='landing-page'>
      <h1>buscaTEC</h1>
      <img src="TECNEXUS.jpeg" alt="App Logo" />

      <div className='buttons-container'>
        <Link to="/signup" className='btn btn-primary'>
          Sign Up
        </Link>
        <Link to="/login" className='btn btn-secondary'>
          Login
        </Link>
      </div>
    </div>
  );
}

export default App;