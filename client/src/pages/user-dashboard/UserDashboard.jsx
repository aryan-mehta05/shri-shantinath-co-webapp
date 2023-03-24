import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./UserDashboard.css";

const UserDashboard = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <Navbar />
      </div>
    </div>
  );
};

export default UserDashboard;
