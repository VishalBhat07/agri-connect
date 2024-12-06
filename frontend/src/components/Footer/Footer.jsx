import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Agri Connect</h4>
          <p>
            Agri Connect is dedicated to connecting farmers, learners, and
            stakeholders in agriculture. Explore resources, marketplaces, and
            schemes to empower your journey.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Market Place</li>
            <li>Learning Resources</li>
            <li>Government Schemes</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: vishalkbhat@agriconnect.com</p>
          <p>Phone: +91 7975806665</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Agri Connect | All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
