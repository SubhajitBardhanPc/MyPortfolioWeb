
import "./Navbar.css"; // optional if separate

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Subhajit.dev</div>
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
