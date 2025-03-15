import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <img src="/sarthana.png" alt="Sarthana Logo" className="homepage-logo" />
        <div className="header-text">
          <h1>Welcome to Sarthana!</h1>
          <p>Your ultimate UPSC preparation hub.</p>
        </div>
      </header>
      <nav className="homepage-nav">
        <ul>
          <li><Link to="/syllabus">Syllabus</Link></li> {/* Using Link instead of <a> */}
          <li><Link to="/quiz">Quizzes</Link></li> {/* Updated to match your route path */}
          <li><Link to="/essays">Essays</Link></li>
          <li><Link to="/current-affairs">Current Affairs</Link></li>
        </ul>
      </nav>
      <main className="homepage-main">
        <section id="about">
          <h2>About Sarthana</h2>
          <p>
            Sarthana is a comprehensive platform designed for UPSC aspirants. It offers a structured syllabus,
            mock tests, essay writing, and daily current affairs, all in one place.
          </p>
        </section>
        <section id="features">
          <h2>Features</h2>
          <ul>
            <li>Comprehensive syllabus integration</li>
            <li>Interactive quizzes and mock tests</li>
            <li>Daily current affairs updates</li>
            <li>Essay writing practice</li>
          </ul>
        </section>
      </main>
      <footer className="homepage-footer">
        <p>&copy; 2024 Sarthana. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
