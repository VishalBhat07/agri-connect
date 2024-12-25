import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faGlobe,
  faUsers,
  faHandHoldingHeart,
  faBook,
  faArrowRight,
  faMedal,
  faChartLine,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import "./About.css";

const Left = () => {
  return (
    <div className="flex flex-col justify-center p-8 bg-gradient-to-br from-green-50 to-green-100 w-full min-h-[90vh] mx-auto">
      <div
        data-aos="fade-right"
        data-aos-duration="1200"
        className="text-4xl font-extrabold text-gray-800 mb-5 animate-text-shadow"
      >
        About AgriConnect
      </div>

      <div data-aos="fade-up" data-aos-delay="200" className="mb-8">
        <div className="text-2xl font-semibold text-gray-800 mb-4">
          Our Mission and Vision
        </div>
        <div className="text-lg text-gray-800 leading-relaxed space-y-4">
          <p className="animate-slide-up">
            At AgriConnect, we believe in transforming agriculture through
            technology and community support. Our mission is to empower farmers
            by providing innovative solutions that bridge information gaps and
            enhance agricultural productivity.
          </p>
          <p className="animate-slide-up delay-200">
            We are committed to creating a sustainable ecosystem that supports
            farmers at every step of their journey, from crop planning to market
            access.
          </p>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {[
          { icon: faMedal, title: "Excellence", value: "5+ Years" },
          { icon: faUsers, title: "Farmers Helped", value: "10,000+" },
          { icon: faChartLine, title: "Growth", value: "300%" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <FontAwesomeIcon
              icon={stat.icon}
              className="text-3xl text-green-600 mb-2 animate-bounce-slow"
            />
            <div className="font-semibold text-gray-800">{stat.title}</div>
            <div className="text-green-600 font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-6 mt-6" data-aos="fade-up" data-aos-delay="600">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse-subtle"
          aria-label="Our Team"
        >
          Meet Our Team
        </button>
        <button
          className="px-6 py-3 bg-transparent text-green-600 border-2 border-green-600 rounded-md hover:bg-green-50 hover:text-green-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          aria-label="Contact Us"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

const Right = () => {
  return (
    <div className="flex flex-col items-center justify-around p-8 bg-gradient-to-br from-green-500 to-green-600 w-full min-h-[90vh]">
      <div
        data-aos="zoom-in"
        data-aos-duration="1200"
        className="mb-6 animate-float"
      >
        <div className="flex items-center justify-center w-32 h-32 bg-green-100 rounded-full shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          <FontAwesomeIcon
            icon={faHandHoldingHeart}
            className="text-6xl text-green-600 transform hover:scale-110 transition-transform duration-300"
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
            { icon: faLeaf, text: "Empowering Farmers Worldwide" },
          ].map((feature, index) => (
            <li
              key={index}
              data-aos="fade-left"
              data-aos-delay={index * 150}
              className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-green-400/20 backdrop-blur-sm hover:bg-green-400/30 transition-all duration-300 transform hover:translate-x-2 group"
              tabIndex="0"
              role="button"
              aria-label={feature.text}
            >
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={feature.icon}
                  className="text-2xl animate-spin-slow"
                />
                <span className="font-medium">{feature.text}</span>
              </div>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-xl transform group-hover:translate-x-1 transition-transform duration-300"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="min-h-[85vh] flex flex-col md:flex-row w-full mx-auto overflow-hidden">
      <div className="w-full md:w-1/2">
        <Left />
      </div>
      <div className="w-full md:w-1/2">
        <Right />
      </div>
    </div>
  );
};

export default About;
