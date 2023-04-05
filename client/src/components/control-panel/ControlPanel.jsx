import React from "react";
import Cards from "../cards/Cards";
import "./ControlPanel.css";

const ControlPanel = () => {
  return (
    <div className="MainDash">
      <h1 className="dashboard-title">Dashboard</h1>
      <Cards />
    </div>
  );
}

export default ControlPanel;
