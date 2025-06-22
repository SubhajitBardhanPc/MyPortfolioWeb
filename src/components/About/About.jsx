import React, { useEffect, useState } from "react";
import "./About.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../../firebase";

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
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
