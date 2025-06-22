// src/components/Projects/Projects.jsx
import React, { useEffect, useState } from "react";
import "./Projects.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../../firebase"; // 🔗 Ensure firebase is setup correctly

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const projectsRef = ref(db, "projects");

    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedProjects = Object.values(data);
        setProjects(fetchedProjects);
      } else {
        setProjects([]);
      }
    });

    return () => unsubscribe(); // 🔁 Clean up
  }, []);

  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-title">🚀 My Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-button"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
