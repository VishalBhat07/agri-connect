import "./App.css";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseFunctions/firebaseConfig";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import CropHealth from "./pages/CropHealth/CropHealth";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Schemes from "./pages/Schemes/Schemes";
import PricePredictor from "./pages/Prediction/Predictor";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import FarmerMarket from "./pages/MarketPlace/FarmerMarket";
import Predictor from "./pages/Prediction/Predictor";
import LearningResourcesPage from "./pages/Learn/Learn";
import { fetchFarmer } from "../firebaseFunctions/fetchUser";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [farmer, setFarmer] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const fetchedFarmer = await fetchFarmer(user.email);
          if (fetchedFarmer) {
            setFarmer(fetchedFarmer);
          } else {
            setFarmer(null);
          }
          setCurrentUser(user);
        } catch {
          setFarmer(null);
        }
      } else {
        setCurrentUser(null);
        setFarmer(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/crophealth"} element={<CropHealth />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/contact"} element={<Contact />} />
          <Route path={"/schemes"} element={<Schemes />} />
          <Route path={"/test"} element={<PricePredictor />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/profile"} element={<Profile />} />
          {farmer && (
            <Route
              path={"/marketplace"}
              element={
                <FarmerMarket farmerID={farmer.farmerID} />
              }
            />
          )}
          <Route path={"/learn"} element={<LearningResourcesPage />} />
          <Route path={"/test"} element={<Predictor />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
