import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../../firebase";

const Navbar = () => {
  const [imgURL, setImgURL] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="logo">
        {imgURL && <img src={imgURL} alt="Profile" className="logo-image" />}
        <span className="logo-text">Subhajit.dev</span>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
        <li><Link to="/projects" onClick={toggleMenu}>Projects</Link></li>
        <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
