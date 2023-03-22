import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import AdminDashboard from './pages/admin-dashboard/AdminDashboard';
import UserDashboard from './pages/user-dashboard/UserDashboard';

function App() {
  const user = localStorage.getItem('token');
  const isAdmin = () => {
    const val = localStorage.getItem('isAdmin');
    if (val === 'true' || val === true) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {user && isAdmin() && <Route path="/" exact element={<AdminDashboard />} />}
        {user && (!isAdmin()) && <Route path="/" exact element={<UserDashboard />} />}
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;