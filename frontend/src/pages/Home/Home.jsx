import React, { useEffect } from "react";
import AOS from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faLightbulb,
  faSun,
  faLeaf,
  faPaperPlane,
  faArrowRight,
  faTractor,
  faHandHoldingHeart,
  faUsers,
  faChartLine,
  faCloud,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

const Left = () => (
  <div className="flex flex-col justify-center p-8 bg-gradient-to-br from-green-50 to-green-100 w-full min-h-[90vh] mx-auto">
    <div
      data-aos="fade-right"
      data-aos-duration="1200"
      data-aos-easing="ease-out-back"
      className="text-4xl font-extrabold text-gray-800 mb-5 animate-text-shadow"
    >
      AgriConnect: Empowering Farmers
    </div>
    <div
      data-aos="fade-up"
      data-aos-delay="300"
      data-aos-duration="1000"
      className="animate-slide-up"
    >
      <div className="text-2xl font-semibold text-gray-800 mb-4">
        Farming Made Easier
      </div>
      <div className="flex gap-6">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse-subtle"
          aria-label="Get Started"
        >
          Get Started
        </button>
        <button
          className="px-6 py-3 bg-transparent text-green-600 border-2 border-green-600 rounded-md hover:bg-green-50 hover:text-green-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          aria-label="Explore Features"
        >
          Explore Features
        </button>
      </div>
    </div>
    <div
      data-aos="fade-up"
      data-aos-delay="600"
      data-aos-duration="1000"
      className="text-lg text-gray-800 leading-relaxed mt-6 animate-fade-in"
    >
      AgriConnect is here to support farmers with crop sales, modern farming
      techniques, weather updates, and more. Empowering the agricultural
      community, one farmer at a time.
    </div>
  </div>
);

const Right = () => (
  <div className="flex flex-col items-center justify-around p-8 bg-gradient-to-br from-green-500 to-green-600 w-full min-h-[90vh]">
    <div
      data-aos="zoom-in"
      data-aos-duration="1200"
      className="mb-6 animate-float"
    >
      <div className="flex items-center justify-center w-32 h-32 bg-green-100 rounded-full shadow-2xl hover:shadow-3xl transition-shadow duration-300">
        <FontAwesomeIcon
          icon={faSeedling}
          className="text-6xl text-green-600 transform hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>
    <div className="w-full max-w-lg">
      <ul className="space-y-4 text-xl text-white">
        {[
          { icon: faSeedling, text: "Buy and sell crops easily" },
          { icon: faLightbulb, text: "Learn modern farming techniques" },
          { icon: faSun, text: "Access real-time weather updates" },
          { icon: faLeaf, text: "Analyze crop price trends" },
          { icon: faPaperPlane, text: "Get notified about government schemes" },
        ].map((feature, index) => (
          <li
            key={index}
            data-aos="fade-left"
            data-aos-delay={index * 150}
            data-aos-duration="800"
            className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-green-400/20 backdrop-blur-sm hover:bg-green-400/30 transition-all duration-300 transform hover:translate-x-2"
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

const Stats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-16 bg-white">
    {[
      { icon: faTractor, value: "10,000+", label: "Active Farmers" },
      {
        icon: faHandHoldingHeart,
        value: "50,000+",
        label: "Successful Trades",
      },
      { icon: faUsers, value: "100+", label: "Expert Consultants" },
    ].map((stat, index) => (
      <div
        key={index}
        data-aos="flip-up"
        data-aos-delay={index * 200}
        data-aos-duration="1000"
        className="flex flex-col items-center p-8 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
      >
        <FontAwesomeIcon
          icon={stat.icon}
          className="text-5xl text-green-600 mb-4 animate-bounce-slow"
        />
        <div className="text-3xl font-bold text-gray-800 mb-2 animate-number">
          {stat.value}
        </div>
        <div className="text-lg text-gray-600">{stat.label}</div>
      </div>
    ))}
  </div>
);

const Features = () => (
  <div className="py-16 bg-gradient-to-b from-green-50 to-white">
    <h2
      data-aos="fade-down"
      data-aos-duration="1000"
      className="text-4xl font-bold text-center text-gray-800 mb-12 animate-text-shadow"
    >
      Why Choose AgriConnect?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
      {[
        {
          icon: faChartLine,
          title: "Market Insights",
          description:
            "Real-time crop price analytics and market trends to help you make informed decisions.",
        },
        {
          icon: faCloud,
          title: "Weather Forecasts",
          description:
            "Accurate weather predictions and agricultural advisories for better crop planning.",
        },
        {
          icon: faNewspaper,
          title: "Latest Updates",
          description:
            "Stay informed about agricultural policies and government schemes.",
        },
      ].map((feature, index) => (
        <div
          key={index}
          data-aos="zoom-in-up"
          data-aos-delay={index * 200}
          data-aos-duration="1000"
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group"
        >
          <FontAwesomeIcon
            icon={feature.icon}
            className="text-4xl text-green-600 mb-4 transform group-hover:scale-110 transition-transform duration-300"
          />
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const CallToAction = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center overflow-hidden relative">
    <div className="absolute inset-0 bg-pattern opacity-10"></div>
    <div
      data-aos="zoom-in"
      data-aos-duration="1200"
      className="text-center text-white p-8 relative animate-float"
    >
      <h2 className="text-5xl font-bold mb-6 animate-text-glow">
        Join Our Growing Community
      </h2>
      <p className="text-xl mb-8 animate-fade-in">
        Connect with farmers, experts, and agriculture enthusiasts
      </p>
      <button className="px-8 py-4 bg-white text-green-600 rounded-lg text-xl font-semibold hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl animate-pulse-subtle">
        Join Now
      </button>
    </div>
  </div>
);

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: "ease-out-cubic",
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div className="min-h-[90vh] flex flex-col md:flex-row w-full mx-auto">
        <div className="w-full md:w-1/2">
          <Left />
        </div>
        <div className="w-full md:w-1/2">
          <Right />
        </div>
      </div>

      <Stats />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Home;
