import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faGlobe,
  faUsers,
  faHandHoldingHeart,
  faBook,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function Left() {
  return (
    <div className="flex flex-col justify-center p-8 bg-green-100 w-full min-h-[90vh] mx-auto">
      <div className="text-4xl font-extrabold text-gray-800 mb-5">
        About AgriConnect
      </div>
      <div className="mb-6">
        <div className="text-2xl font-semibold text-gray-800 mb-4">
          Our Mission and Vision
        </div>
        <div className="text-lg text-gray-800 leading-relaxed space-y-4">
          <p>
            At AgriConnect, we believe in transforming agriculture through 
            technology and community support. Our mission is to empower farmers 
            by providing innovative solutions that bridge information gaps and 
            enhance agricultural productivity.
          </p>
          <p>
            We are committed to creating a sustainable ecosystem that supports 
            farmers at every step of their journey, from crop planning to market access.
          </p>
        </div>
      </div>
      <div className="flex gap-6 mt-6">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 hover:scale-105 transition-transform shadow-md"
          aria-label="Our Team"
        >
          Meet Our Team
        </button>
        <button
          className="px-6 py-3 bg-transparent text-green-600 border border-green-600 rounded-md hover:bg-green-50 hover:text-green-700 hover:scale-105 transition-transform shadow-md"
          aria-label="Contact Us"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}

function Right() {
  return (
    <div className="flex flex-col items-center justify-around p-8 bg-green-500 w-full min-h-[90vh]">
      <div className="mb-6">
        <div className="flex items-center justify-center w-32 h-32 bg-green-100 rounded-full shadow-lg animate-pulse">
          <FontAwesomeIcon
            icon={faHandHoldingHeart}
            className="text-6xl text-green-600"
          />
        </div>
      </div>
      <div className="w-full max-w-lg">
        <ul className="space-y-4 text-xl text-white">
          {[
            { icon: faGlobe, text: "Global Agricultural Innovation" },
            { icon: faUsers, text: "Community-Driven Approach" },
            { icon: faSeedling, text: "Sustainable Farming Practices" },
            { icon: faBook, text: "Continuous Learning Platform" },
            {
              icon: faHandHoldingHeart,
              text: "Empowering Farmers Worldwide",
            },
          ].map((feature, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-green-400 transition"
              tabIndex="0"
              role="button"
              aria-label={feature.text}
            >
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={feature.icon} className="text-2xl" />
                <span>{feature.text}</span>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="text-xl" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-[85vh] flex flex-col md:flex-row w-full mx-auto">
      <div className="w-full md:w-1/2">
        <Left />
      </div>
      <div className="w-full md:w-1/2">
        <Right />
      </div>
    </div>
  );
}