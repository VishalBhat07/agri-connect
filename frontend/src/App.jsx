import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Component from "./components/Footer/Footer";
import { Button } from "flowbite-react";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh" }}></div>
      <Component />
    </>
  );
}

export default App;
