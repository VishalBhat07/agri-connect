import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLeaf,
  faStore,
  faBook,
  faLandmark,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div
          className="footer-section main-section"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <div className="brand-container">
            <FontAwesomeIcon icon={faLeaf} className="brand-icon" />
            <h4 className="brand-text">Agri Connect</h4>
          </div>
          <p className="description">
            Agri Connect is dedicated to connecting farmers, learners, and
            stakeholders in agriculture. Explore resources, marketplaces, and
            schemes to empower your journey.
          </p>
        </div>

        <div
          className="footer-section links-section"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <h4 className="section-title">Quick Links</h4>
          <ul className="quick-links">
            <li>
              <FontAwesomeIcon icon={faStore} className="link-icon" />
              <Link to="/marketplace">Market Place</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faBook} className="link-icon" />
              <Link to="/learn">Learning Resources</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faLandmark} className="link-icon" />
              <Link to="/schemes">Government Schemes</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faAddressBook} className="link-icon" />
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div
          className="footer-section contact-section"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <h4 className="section-title">Contact</h4>
          <div className="contact-info">
            <p className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <a href="mailto:vishalkbhat@agriconnect.com">
                vishalkbhat@agriconnect.com
              </a>
            </p>
            <p className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <a href="mailto:vssreenivaas@agriconnect.com">
                vssreenivaas@agriconnect.com
              </a>
            </p>
            <p className="contact-item">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              <span>+91 7975806665</span>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Agri Connect | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;