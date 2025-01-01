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
  const port = 5714;
  const backendImageURL = "https://agri-ai-connect-backend.onrender.com/api/analyze-image";
  const backendChatURL = "https://agri-ai-connect-backend.onrender.com/api/chat";
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
        `${backendImageURL}`,
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
        fileInputRef.current.value = "";
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
        `${backendChatURL}`,
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
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-green-100 to-green-500">
      <main className="h-full w-full flex flex-col">
        <div className="h-full w-full bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
          <div
            ref={chatLogRef}
            className="h-[85vh] overflow-y-auto bg-gray-50 border-b border-gray-200 p-2 sm:p-4"
          >
            {chatLog.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="mb-6 flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-green-100 rounded-full shadow-lg">
                  <FontAwesomeIcon
                    icon={faSeedling}
                    className="text-4xl sm:text-6xl text-green-600 animate-pulse"
                  />
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    className="mr-2 sm:mr-3 text-green-600"
                  />
                  Welcome to Plant Health Assistant
                </h2>

                <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md px-4">
                  Got plant questions? I'm here to help! Upload an image or ask
                  about plant health.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto w-full px-4">
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
              <div className="space-y-4">
                {chatLog.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex w-full ${
                      entry.user === "You" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 sm:p-4 rounded-lg shadow-sm max-w-[85%] sm:max-w-[75%] break-words
                        ${
                          entry.user === "You"
                            ? "chat-message-right bg-green-100 text-green-900"
                            : "chat-message-left bg-gray-200 text-gray-900"
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
                        <strong className="font-semibold text-sm sm:text-base">
                          {entry.user}
                        </strong>
                      </div>
                      <div className="text-sm sm:text-base">
                        <ReactMarkdown>{entry.text}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-center items-center mt-4">
                <ClipLoader size={40} color="#10B981" loading={loading} />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-white border-t border-gray-200">
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition"
            >
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              <span className="truncate max-w-[150px]">
                {image ? image.name : "Upload Image"}
              </span>
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            <div className="flex-1 flex gap-2">
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
                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50 whitespace-nowrap"
                disabled={!image || imageLoading}
              >
                Analyze
              </button>
              <button
                onClick={sendMessage}
                className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center whitespace-nowrap"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CropHealth;