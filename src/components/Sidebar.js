import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/image.png";
import "../style/Sidebar.css";

// Icons
import { FaHome, FaExchangeAlt, FaChartPie, FaUser } from "react-icons/fa";

const Sidebar = ({ darkMode, setDarkMode }) => {
  const location = useLocation();

  return (
    <div className="sidebar">

      {/* 🔥 Top Section */}
      <div className="sidebar-top">
        <h2 className="logo">💰 Finance</h2>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>

      {/* 🔥 Menu */}
      <ul>
        <li className={location.pathname === "/profile" ? "active" : ""}>
          <Link to="/profile">
            <FaUser className="icon" />
            Profile
          </Link>
        </li>

        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">
            <FaHome className="icon" />
            Dashboard
          </Link>
        </li>

        <li className={location.pathname === "/transactions" ? "active" : ""}>
          <Link to="/transactions">
            <FaExchangeAlt className="icon" />
            Transactions
          </Link>
        </li>

        <li className={location.pathname === "/insights" ? "active" : ""}>
          <Link to="/insights">
            <FaChartPie className="icon" />
            Insights
          </Link>
        </li>
      </ul>

      {/* ✅ Bottom Company Section */}
      <div className="sidebar-footer">
        <img src={logo} alt="company" className="company-logo" />
        <p className="company-name">zorvyn fintech</p>
      </div>

    </div>
  );
};

export default Sidebar;