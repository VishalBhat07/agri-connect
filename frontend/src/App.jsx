import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import CropHealth from "./pages/CropHealth/CropHealth";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/crophealth"} element={<CropHealth />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
