import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../assets/shri.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../data/Data.js";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
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
          <img src={Logo} alt="logo" />
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => setSelected(index)}
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
