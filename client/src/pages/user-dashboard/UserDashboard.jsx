import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ControlPanel from "../../components/control-panel/ControlPanel";
import "./UserDashboard.css";

const UserDashboard = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <ControlPanel />
      </div>
    </div>
  );
};

export default UserDashboard;
