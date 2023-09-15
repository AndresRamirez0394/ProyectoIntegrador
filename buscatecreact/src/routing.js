import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import Signup from './paginas/signup';
import Login from './paginas/login';
import Feed from './paginas/Feed/feed';

function Main(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/feed' element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;