import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './layouts/login';
import Inicio from './layouts/inicio';
import Main from './layouts/main';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/main" element={<Main/>} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </Router>
  );
}

export default App;
