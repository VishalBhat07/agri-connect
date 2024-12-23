import React, { useEffect, useState } from "react";
import { auth } from "../../../firebaseConfig"; // Adjust the path to where your firebase.js is
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import "./Navbar.css"

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  // Listen for Firebase Authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/"); // Redirect to home after sign-out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
          <div className="logo-text">AgriConnect</div>
        </div>
        <div className="tabs">
          <li>Market Place</li>
          <li onClick={() => navigate("/crophealth")}>Crop Health</li>
          <li>Learning Resources</li>
          <li onClick={() => navigate("/schemes")}>Government Schemes</li>
          <li onClick={() => navigate("/about")}>About us</li>
          <li onClick={() => navigate("/contact")}>Contact us</li>
        </div>
        {user ? (
          <div
            className="cursor-pointer flex items-center space-x-2"
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <span className="font-medium">{user.displayName || "User"}</span>
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => navigate("/profile")}
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
    </div>
  );
};

export default Navbar;
