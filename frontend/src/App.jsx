import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import CropHealth from "./pages/CropHealth/CropHealth";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

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
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
