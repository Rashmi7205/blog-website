import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./css/NavBar.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
    <div className="logo">My Website</div>
    <ul className="menu-item">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/blog">Blogs</Link></li>
        <li>
            <Link to="/signup">Login Or Signup
        </Link></li>
      </ul>
    <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        <li><Link to="/signup">Login Or Signup</Link></li>
      </ul>
    </div>
    <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  </nav>
  );
}

export default NavBar;
