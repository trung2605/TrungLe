import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  LinearProgress,
  Stack,
  Chip
} from '@mui/material';
import {
  Code as CodeIcon,
  Web as ReactIcon,
  Build as ToolsIcon,
  People as UsersIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Section from '../../common/Section';
import { skills } from '../../data';
import { useCustomTheme } from '../../contexts/ThemeContext';
import './Skills.scss';

const Skills = () => {
  const { theme } = useCustomTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const categoryIcons = {
    'Programming Languages': CodeIcon,
    'Frameworks & Libraries': ReactIcon,
    'Tools & Technologies': ToolsIcon,
    'Soft Skills': UsersIcon
  };

  const getSkillColor = (level) => {
    if (level >= 90) return 'success';
    if (level >= 75) return 'primary';
    if (level >= 60) return 'warning';
    return 'info';
  };

  const skillsSummary = [
    { value: '15+', label: 'Technologies', icon: CodeIcon },
    { value: '2+', label: 'Years Experience', icon: TrendingUpIcon },
    { value: '3+', label: 'Active Projects', icon: ReactIcon }
  ];

  return (
    <Section 
      id="skills" 
      className={`skills ${theme === 'darkCoder' ? 'skills--coder' : ''}`}
    >
      <Container maxWidth="lg" className="skills__container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants}>
            <Box className="skills__header">
              {theme === 'darkCoder' ? (
                <div className="skills__coder-header">
                  <div className="skills__prompt">
                    <span className="skills__prompt-symbol">$</span> cat skills.json | jq '.technologies'
                  </div>
                  
                  <div className="skills__code">
                    <div className="skills__comment">// My Technical Skills</div>
                    <div className="skills__code-block">
                      <span className="skills__keyword">const</span> <span className="skills__variable">developer</span> = {"{"}
                      <div className="skills__properties">
                        <div><span className="skills__property">experience:</span> <span className="skills__string">"2+ years"</span>,</div>
                        <div><span className="skills__property">technologies:</span> <span className="skills__number">15</span>,</div>
                        <div><span className="skills__property">focus:</span> <span className="skills__string">"Full-stack Development"</span>,</div>
                        <div><span className="skills__property">learning:</span> <span className="skills__string">"Never stops"</span></div>
                      </div>
                      {"}"};
                    </div>
                  </div>
                </div>
              ) : (
                <div className="skills__standard-header">
                  <Typography 
                    variant="h2" 
                    component="h2" 
                    className="skills__title skills__title--standard"
                  >
                    My{' '}
                    <Box component="span" className="skills__highlight">
                      Skills
                    </Box>
                  </Typography>
                  <Box className="skills__divider" />
                  <Typography 
                    variant="h6" 
                    className="skills__description skills__description--standard"
                  >
                    Here are the technologies and skills I've developed throughout my journey as a developer.
                  </Typography>
                </div>
              )}
            </Box>
          </motion.div>

          {/* Skills Grid */}
          <Grid container spacing={4} className="skills__grid">
            {skills.map((skillCategory, categoryIndex) => {
              const IconComponent = categoryIcons[skillCategory.category];
              
              return (
                <Grid item xs={12} lg={6} key={categoryIndex}>
                  <motion.div variants={itemVariants}>
                    {theme === 'darkCoder' ? (
                      <div className="skills__card skills__card--coder">
                        {/* Terminal Header */}
                        <div className="skills__terminal-header">
                          <div className="skills__terminal-dots">
                            <span className="skills__terminal-dot skills__terminal-dot--red"></span>
                            <span className="skills__terminal-dot skills__terminal-dot--yellow"></span>
                            <span className="skills__terminal-dot skills__terminal-dot--green"></span>
                          </div>
                          <div className="skills__terminal-title">{skillCategory.category.toLowerCase().replace(/\s+/g, '_')}.skills</div>
                        </div>

                        {/* Category Content */}
                        <div className="skills__card-content">
                          <div className="skills__category-header">
                            <div className="skills__category-icon">
                              <IconComponent />
                            </div>
                            <div className="skills__category-info">
                              <div className="skills__comment">// {skillCategory.category}</div>
                              <div className="skills__category-code">
                                <span className="skills__keyword">const</span> <span className="skills__variable">skills</span> = [
                              </div>
                            </div>
                          </div>

                          <div className="skills__list">
                            {skillCategory.items.map((skill, skillIndex) => (
                              <motion.div
                                key={skillIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: skillIndex * 0.1 }}
                                className="skills__item skills__item--coder"
                              >
                                <div className="skills__item-header">
                                  <span className="skills__item-name">
                                    <span className="skills__string">"{skill.name}"</span>: <span className="skills__number">{skill.level}</span>%
                                  </span>
                                </div>
                                
                                <div className="skills__progress skills__progress--coder">
                                  <div className="skills__progress-bg">
                                    <div 
                                      className="skills__progress-fill"
                                      data-level={skill.level}
                                    ></div>
                                  </div>
                                  <div className="skills__progress-label">{skill.level}%</div>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          <div className="skills__category-footer">
                            <span className="skills__bracket">];</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Card className="skills__card skills__card--standard">
                        <CardContent className="skills__card-content">
                          {/* Category Header */}
                          <Box className="skills__category-header-standard">
                            <Box className={`skills__category-icon-standard skills__category-icon--${categoryIndex}`}>
                              <IconComponent />
                            </Box>
                            <Typography 
                              variant="h5" 
                              className={`skills__category-title skills__category-title--${categoryIndex}`}
                            >
                              {skillCategory.category}
                            </Typography>
                          </Box>

                          {/* Skills List */}
                          <Stack spacing={3} className="skills__list-standard">
                            {skillCategory.items.map((skill, skillIndex) => (
                              <motion.div
                                key={skillIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: skillIndex * 0.1 }}
                                className="skills__item skills__item--standard"
                              >
                                <Box className="skills__item-header-standard">
                                  <Typography className="skills__item-name-standard">
                                    {skill.name}
                                  </Typography>
                                  <Chip
                                    label={`${skill.level}%`}
                                    size="small"
                                    color={getSkillColor(skill.level)}
                                    className="skills__level-chip"
                                  />
                                </Box>
                                
                                <Box className="skills__progress-container">
                                  <LinearProgress
                                    variant="determinate"
                                    value={skill.level}
                                    className={`skills__progress-bar skills__progress-bar--${categoryIndex}`}
                                  />
                                  
                                  <motion.div
                                    animate={{ 
                                      x: [-30, skill.level * 3] 
                                    }}
                                    transition={{
                                      repeat: Infinity,
                                      duration: 2,
                                      ease: "linear",
                                      delay: skillIndex * 0.2
                                    }}
                                    className="skills__shimmer"
                                  />
                                </Box>
                              </motion.div>
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>

          {/* Skills Summary */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={3} className="skills__summary-grid">
              {skillsSummary.map((stat, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {theme === 'darkCoder' ? (
                      <div className="skills__stat skills__stat--coder">
                        <div className="skills__stat-icon">
                          <stat.icon />
                        </div>
                        <div className="skills__stat-content">
                          <div className="skills__stat-value">{stat.value}</div>
                          <div className="skills__stat-label">{stat.label}</div>
                        </div>
                      </div>
                    ) : (
                      <Card className="skills__stat skills__stat--standard">
                        <CardContent className="skills__stat-content-standard">
                          <stat.icon className="skills__stat-icon-standard" />
                          <Typography className="skills__stat-value-standard">
                            {stat.value}
                          </Typography>
                          <Typography className="skills__stat-label-standard">
                            {stat.label}
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Continuous Learning Section */}
          <motion.div variants={itemVariants}>
            {theme === 'darkCoder' ? (
              <div className="skills__learning skills__learning--coder">
                <div className="skills__terminal-header">
                  <div className="skills__terminal-dots">
                    <span className="skills__terminal-dot skills__terminal-dot--red"></span>
                    <span className="skills__terminal-dot skills__terminal-dot--yellow"></span>
                    <span className="skills__terminal-dot skills__terminal-dot--green"></span>
                  </div>
                  <div className="skills__terminal-title">continuous_learning.md</div>
                </div>

                <div className="skills__learning-content">
                  <div className="skills__comment">// Always Learning, Always Growing</div>
                  <div className="skills__learning-text">
                    I'm constantly expanding my skill set and staying up-to-date with the latest technologies.
                    Currently focusing on advanced Java frameworks, cloud technologies, and modern frontend development.
                  </div>

                  <div className="skills__focus-section">
                    <div className="skills__comment">// Current Focus Areas</div>
                    <div className="skills__focus-array">
                      <span className="skills__keyword">const</span> <span className="skills__variable">currentFocus</span> = [
                      <div className="skills__focus-list">
                        {['Spring Boot', 'Docker', 'React Advanced', 'AWS', 'Microservices'].map((focus, index) => (
                          <span key={index} className="skills__focus-item">
                            <span className="skills__string">"{focus}"</span>{index < 4 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                      ];
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Card className="skills__learning skills__learning--standard">
                <CardContent className="skills__learning-content-standard">
                  <TrendingUpIcon className="skills__learning-icon" />
                  <Typography variant="h4" className="skills__learning-title">
                    Continuous Learning
                  </Typography>
                  <Typography className="skills__learning-description">
                    I'm constantly expanding my skill set and staying up-to-date with the latest technologies. 
                    Currently focusing on advanced Java frameworks, cloud technologies, and modern frontend development.
                  </Typography>
                  
                  <Box className="skills__focus-areas">
                    <Typography variant="h6" className="skills__focus-title">
                      Current Focus Areas:
                    </Typography>
                    <Stack className="skills__focus-chips">
                      {['Spring Boot', 'Docker', 'React Advanced', 'AWS', 'Microservices'].map((focus, index) => (
                        <Chip
                          key={index}
                          label={focus}
                          variant="outlined"
                          color="primary"
                          className="skills__focus-chip"
                        />
                      ))}
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default Skills;