import "./App.css";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseFunctions/firebaseConfig";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import CropHealth from "./pages/CropHealth/CropHealth";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Schemes from "./pages/Schemes/Schemes";
import PricePredictor from "./pages/Prediction/Predictor";
import Login from "./pages/Login/Login";
import FarmerProfile from "./pages/Profile/FarmerProfile";
import BuyerProfile from "./pages/Profile/BuyerProfile";
import LearningResourcesPage from "./pages/Learn/Learn";
import { fetchFarmer } from "../firebaseFunctions/fetchUser";
import FarmerMarket from "./pages/MarketPlace/FarmerMarket";
import BuyerMarket from "./pages/MarketPlace/BuyerMarket";
import PublicFarmerProfile from "./pages/Profile/PublicFarmerProfile";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"; // Import ScrollToTop

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const fetchedFarmer = await fetchFarmer(user.email);
          setFarmer(fetchedFarmer);
          console.log(fetchedFarmer.farmerID);
          setCurrentUser(user);
        } catch (error) {
          console.error("Error fetching farmer:", error);
          setFarmer(null);
        }
      } else {
        setCurrentUser(null);
        setFarmer(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser && !loading && window.location.pathname === "/login") {
      const profilePath = farmer
        ? `/profile/${farmer.farmerID}`
        : `/profile/${currentUser.uid}`;
      navigate(profilePath);
    }
  }, [currentUser, farmer, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar farmer={farmer} />
      <div className="h-100vh">
        {/* Integrate ScrollToTop */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crophealth" element={<CropHealth />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/test" element={<PricePredictor />} />
          <Route path="/login" element={<Login />} />
          <Route path={"/learn"} element={<LearningResourcesPage />} />
          <Route
            path="/profile/:userID"
            element={farmer ? <FarmerProfile /> : <BuyerProfile />}
          />

          <Route
            path={"/marketplace"}
            element={
              (farmer && <FarmerMarket farmerID={farmer.farmerID} />) || (
                <BuyerMarket />
              )
            }
          />
          <Route path="farmer/:farmerID" element={<PublicFarmerProfile />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;