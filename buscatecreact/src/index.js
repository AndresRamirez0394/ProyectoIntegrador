import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./paginas/login";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/App" element={<App />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer></ToastContainer>
  </React.StrictMode>
);
