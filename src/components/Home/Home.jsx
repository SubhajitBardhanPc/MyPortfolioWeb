// src/components/Home/Home.jsx
import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "./Home.css";

const Home = () => {
  return (
    <section id="home" className="home-container">
      <div className="intro-content">
        <h1 className="home-heading">
          Hey, I'm <span className="highlight">Subhajit</span> 👋
        </h1>
        <p className="home-subtext">
          A curious dev building smooth, modern web experiences.
        </p>
        {/* ✅ Use Link to navigate instead of anchor tag */}
        <Link to="/projects" className="home-button">
          View Projects 🚀
        </Link>
      </div>
    </section>
  );
};

export default Home;
