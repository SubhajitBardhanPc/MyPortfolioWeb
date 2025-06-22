import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../../firebase";

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

    return () => unsubscribe(); // Cleanup
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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li> {/* You can add this route later */}
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/contact">Contact</Link></li> {/* Same here */}
      </ul>
    </nav>
  );
};

export default Navbar;
