import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import Signup from './paginas/signup';
import Login from './paginas/login';

function Main(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;