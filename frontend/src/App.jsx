import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import { Button } from "flowbite-react";

function App() {
  return (
    <>
      <Navbar />
      
      <Home />


      <Footer />
    </>
  );
}

export default App;
