import React from "react";
import "./Home.css";

function Left() {
  return (
    <div className="home-left-section">
      <div className="home-left-title">Free forever. No Credit card</div>
      <div className="home-left-info">
        <div className="home-left-info-title">
          Financials Done Smoothly
        </div>
        <div className="home-left-info-features">
          <button>Get Started</button>
          <button>Our Features</button>
        </div>
      </div>
      <div className="home-left-about">
        Place your trust in us to provide a seamless and hassle-free experience as you navigate the world of finance insights
      </div>
    </div>
  );
}

function Right() {
  return (
  <div className="home-right-section">
    <div className="home-right-profile">
      <img src="" alt="profile" />
    </div>
    <div className="home-right-features">
      <ul className="home-feature-list">
        <li className="feature">Securely deposit and store funds</li>
        <li className="feature">FDIC Insurance-eligible </li>
        <li className="feature">Easily issue virtual cards</li>
      </ul>
    </div>
  </div>
  );
}
export default function Home() {
  let home = 
  <div className="home">
    <Left />
    <Right />
  </div>;
  return home;
}
