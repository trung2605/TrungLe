import React from 'react';
import Home from '../../components/Home/Home';

import './HomePage.scss';
import Contact from '../../components/Contact/Contact';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Home />
      <Contact />
    </div>
  );
};

export default HomePage;
