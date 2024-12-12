import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import {
  faUpload,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import "./CropHealth.css"

const CropHealth = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const chatLogRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat log whenever it updates
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      alert("Only image files (JPEG, PNG, GIF) are allowed.");
      return;
    }

    const maxFileSize = 5 * 1024 * 1024;
    if (file.size > maxFileSize) {
      alert("File size exceeds the 5MB limit.");
      return;
    }

    setImage(file);
  };

  // Function to analyze image using the backend API
  const analyzeImage = async () => {
    if (!image) {
      alert("No image selected. Please upload an image.");
      return;
    }
    setLoading(true);
    setImageLoading(true); // Start image loading state

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/analyze-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = response?.data?.caption;
      console.log(result);
      setLoading(false);
      setImageLoading(false); // Stop image loading state

      setChatLog((prevLog) => [...prevLog, { user: "Bot", text: result }]);
      setImage(null); // Reset the image after processing
    } catch (error) {
      console.error("Error analyzing the image:", error);
      alert("There was an error analyzing the image. Please try again.");
      setLoading(false);
      setImageLoading(false);
    }
  };

  // Function to send text message to the chatbot API
  const sendMessage = async () => {
    if (!message) {
      alert("Please enter a message.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/chat",
        { message: message }, // Send the message as part of the request body
        {
          headers: {
            "Content-Type": "application/json", // Make sure this is application/json
          },
        }
      );

      const responseText = response?.data?.response;
      console.log(responseText);

      setLoading(false);

      setChatLog((prevLog) => [
        ...prevLog,
        { user: "You", text: message },
        { user: "Bot", text: responseText },
      ]);
      setMessage(""); // Clear the message input after sending
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an error with the chatbot. Please try again.");
      setLoading(false);
    }
  };

  return (
  <div className="h-screen flex flex-col bg-gray-200">
    {/* Header */}
    <div className="w-full bg-[#4caf50] p-4 shadow-lg text-center text-white text-3xl font-bold">
      <FontAwesomeIcon icon={faComment} className="mr-2" />
      Plant Health Assistant
    </div>

    {/* Content */}
    <div className="flex-grow">
      {/* Chat and Upload Section */}
      <div className="flex flex-col flex-grow bg-white shadow-md rounded-lg p-4">
        {/* Chat Log */}
        <div ref={chatLogRef} className="h-[80vh] overflow-y-auto border border-gray-300 rounded-md mb-4 p-3 bg-gray-50">
          {chatLog.map((entry, index) => (
            <div
              key={index}
              className={`chat-message mb-2 p-2 rounded-lg ${
                entry.user === "You"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <strong className="block mb-1">{entry.user}:</strong>
              <ReactMarkdown>{entry.text}</ReactMarkdown>
            </div>
          ))}
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <ClipLoader size={40} color="#00BFAE" loading={loading} />
            </div>
          )}
        </div>

        {/* Input and Upload */}
        <div className="flex items-center space-x-2">
          <label
            htmlFor="image-upload"
            className="flex items-center px-4 py-2 bg-black text-white rounded-md cursor-pointer hover:bg-green-600 transition"
          >
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            {image ? image.name : "Upload Image"}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask something about plant health..."
            className="flex-grow px-3 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={analyzeImage}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-green-600 transition disabled:opacity-50"
            disabled={!image || imageLoading}
          >
            Analyze
          </button>
          <button
            onClick={sendMessage}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Send
          </button>
        </div>
      </div>
    </div>
  </div>
);

};

export default CropHealth;
