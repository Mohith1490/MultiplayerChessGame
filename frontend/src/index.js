import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import Login from './Loginpage/Login.jsx';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
       <Routes>
        <Route element={<App/>} path='/game' />
        <Route element={<Login/>} path='/' />
       </Routes>
    </BrowserRouter>
  </>
);