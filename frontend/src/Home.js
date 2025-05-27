import React from 'react';
import { Link } from 'react-router-dom';
// import '../Styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-buttons">
        <Link to="/Student">
          <button className="home-btn">Student</button>
        </Link>
        <Link to="/Admin">
          <button className="home-btn">Admin</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;