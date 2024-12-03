import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login'; 
import Home from './Home';
import ContactUs from './contactus';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SwipeCard from './card';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/card' element={<SwipeCard />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
