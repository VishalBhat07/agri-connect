import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import {
  faUpload,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";

const CropHealth = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

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
    <div className="h-screen flex items-center justify-center bg-gray-500">
      <div className="max-w-2xl w-full p-6 bg-white text-gray-800 shadow-2xl rounded-xl">
        <div className="flex items-center justify-center mb-6">
          <FontAwesomeIcon
            icon={faComment}
            className="text-teal-500 mr-3"
            size="2x"
          />
          <h1 className="text-3xl font-bold text-teal-600">
            Plant Health Assistant
          </h1>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <label
              htmlFor="image-upload"
              className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md cursor-pointer hover:bg-teal-400 transition"
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
            <button
              onClick={analyzeImage}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 transition disabled:opacity-50"
              disabled={!image || imageLoading}
            >
              {imageLoading ? "Processing Image..." : "Analyze Image"}
            </button>
          </div>

          <div className="chat-log h-64 overflow-y-auto border border-gray-300 rounded-md p-3 bg-gray-50">
            {chatLog.map((entry, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  entry.user === "You"
                    ? "bg-blue-100 text-blue-800"
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
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask something about plant health..."
            className="flex-grow px-3 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={sendMessage}
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-400 transition flex items-center"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropHealth;
