// src/components/Projects/Projects.jsx
import React, { useEffect, useState } from "react";
import "./Projects.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../../firebase";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [knowledge, setKnowledge] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);

    const projectsRef = ref(db, "projects");
    const knowledgeRef = ref(db, "knowledge");

    // Fetch Projects
    const unsubscribeProjects = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedProjects = Object.values(data);
        setProjects(fetchedProjects);
      } else {
        setProjects([]);
      }
    });

    // Fetch Knowledge (as array of strings)
    const unsubscribeKnowledge = onValue(knowledgeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const knowledgeArray = Object.values(data);
        setKnowledge(knowledgeArray);
      } else {
        setKnowledge([]);
      }
    });

    return () => {
      unsubscribeProjects();
      unsubscribeKnowledge();
    };
  }, []);

  return (
    <section id="projects" className="projects-section">
      {/* 💡 Knowledge Section */}
      <div className="knowledge-section">
        <h2 className="knowledge-title">💡 My Tech Stack</h2>
        <div className="knowledge-tags">
          {knowledge.map((item, index) => (
            <span className="tag" key={index}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* 🚀 Projects Section */}
      <h2 className="projects-title">🚀 Featured Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <div className="project-content">
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
