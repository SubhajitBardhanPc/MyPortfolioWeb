// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import "./Navbar.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../../firebase"; // ✅ Ensure firebase.js exports `app`

const Navbar = () => {
  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    const db = getDatabase(app);
    const imgRef = ref(db, "portfolio/profileImage");

    const unsubscribe = onValue(imgRef, (snapshot) => {
      const url = snapshot.val();
      if (url && typeof url === "string") {
        setImgURL(url);
      } else {
        console.warn("No valid image URL found in Realtime DB.");
      }
    }, (error) => {
      console.error("❌ Firebase read error:", error);
    });

    return () => unsubscribe(); // 🔁 Cleanup on unmount
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        {imgURL && (
          <img src={imgURL} alt="Profile" className="logo-image" />
        )}
        <span className="logo-text">Subhajit.dev</span>
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
