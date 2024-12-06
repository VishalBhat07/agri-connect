import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <strong>Agri Connect</strong>
        </div>
        <div className="tabs">
          <li>Market Place</li>
          <li>Learning Resources</li>
          <li>Learning Resources</li>
          <li>Government Schemes</li>
          <li>About us</li>
          <li>Contact</li>
        </div>
        <div className="signin">
          <button>Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
