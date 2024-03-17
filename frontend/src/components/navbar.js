import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <header>
      <div className="container header-container">
        <div className="navbar-content">
          <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-button">
              Menu
            </button>
            {isOpen && (
              <div className="dropdown-content">
                <Link to="" className="dropdown-item">
                  Home
                </Link>
                <Link to="/analytics" className="dropdown-item">
                  Analytics
                </Link>
                <Link to="/settings" className="dropdown-item">
                  Settings
                </Link>
              </div>
            )}
          </div>
          <Link to="/" className="header-link">
            <h1>Task Manager</h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
