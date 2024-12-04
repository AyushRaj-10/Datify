import { useState } from "react";
import { Link } from "react-router-dom";
import './Home.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming the user is logged in, set to false if not

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header>
        <nav className="nav">
          <div className="logo-container">
            <img className="logo" src="/logo.png" alt="logo" />
            <img
              src="/menu.png"
              className="menu-btn"
              id="menu-btn"
              onClick={toggleMenu}
              alt="menu icon"
            />
          </div>
          <ul className={`list-items ${isMenuOpen ? 'open' : ''}`}>
            <li className="list">
              <Link to="/" className="link">Home</Link>
            </li>
            <li className="list">
              <Link to="/card" className="link">Your Match</Link>
            </li>
            <li className="list">
              <Link to="/contactus" className="link">Contact</Link>
            </li>
            <li className="list">
              <Link to="/confess" className="link">Confess</Link> {/* New link added */}
            </li>

          </ul>
        </nav>
        <div className="container">
          <div className="container-left">
            <p className="text-small">Because you deserve better!</p>
            <h1 className="title">
              Get noticed for <span className="title-s">who</span> you are,
              <span className="title-s">not what</span> you look like.
            </h1>
            <p className="text">
              You’re more than just a photo. You have stories to tell, and
              passions to share, and things to talk about that are more
              interesting than the weather. Because you deserve what dating
              deserves: better.
            </p>
            <div className="stats-container">
              <div className="stats"></div>
              <div className="stats"></div>
              <div className="stats"></div>
            </div>
            <img src="/wave-left.png" className="wave-left" alt="wave left" />
          </div>

          <div className="container-right">
            <img
              className="couples-img couples-img-desktop"
              src="/couples.png"
              alt="couples"
            />
            <img
              className="couples-img couples-img-mobile"
              src="/couples-mobile.png"
              alt="couples mobile"
            />
            <img src="/details.png" className="details-img" alt="details" />
            <img src="/wave-right.png" className="wave-right" alt="wave right" />
          </div>
        </div>
      </header>

      <div className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <img className="logo" src="/logo.png" alt="logo" />
            <p>Connecting hearts worldwide. Join us and find your perfect match.</p>
          </div>
          <div className="footer-center">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/card">Your Match</Link></li>
              <li><Link to="/contactus">Contact</Link></li>
              <li><Link to="/confess">Confess</Link></li> 
            </ul>
          </div>
          <div className="footer-right">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><img src="/twitter.png" alt="Twitter" /></a>
              <a href="#"><img src="/insta.png" alt="Instagram" /></a>
              <a href="#"><img src="/linkedin.png" alt="LinkedIn" /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Datify. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
