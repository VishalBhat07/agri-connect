import React from "react";
import "./Home.css";

function Left() {
  return (
    <div className="home-left-section">
      <div className="home-left-title">AgriConnect: Empowering Farmers</div>
      <div className="home-left-info">
        <div className="home-left-info-title">Farming Made Easier</div>
        <div className="home-left-info-features">
          <button>Get Started</button>
          <button>Explore Features</button>
        </div>
      </div>
      <div className="home-left-about">
        AgriConnect is here to support farmers with crop sales, modern farming techniques, weather updates, and more. Empowering the agricultural community, one farmer at a time.
      </div>
    </div>
  );
}

function Right() {
  return (
    <div className="home-right-section">
      <div className="home-right-profile">
        <img src="/pfp.jpg" alt="farmer profile" />
      </div>
      <div className="home-right-features">
        <ul className="home-feature-list">
          <li className="feature">Buy and sell crops easily</li>
          <li className="feature">Learn modern farming techniques</li>
          <li className="feature">Access real-time weather updates</li>
          <li className="feature">Analyze crop price trends</li>
          <li className="feature">Get notified about government schemes</li>
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  let home = (
    <div className="home">
      <Left />
      <Right />
    </div>
  );
  return home;
}
