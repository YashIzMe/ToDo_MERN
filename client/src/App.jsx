import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import './App.css';
import Auth from './components/Auth/Auth';
import ResetPassword from "./components/Auth/ResetPassword";
import Header from "./components/ToDo/Header";
import Todo from "./components/ToDo/Todo";
import AdminPanel from "./components/AdminPanel/AdminPanel"
import DataProvider from './context/DataProvider';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? 
    <>
      <Outlet />
    </> : <Navigate replace to='/' />
};

const AdminRoute = ({ isAdmin, ...props }) => {
  return isAdmin ? 
    <>
      
      <Outlet />
    </> : <Navigate replace to='/' />
};


function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  const [isAdmin, isUserAdmin] = useState(false)
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path='/' element={<Auth isUserAuthenticated={isUserAuthenticated} isUserAdmin={isUserAdmin} />} />
          <Route path="/" element={<Auth />} />
          <Route exact path="/reset" element={<ResetPassword />} />

          <Route path='/home' element={<PrivateRoute isAuthenticated={isAuthenticated} /> }>
            <Route exact path="/home" element={<Todo />} />
          </Route>
          
          <Route path='/adminPanel' element={<AdminRoute isAdmin={isAdmin} /> }>
            <Route exact path="/adminPanel" element={<AdminPanel />} />
          </Route>
          
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
