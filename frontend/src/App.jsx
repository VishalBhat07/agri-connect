import "./App.css";
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

function App() {
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
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
