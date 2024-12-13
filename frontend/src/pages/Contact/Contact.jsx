import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faPaperPlane,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function Left() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
    <div className="flex flex-col justify-center p-8 bg-green-100 w-full min-h-[90vh] mx-auto">
      <div className="text-4xl font-extrabold text-gray-800 mb-5">
        Contact AgriConnect
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email address"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-gray-700 font-semibold mb-2"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Type your message here"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 hover:scale-105 transition-transform shadow-md"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

function Right() {
  const contactInfo = [
    {
      icon: faEnvelope,
      title: "Email",
      text: "vishalkbhat@agriconnect.com",
      action: "Email Us",
    },
    {
      icon: faPhone,
      title: "Phone",
      text: "+91 7975806665",
      action: "Call Now",
    },
    {
      icon: faMapMarkerAlt,
      title: "Address",
      text: "Mysuru Road, RVCE, Bengaluru, 560059",
      action: "View on Map",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-around p-8 bg-green-500 w-full min-h-[90vh]">
      <div className="mb-6">
        <div className="flex items-center justify-center w-32 h-32 bg-green-100 rounded-full shadow-lg animate-pulse">
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="text-6xl text-green-600"
          />
        </div>
      </div>
      <div className="w-full max-w-lg">
        <ul className="space-y-4 text-xl text-white">
          {contactInfo.map((contact, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-green-400 transition"
              tabIndex="0"
              role="button"
              aria-label={contact.title}
            >
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={contact.icon} className="text-2xl" />
                <div>
                  <div className="text-base font-semibold">{contact.title}</div>
                  <div className="text-sm">{contact.text}</div>
                </div>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="text-xl" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Contact() {
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
