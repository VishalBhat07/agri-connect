import React, { useEffect, useState } from "react";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logo = () => (
  <div className="flex items-center space-x-2">
    <img src={logo} alt="logo" className="h-8 w-auto" />
    <div className="font-bold text-white flex">
      <span className="text-red-500 text-3xl italic transform -skew-x-6">
        Agri
      </span>
      <span className="text-green-500 text-3xl italic transform skew-x-6">
        Connect
      </span>
    </div>
  </div>
);

const Navbar = ({ farmer }) => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
      toast.success("Successfully signed out!");
    } catch (error) {
      console.error("Error signing out: ", error);
      toast.error("Error signing out!");
    }
  };

  const getUsername = (email) => {
    if (!email) return "User";
    return email.split("@")[0];
  };

  const navItems = [
    { path: "/marketplace", label: "Market Place" },
    { path: "/crophealth", label: "Crop Health" },
    { path: "/learn", label: "Learning Resources" },
    { path: "/schemes", label: "Government Schemes" },
    { path: "/about", label: "About us" },
    { path: "/contact", label: "Contact us" },
  ];

  return (
    <nav className="bg-black shadow-lg">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <Logo />
          </div>

          {/* Rest of the navbar code remains the same */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 hover:text-gray-300"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {item.label}
              </button>
            ))}

            {user ? (
              <div
                className="relative dropdown group"
                onMouseEnter={() => setDropdownVisible(true)}
                onMouseLeave={() => setDropdownVisible(false)}
              >
                <div className="flex items-center space-x-2 cursor-pointer text-white">
                  <FaUserCircle className="text-xl" />
                  <span>{getUsername(user.email)}</span>
                  <span className="ml-1">▼</span>
                </div>
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transition-all duration-200 transform opacity-0 scale-95 origin-top-right pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto`}
                >
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() =>
                      navigate(
                        farmer
                          ? `/profile/${farmer.farmerID}`
                          : `/profile/${user.uid}`
                      )
                    }
                  >
                    My Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                Sign in
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                >
                  {item.label}
                </button>
              ))}

              {user ? (
                <>
                  <button
                    onClick={() => {
                      navigate(`/profile/${user.uid}`);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
