import React, { useEffect, useState } from "react";
import { auth } from "../../../firebaseFunctions/firebaseConfig"; // Adjust the path to your firebase.js
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import { FaUserCircle } from "react-icons/fa"; // Importing user icon from react-icons
import { toast, ToastContainer } from "react-toastify"; // Importing toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importing the CSS for toastify
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  // Listen for Firebase Authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Close dropdown on outside click
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".dropdown")) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      unsubscribe();
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/"); // Redirect to home after sign-out
      toast.success("Successfully signed out!"); // Show success toast
    } catch (error) {
      console.error("Error signing out: ", error);
      toast.error("Error signing out!"); // Show error toast
    }
  };

  // Function to slice the username from the email
  const getUsername = (email) => {
    if (!email) return "User"; // Fallback for invalid email
    const username = email.split("@")[0]; // Slice email at the '@' symbol
    return username;
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
          <div className="logo-text">AgriConnect</div>
        </div>
        <div className="tabs">
          <li onClick={() => navigate("/marketplace")}>Market Place</li>
          <li onClick={() => navigate("/crophealth")}>Crop Health</li>
          <li onClick={() => navigate("/learn")}>Learning Resources</li>
          <li onClick={() => navigate("/schemes")}>Government Schemes</li>
          <li onClick={() => navigate("/about")}>About us</li>
          <li onClick={() => navigate("/contact")}>Contact us</li>
        </div>
        {user ? (
          <div className="relative cursor-pointer flex items-center space-x-2 dropdown">
            <FaUserCircle className="text-gray-200 text-xl" /> {/* User icon */}
            <span className="font-medium">
              {user.displayName || getUsername(user.email)}{" "}
              {/* Slice the email if displayName is not available */}
            </span>
            <span
              className="ml-2 cursor-pointer"
              onClick={() => setDropdownVisible(!dropdownVisible)} // Toggle dropdown visibility on click
            >
              ▼ {/* Dropdown icon */}
            </span>
            {dropdownVisible && (
              <div className="absolute top-full right-4 mt-2 w-40 bg-white text-black rounded-md shadow-lg dropdown-menu">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => navigate(`/profile/${user.uid}`)} // Corrected from user.id to user.uid
                >
                  My Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-white text-green-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        )}
      </div>

      {/* ToastContainer for displaying toasts */}
      <ToastContainer />
    </div>
  );
};

export default Navbar;
