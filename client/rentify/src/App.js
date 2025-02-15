import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Register_Login from './pages/Register_Login';
import Home from './pages/Home';
import Seller from './pages/Seller';
import Seller_Home from './pages/Seller_Home';
import './index.css';
import updateForm from './pages/updateForm';
import update_Seller from './pages/update_Seller';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="" element={<Register_Login/>} />
          <Route path="/buyer-home" element={<Home/>} />
          <Route path="/add" element={<Seller/>} />
          <Route path="/seller-home" element={<Seller_Home/>} />
          <Route path="/seller-update/:id" element={<updateForm/>} />
        </Routes>
    </Router>
  );
}

export default App;
