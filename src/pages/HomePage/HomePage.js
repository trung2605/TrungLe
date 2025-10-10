import React from 'react';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Skills from '../../components/Skills';
import Projects from '../../components/Projects';
import Education from '../../components/Education';
import Activities from '../../components/Activities';
import Certificates from '../../components/Certificates';
import Prizes from '../../components/Prizes';
import Contact from '../../components/Contact';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Activities />
      <Certificates />
      <Prizes />
      <Contact />
    </div>
  );
};

export default HomePage;
