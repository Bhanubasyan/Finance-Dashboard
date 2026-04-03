import React from "react";
import "../style/Navbar.css";

const Navbar = ({ role, setRole }) => {
  return (
    <div className="navbar">

      {/* Left */}
      <div className="nav-left">
        <h2>Finance Dashboard</h2>
        <p>Welcome back 👋</p>
      </div>

      {/* Right */}
      <div className="nav-right">

        {/* Role Dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="role-select"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        {/* Profile */}
        <div className="profile">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
          />
        </div>

      </div>
    </div>
  );
};

export default Navbar;