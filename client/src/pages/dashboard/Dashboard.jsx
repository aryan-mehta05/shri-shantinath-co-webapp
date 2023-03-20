import React from 'react'
import "./Dashboard.css"

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      Dashboard
      <button onClick={handleLogout}>
				Logout
			</button>
    </div>
  )
}

export default Dashboard;