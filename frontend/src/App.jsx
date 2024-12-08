import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
