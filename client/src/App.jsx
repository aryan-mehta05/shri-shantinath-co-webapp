import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard";
import UserDashboard from "./pages/user-dashboard/UserDashboard";
import ManageProducts from "./pages/manage-products/ManageProducts";
import CategoryProducts from "./pages/manage-products/CategoryProducts";
import UpdateProduct from "./pages/manage-products/UpdateProduct";

function App() {
  const user = localStorage.getItem("token");
  const isAdmin = () => {
    const val = localStorage.getItem("isAdmin");
    if (val === "true" || val === true) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Routes>
      {user && isAdmin() && (
        <Route path="/" exact element={<AdminDashboard />} />
      )}
      {user && !isAdmin() && (
        <Route path="/" exact element={<UserDashboard />} />
      )}
      {user && <Route path="/manage-products" element={<ManageProducts />} />}
      <Route path="/login" exact element={<Login />} />
      <Route path="/category/:slug" element={<CategoryProducts />} />
      <Route path="/product/:slug" element={<UpdateProduct />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
