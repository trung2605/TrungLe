import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Section from '../../common/Section';
import { useCustomTheme } from '../../contexts/ThemeContext';
import './About.scss';

function About() {
  const { theme } = useCustomTheme();

  return (
    <Section id="about" className={`about ${theme === 'darkCoder' ? 'about--coder' : ''}`}>
      <Container maxWidth="lg" className="about__container">
        <Box className="about__content">
          {theme === 'darkCoder' ? (
            <div className="about__coder">
              <div className="about__prompt">
                <span className="about__prompt-symbol">$</span> cat about_me.dev
              </div>
              
              <div className="about__code">
                <div className="about__comment">// Developer Information</div>
                <div className="about__code-block">
                  <span className="about__keyword">const</span> <span className="about__variable">developer</span> = {"{"}
                  <div className="about__properties">
                    <div><span className="about__property">name:</span> <span className="about__string">"Lê Trí Trung"</span>,</div>
                    <div><span className="about__property">role:</span> <span className="about__string">"Computer Science Student"</span>,</div>
                    <div><span className="about__property">university:</span> <span className="about__string">"FPT University"</span>,</div>
                    <div><span className="about__property">focus:</span> [<span className="about__string">"Java Development"</span>, <span className="about__string">"Web Technologies"</span>],</div>
                    <div><span className="about__property">passion:</span> <span className="about__string">"Building innovative solutions"</span>,</div>
                    <div><span className="about__property">status:</span> <span className="about__string">"Always learning"</span></div>
                  </div>
                  {"}"};
                </div>
              </div>

              <div className="about__description about__description--coder">
                <div><span className="about__comment-start">/*</span></div>
                <div><span className="about__comment-line"> * I'm a passionate Computer Science student at FPT University</span></div>
                <div><span className="about__comment-line"> * with a strong focus on Java development and modern web technologies.</span></div>
                <div><span className="about__comment-line"> * I love creating efficient, clean code and learning new technologies.</span></div>
                <div><span className="about__comment-end"> */</span></div>
              </div>

              <div className="about__skills-preview">
                <div className="about__comment">// Current Tech Stack</div>
                <div className="about__tech-stack">
                  <span className="about__tech-item">Java</span>
                  <span className="about__tech-item">React</span>
                  <span className="about__tech-item">Spring Boot</span>
                  <span className="about__tech-item">JavaScript</span>
                  <span className="about__tech-item">Node.js</span>
                  <span className="about__tech-item">MySQL</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="about__standard">
              <Typography 
                variant="h2" 
                component="h2" 
                className="about__title about__title--standard"
              >
                About <Box component="span" className="about__highlight">Me</Box>
              </Typography>
              <Typography 
                variant="h6" 
                className="about__description about__description--standard"
              >
                I'm a passionate Computer Science student at FPT University with a strong focus on 
                Java development and modern web technologies. I love creating efficient, clean code 
                and learning new technologies to build innovative solutions.
              </Typography>

              <Box className="about__stats">
                <div className="about__stat-item">
                  <div className="about__stat-number">3+</div>
                  <div className="about__stat-label">Years Coding</div>
                </div>
                <div className="about__stat-item">
                  <div className="about__stat-number">10+</div>
                  <div className="about__stat-label">Projects</div>
                </div>
                <div className="about__stat-item">
                  <div className="about__stat-number">5+</div>
                  <div className="about__stat-label">Technologies</div>
                </div>
              </Box>
            </div>
          )}
        </Box>
      </Container>
    </Section>
  );
}

export default About;
