import React from "react";
import Cards from "../cards/Cards";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
    </div>
  );
}
