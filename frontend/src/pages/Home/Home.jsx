import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faLightbulb, faSun, faLeaf, faPaperPlane, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Left() {
  return (
    <div className="flex flex-col justify-center p-8 bg-green-100 w-full h-full mx-auto">
      <div className="text-4xl font-extrabold text-gray-800 mb-4">
        AgriConnect: Empowering Farmers
      </div>
      <div className="mb-6">
        <div className="text-2xl font-semibold text-gray-800 mb-3">
          Farming Made Easier
        </div>
        <div className="flex gap-6">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 hover:scale-105 transition-transform shadow-md"
            aria-label="Get Started"
          >
            Get Started
          </button>
          <button
            className="px-6 py-3 bg-transparent text-green-600 border border-green-600 rounded-md hover:bg-green-50 hover:text-green-700 hover:scale-105 transition-transform shadow-md"
            aria-label="Explore Features"
          >
            Explore Features
          </button>
        </div>
      </div>
      <div className="text-lg text-gray-800 leading-relaxed">
        AgriConnect is here to support farmers with crop sales, modern farming techniques, weather updates, and more. Empowering the agricultural community, one farmer at a time.
      </div>
    </div>
  );
}

function Right() {
  return (
    <div className="flex flex-col items-center justify-around p-8 bg-green-500 w-full h-full">
      <div className="mb-6">
        <img
          src="/pfp.jpg"
          alt="farmer profile"
          className="rounded-full w-32 h-32 object-cover shadow-md border-4 border-white"
        />
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
              className="flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-green-400 transition"
              tabindex="0"
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

export default function Home() {
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