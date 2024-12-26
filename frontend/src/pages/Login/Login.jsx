import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../../../firebaseFunctions/firebaseConfig"; // Import Firestore
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import { useNavigate } from "react-router-dom"; // Import the navigate hook

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [category, setCategory] = useState(""); // Track category selection
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password || (isSignUp && !category)) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      if (isSignUp) {
        // Sign up with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Save user details in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          category: category,
          createdAt: new Date(),
        });

        toast.success("Sign-up successful!", {
          onClose: () => navigate("/profile"), // Navigate after the toast disappears
        });
      } else {
        // Login with Firebase Authentication
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful!", {
          onClose: () => navigate("/profile"), // Navigate after the toast disappears
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-green-100">
        <div className="text-4xl font-extrabold text-gray-800 mb-5">
          Welcome Back to AgriConnect
        </div>
        <div className="text-lg text-gray-700 leading-relaxed mb-6">
          Empowering farmers with tools and resources to make farming smarter
          and easier. Log in to explore your dashboard and stay connected.
        </div>
        <div className="flex items-center gap-4">
          <FontAwesomeIcon
            icon={faSeedling}
            className="text-6xl text-green-600"
          />
          <span className="text-2xl font-semibold text-green-600">
            Let's Grow Together
          </span>
        </div>
      </div>

      {/* Right Side */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center justify-center bg-green-500 text-white p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">
            {isSignUp ? "Sign Up" : "Log In"}
          </h2>

          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-green-600 outline-none"
                placeholder="example@domain.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-green-600 outline-none"
                placeholder="Enter your password"
              />
            </div>

            {/* Category Input (Only shown for sign-up) */}
            {isSignUp && (
              <div>
                <label className="block text-lg font-medium mb-2">
                  Category
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="farmer"
                      checked={category === "farmer"}
                      onChange={() => setCategory("farmer")}
                      className="mr-2"
                    />
                    Farmer
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="buyer"
                      checked={category === "buyer"}
                      onChange={() => setCategory("buyer")}
                      className="mr-2"
                    />
                    Buyer
                  </label>
                </div>
              </div>
            )}

            {/* Remember Me & Forgot Password (Only shown for login) */}
            {!isSignUp && (
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  Remember me
                </label>
                <a href="#" className="text-green-100 hover:text-green-200">
                  Forgot Password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-md text-lg font-medium transition-all"
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>

          {/* Toggle Sign Up / Log In */}
          <p className="text-sm text-center mt-6">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-green-100 font-medium hover:text-green-200"
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </button>
          </p>
        </div>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
