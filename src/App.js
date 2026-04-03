import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Router>
      <div className={darkMode ? "dark" : "light"} style={{ display: "flex" }}>

        {/* Sidebar */}
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Right Side */}
        <div style={{ flex: 1 }}>

          {/* Navbar */}
          <Navbar role={role} setRole={setRole} />

          {/* Pages */}
          <div style={{ padding: "20px" }}>
            <Routes>
{/*profile*/}
              <Route path="/profile" element = {<Profile />} />
{/*Dashboard*/}
              <Route path="/" element={<Dashboard />} />
              {/*Transaction*/}
              <Route path="/transactions" element={<Transactions />} />

              {/*Insights*/}
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;