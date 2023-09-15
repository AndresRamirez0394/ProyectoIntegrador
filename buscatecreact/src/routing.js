import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import Signup from './paginas/signup';
import Login from './paginas/login';
import Feed from './paginas/Feed/feed';
import OffcanvasExample from './components/navbar/navbar';

function Main(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/navbar' element={<OffcanvasExample />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;