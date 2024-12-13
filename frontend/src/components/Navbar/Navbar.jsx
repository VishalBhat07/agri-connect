import React from "react";
import "./Navbar.css";
import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
          <div className="logo-text">AgriConnect</div>
        </div>
        <div className="tabs">
          <li>Market Place</li>
          <li onClick={() => navigate("/crophealth")}>Crop Health</li>
          <li>Learning Resources</li>
          <li onClick={() => navigate("/schemes")}>Government Schemes</li>
          <li onClick={() => navigate("/about")}>About us</li>
          <li onClick={() => navigate("/contact")}>Contact us</li>
        </div>
        <div className="signin">
          <button>Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
