import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  Paper,
} from '@mui/material';
import { GitHub, Launch, CalendarToday, Person } from '@mui/icons-material';
import { projects } from '../../data';
import { useCustomTheme } from '../../contexts/ThemeContext';
import './Projects.scss';

const Projects = () => {
  const { theme } = useCustomTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const getTechColor = (tech) => {
    const colors = {
      'React': '#61dafb',
      'Spring Boot': '#6db33f',
      'MySQL': '#4479a1',
      'PostgreSQL': '#336791',
      'MongoDB': '#47a248',
      'Docker': '#2496ed',
      'AWS': '#ff9900',
      'Node.js': '#339933',
      'Express': '#000000',
      'Redis': '#dc382d',
      'Kubernetes': '#326ce5',
      'Stripe API': '#635bff',
      'Java': '#f89820',
      'JavaScript': '#f7df1e',
      'TypeScript': '#3178c6',
      'Python': '#3776ab'
    };
    return colors[tech] || '#6b7280';
  };

  return (
    <Box 
      component="section" 
      id="projects" 
      className={`projects ${theme === 'darkCoder' ? 'projects--coder' : ''}`}
    >
      <Container maxWidth="xl" className="projects__container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants}>
            <Box className="projects__header">
              {theme === 'darkCoder' ? (
                <div className="projects__coder-header">
                  <div className="projects__prompt">
                    <span className="projects__prompt-symbol">$</span> ls -la ~/projects/
                  </div>
                  
                  <div className="projects__code">
                    <div className="projects__comment">// My Portfolio Projects</div>
                    <div className="projects__code-block">
                      <span className="projects__keyword">const</span> <span className="projects__variable">projects</span> = [
                      <div className="projects__properties">
                        <div>  <span className="projects__comment">// Full-stack applications</span></div>
                        <div>  <span className="projects__comment">// Open source contributions</span></div>
                        <div>  <span className="projects__comment">// Personal experiments</span></div>
                      </div>
                      ];
                    </div>
                  </div>

                  <div className="projects__stats">
                    <div className="projects__stat">
                      <span className="projects__stat-number">{projects.length}+</span>
                      <span className="projects__stat-label">Projects</span>
                    </div>
                    <div className="projects__stat">
                      <span className="projects__stat-number">10+</span>
                      <span className="projects__stat-label">Technologies</span>
                    </div>
                    <div className="projects__stat">
                      <span className="projects__stat-number">2+</span>
                      <span className="projects__stat-label">Years Experience</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="projects__standard-header">
                  <Typography
                    variant="h2"
                    component="h2"
                    className="projects__title projects__title--standard"
                  >
                    My{' '}
                    <Box component="span" className="projects__highlight">
                      Projects
                    </Box>
                  </Typography>
                  <Divider className="projects__divider" />
                  <Typography
                    variant="h6"
                    className="projects__description projects__description--standard"
                  >
                    Here are some of the projects I've worked on, showcasing my skills and experience in various technologies.
                  </Typography>
                </div>
              )}
            </Box>
          </motion.div>

          {/* Projects Grid */}
          <Grid container spacing={4} className="projects__grid">
            {projects.map((project) => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="projects__card-wrapper"
                >
                  {theme === 'darkCoder' ? (
                    <div className="projects__card projects__card--coder">
                      {/* Terminal Header */}
                      <div className="projects__terminal-header">
                        <div className="projects__terminal-dots">
                          <span className="projects__terminal-dot projects__terminal-dot--red"></span>
                          <span className="projects__terminal-dot projects__terminal-dot--yellow"></span>
                          <span className="projects__terminal-dot projects__terminal-dot--green"></span>
                        </div>
                        <div className="projects__terminal-title">{project.title}.project</div>
                      </div>

                      {/* Project Content */}
                      <div className="projects__card-content">
                        <div className="projects__code-content">
                          <div className="projects__comment">// Project Information</div>
                          <div className="projects__project-code">
                            <span className="projects__keyword">const</span> <span className="projects__variable">project</span> = {"{"}
                            <div className="projects__project-properties">
                              <div><span className="projects__property">name:</span> <span className="projects__string">"{project.title}"</span>,</div>
                              <div><span className="projects__property">status:</span> <span className="projects__string">"{project.status}"</span>,</div>
                              <div><span className="projects__property">role:</span> <span className="projects__string">"{project.role}"</span>,</div>
                              <div><span className="projects__property">duration:</span> <span className="projects__string">"{project.duration}"</span>,</div>
                            </div>
                            {"}"};
                          </div>

                          <div className="projects__description-code">
                            <div className="projects__comment">// Description</div>
                            <div className="projects__description-text">
                              {project.description}
                            </div>
                          </div>

                          <div className="projects__tech-section">
                            <div className="projects__comment">// Tech Stack</div>
                            <div className="projects__tech-array">
                              <span className="projects__keyword">const</span> <span className="projects__variable">techStack</span> = [
                              <div className="projects__tech-list">
                                {project.techStack.map((tech, index) => (
                                  <span key={index} className="projects__tech-item-coder">
                                    <span className="projects__string">"{tech}"</span>{index < project.techStack.length - 1 ? ',' : ''}
                                  </span>
                                ))}
                              </div>
                              ];
                            </div>
                          </div>

                          <div className="projects__links-section">
                            <div className="projects__comment">// Project Links</div>
                            <div className="projects__links-code">
                              <div className="projects__link-item">
                                <span className="projects__property">github:</span> 
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="projects__link">
                                  <span className="projects__string">"{project.githubUrl}"</span>
                                </a>
                              </div>
                              <div className="projects__link-item">
                                <span className="projects__property">demo:</span> 
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="projects__link">
                                  <span className="projects__string">"{project.liveUrl}"</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Card className="projects__card projects__card--standard">
                      {/* Project Image */}
                      <Box className="projects__image-container">
                        <CardMedia
                          component={motion.img}
                          image={project.image}
                          alt={project.title}
                          className="projects__image"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <Chip
                          label={project.status}
                          size="small"
                          className={`projects__status-chip projects__status-chip--${project.status.toLowerCase().replace(' ', '-')}`}
                        />
                      </Box>

                      {/* Project Content */}
                      <CardContent className="projects__content">
                        <Typography variant="h5" component="h3" className="projects__card-title">
                          {project.title}
                        </Typography>

                        {/* Project Meta */}
                        <Box className="projects__meta">
                          <Box className="projects__meta-item">
                            <Person fontSize="small" />
                            <Typography variant="body2" color="text.secondary">
                              {project.role}
                            </Typography>
                          </Box>
                          <Box className="projects__meta-item">
                            <CalendarToday fontSize="small" />
                            <Typography variant="body2" color="text.secondary">
                              {project.duration}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Project Description */}
                        <Typography
                          variant="body2"
                          className="projects__card-description"
                        >
                          {project.description}
                        </Typography>

                        {/* Tech Stack */}
                        <Box className="projects__tech-section-standard">
                          <Typography variant="subtitle2" className="projects__tech-title">
                            Tech Stack:
                          </Typography>
                          <Box className="projects__tech-chips">
                            {project.techStack.map((tech, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                              >
                                <Chip
                                  label={tech}
                                  size="small"
                                  className="projects__tech-chip"
                                  sx={{
                                    '--tech-color': getTechColor(tech),
                                    backgroundColor: `${getTechColor(tech)}20`,
                                    color: 'var(--tech-color)',
                                    borderColor: `${getTechColor(tech)}40`
                                  }}
                                />
                              </motion.div>
                            ))}
                          </Box>
                        </Box>
                      </CardContent>

                      {/* Action Buttons */}
                      <CardActions className="projects__actions">
                        <Button
                          variant="outlined"
                          startIcon={<GitHub />}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects__button projects__button--github"
                          component={motion.a}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          GitHub
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<Launch />}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects__button projects__button--demo"
                          component={motion.a}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Live Demo
                        </Button>
                      </CardActions>
                    </Card>
                  )}
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Projects Summary */}
          <motion.div variants={itemVariants}>
            {theme === 'darkCoder' ? (
              <div className="projects__summary projects__summary--coder">
                <div className="projects__terminal-header">
                  <div className="projects__terminal-dots">
                    <span className="projects__terminal-dot projects__terminal-dot--red"></span>
                    <span className="projects__terminal-dot projects__terminal-dot--yellow"></span>
                    <span className="projects__terminal-dot projects__terminal-dot--green"></span>
                  </div>
                  <div className="projects__terminal-title">more_projects.sh</div>
                </div>

                <div className="projects__summary-content">
                  <div className="projects__comment">// Want to see more?</div>
                  <div className="projects__summary-text">
                    These are just a few highlights of my work. I'm always working on new projects and
                    improving existing ones. Check out my GitHub for more repositories and contributions.
                  </div>
                  
                  <div className="projects__summary-command">
                    <span className="projects__prompt-symbol">$</span> git clone https://github.com/letritrung
                    <a 
                      href="https://github.com/letritrung"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects__github-link"
                    >
                      <span className="projects__link-text">[ENTER]</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <Paper className="projects__summary projects__summary--standard">
                <Typography variant="h4" component="h3" className="projects__summary-title">
                  Want to See More?
                </Typography>
                <Typography className="projects__summary-description">
                  These are just a few highlights of my work. I'm always working on new projects and
                  improving existing ones. Check out my GitHub for more repositories and contributions.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<GitHub />}
                  href="https://github.com/letritrung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects__github-button"
                  component={motion.a}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Projects
                </Button>
              </Paper>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Projects;