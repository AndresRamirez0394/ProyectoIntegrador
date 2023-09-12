import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from './paginas/login';
import { Signup } from './paginas/signup';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element = {<Login />} />
        <Route path="/signup" element = {<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;