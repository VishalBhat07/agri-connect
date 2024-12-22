import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import {
  faUpload,
  faPaperPlane,
  faLeaf,
  faSeedling,
  faCommentDots,
  faLightbulb,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import "./CropHealth.css";

const CropHealth = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const chatLogRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
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

  const analyzeImage = async () => {
    if (!image) {
      alert("No image selected. Please upload an image.");
      return;
    }
    setLoading(true);
    setImageLoading(true);

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
      setLoading(false);
      setImageLoading(false);

      setChatLog((prevLog) => [...prevLog, { user: "Bot", text: result }]);
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input
      }
    } catch (error) {
      console.error("Error analyzing the image:", error);
      alert("There was an error analyzing the image. Please try again.");
      setLoading(false);
      setImageLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/chat",
        { message: message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = response?.data?.response;
      setLoading(false);

      setChatLog((prevLog) => [
        ...prevLog,
        { user: "You", text: message },
        { user: "Bot", text: responseText },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an error with the chatbot. Please try again.");
      setLoading(false);
    }
  };

  const dummyPrompts = [
    "What is the health of my plant?",
    "Can you help me with plant diseases?",
    "How to improve plant growth?",
  ];

  return (
    <div className="w-full flex flex-col bg-gradient-to-br from-green-100 to-green-500">
      {/* Main Content */}
      <main className="min-h-[87vh] w-full px-6 py-6 flex flex-col">
        <div className="w-full max-w-full mx-auto bg-white rounded-xl shadow-xl flex flex-col h-full overflow-hidden">
          {/* Chat Log */}
          <div
            ref={chatLogRef}
            className="min-h-[75vh] flex-grow overflow-y-auto bg-gray-50 border-b border-gray-200 p-4"
          >
            {chatLog.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center pt-20">
                <div className="mb-8 flex items-center justify-center w-32 h-32 bg-green-100 rounded-full shadow-lg">
                  <FontAwesomeIcon
                    icon={faSeedling}
                    className="text-6xl text-green-600 animate-pulse"
                  />
                </div>
  
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    className="mr-3 text-green-600"
                  />
                  Welcome to Plant Health Assistant
                </h2>
  
                <p className="text-lg text-gray-600 mb-6 max-w-md">
                  Got plant questions? I'm here to help! Upload an image or ask
                  about plant health.
                </p>
  
                <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
                  {dummyPrompts.map((prompt, index) => (
                    <div
                      key={index}
                      className="bg-white border border-green-200 rounded-lg p-3 
                       hover:bg-green-50 transition-all duration-300 
                       flex items-center justify-center space-x-2 
                       cursor-pointer group"
                    >
                      <FontAwesomeIcon
                        icon={
                          index === 0
                            ? faLeaf
                            : index === 1
                            ? faLightbulb
                            : faSun
                        }
                        className="text-green-500 group-hover:text-green-700 transition-colors"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-green-800">
                        {prompt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              chatLog.map((entry, index) => (
                <div
                  key={index}
                  className={`flex w-full mb-4 ${
                    entry.user === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-4 rounded-lg shadow-sm
                      ${
                        entry.user === "You"
                          ? "chat-message-right bg-green-100 text-green-900 self-end"
                          : "chat-message-left bg-gray-200 text-gray-900 self-start min-w-[50%]"
                      }`}
                  >
                    <div className="flex items-center mb-2">
                      <FontAwesomeIcon
                        icon={entry.user === "You" ? faSeedling : faLeaf}
                        className={`mr-2 ${
                          entry.user === "You"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      />
                      <strong className="font-semibold">{entry.user}</strong>
                    </div>
                    {/* Here we render markdown */}
                    <ReactMarkdown>{entry.text}</ReactMarkdown>
                  </div>
                </div>
              ))
            )}
  
            {loading && (
              <div className="flex justify-center items-center mt-4">
                <ClipLoader size={40} color="#10B981" loading={loading} />
              </div>
            )}
          </div>
  
          {/* Input Section */}
          <div className="flex items-center gap-3 p-4 bg-white border-t border-gray-200">
            <label
              htmlFor="image-upload"
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition"
            >
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              {image ? image.name : "Upload Image"}
              <input
                ref={fileInputRef}
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
              className="flex-grow px-3 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={analyzeImage}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
              disabled={!image || imageLoading}
            >
              Analyze
            </button>
            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CropHealth;
