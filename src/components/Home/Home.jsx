import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Subhajit Bardhan | Modern Web Developer Portfolio</title>
        <meta
          name="description"
          content="Hey, I'm Subhajit Bardhan – a curious dev building smooth, modern web apps with React & Spring Boot. Explore my projects & journey!"
        />
        <meta
          name="keywords"
          content="Subhajit Bardhan, portfolio, React developer, Java developer, Spring Boot, web development, frontend backend"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://subhajitbardhan.netlify.app/" />

        {/* Open Graph / social */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://subhajitbardhan.netlify.app/"
        />
        <meta
          property="og:title"
          content="Subhajit Bardhan | Modern Web Developer Portfolio"
        />
        <meta
          property="og:description"
          content="Explore my journey as a React & Java developer. View projects and skills."
        />
        <meta
          property="og:image"
          content="https://subhajitbardhan.netlify.app/og-image.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://subhajitbardhan.netlify.app/"
        />
        <meta
          name="twitter:title"
          content="Subhajit Bardhan | Modern Web Developer Portfolio"
        />
        <meta
          name="twitter:description"
          content="Hey, I'm Subhajit Bardhan – crafting smooth, modern web experiences with React & Spring Boot."
        />
        <meta
          name="twitter:image"
          content="https://subhajitbardhan.netlify.app/og-image.png"
        />
      </Helmet>

      <section id="home" className="home-container">
        <div className="intro-content">
          <h1 className="home-heading">
            Hey, I'm <span className="highlight">Subhajit</span>
          </h1>
          <p className="home-subtext">
            A curious dev building smooth, modern web experiences.
          </p>
          <Link to="/projects" className="home-button">
            View Projects 🚀
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
