import React from 'react';
import cat from '../images/cat.jpg';
import {Link} from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page__container">
      <img src={cat} alt="Cat"></img>
      <h1>FILL YOUR HOME WITH LOVE!</h1>
      <h2>Choose your favorite pet!</h2>
      <Link to="/pets">View Pets List</Link>
    </div>
  );
};

export default LandingPage;
