import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./AdminDashboard.css";
import Sidebar from "../../components/sidebar/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <Navbar />
      </div>
    </div>
  );
};

export default AdminDashboard;
