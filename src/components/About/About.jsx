import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../../firebase";
import { Helmet } from "react-helmet";
import "./About.css";

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const db = getDatabase(app);
    const aboutRef = ref(db, "about");

    const unsubscribe = onValue(aboutRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setAboutData(data);
    });

    return () => unsubscribe();
  }, []);

  if (!aboutData) return <p className="loading">Loading...</p>;

  const entries = Object.entries(aboutData);

  return (
    <>
      <Helmet>
        <title>About Me | Subhajit Bardhan - React & Java Developer</title>
        <meta
          name="description"
          content="Learn more about Subhajit Bardhan – a passionate software developer building modern web apps with React & Spring Boot. Discover my journey and skills."
        />
        <meta
          name="keywords"
          content="Subhajit Bardhan, about, React developer, Java developer, Spring Boot, software engineer, web development"
        />
        <link
          rel="canonical"
          href="https://subhajitbardhan.netlify.app/about"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://subhajitbardhan.netlify.app/about"
        />
        <meta
          property="og:title"
          content="About Me | Subhajit Bardhan - React & Java Developer"
        />
        <meta
          property="og:description"
          content="Get to know Subhajit Bardhan – a developer building clean, modern web apps."
        />
        <meta
          property="og:image"
          content="https://subhajitbardhan.netlify.app/og-image.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://subhajitbardhan.netlify.app/about"
        />
        <meta
          name="twitter:title"
          content="About Me | Subhajit Bardhan - React & Java Developer"
        />
        <meta
          name="twitter:description"
          content="Learn more about Subhajit Bardhan – a React & Spring Boot developer building modern apps."
        />
        <meta
          name="twitter:image"
          content="https://subhajitbardhan.netlify.app/og-image.png"
        />
      </Helmet>

      <section id="about" className="about-section">
        <h2 className="about-title">About Me</h2>
        <div className="about-container">
          {entries.map(([key, value], index) => (
            <div
              key={key}
              className={`about-card glass ${
                index % 2 === 0 ? "from-left" : "from-right"
              }`}
            >
              <p>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default About;
