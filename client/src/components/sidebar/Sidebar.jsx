import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../assets/shri.png";
import { useNavigate } from "react-router";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../data/Data.js";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    // localStorage.removeItem("cardIndex");
    window.location.href = "/";
  };
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  // console.log(window.innerWidth);
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <img className="logo-image" src={Logo} alt="logo" />
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => {
                  setSelected(index);
                  navigate("/" + item.slug);
                }}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem" onClick={handleLogout}>
            <UilSignOutAlt />
            <span>LogOut</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
