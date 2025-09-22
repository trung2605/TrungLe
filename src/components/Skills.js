import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  LinearProgress,
  useTheme,
  alpha,
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
import Section from '../common/Section';
import { skills } from '../data';

const Skills = () => {
  const theme = useTheme();

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

  const categoryColors = {
    'Programming Languages': {
      primary: theme.palette.primary.main,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
    },
    'Frameworks & Libraries': {
      primary: theme.palette.success.main,
      gradient: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`
    },
    'Tools & Technologies': {
      primary: theme.palette.secondary.main,
      gradient: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`
    },
    'Soft Skills': {
      primary: theme.palette.warning.main,
      gradient: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`
    }
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
      sx={{ 
        py: { xs: 8, md: 12 },
        background: theme.palette.mode === 'dark' 
          ? alpha(theme.palette.background.default, 0.8)
          : alpha(theme.palette.grey[50], 0.8)
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants}>
            <Box textAlign="center" mb={8}>
              <Typography 
                variant="h2" 
                component="h2" 
                fontWeight="bold" 
                mb={2}
                sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
              >
                My{' '}
                <Box component="span" color="primary.main">
                  Skills
                </Box>
              </Typography>
              <Box 
                sx={{
                  width: 60,
                  height: 4,
                  backgroundColor: 'primary.main',
                  mx: 'auto',
                  mb: 3,
                  borderRadius: 2
                }}
              />
              <Typography 
                variant="h6" 
                color="text.secondary" 
                maxWidth="600px" 
                mx="auto"
              >
                Here are the technologies and skills I've developed throughout my journey as a developer.
              </Typography>
            </Box>
          </motion.div>

          {/* Skills Grid */}
          <Grid container spacing={4} mb={8}>
            {skills.map((skillCategory, categoryIndex) => {
              const IconComponent = categoryIcons[skillCategory.category];
              const categoryStyle = categoryColors[skillCategory.category];
              
              return (
                <Grid item xs={12} lg={6} key={categoryIndex}>
                  <motion.div variants={itemVariants}>
                    <Card 
                      elevation={4}
                      sx={{
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 8,
                          transform: 'translateY(-8px)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        {/* Category Header */}
                        <Box display="flex" alignItems="center" mb={4}>
                          <Box
                            sx={{
                              width: 56,
                              height: 56,
                              borderRadius: 2,
                              background: categoryStyle.gradient,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 3,
                              boxShadow: 2
                            }}
                          >
                            <IconComponent sx={{ fontSize: 28, color: 'white' }} />
                          </Box>
                          <Typography 
                            variant="h5" 
                            fontWeight="bold"
                            sx={{
                              background: categoryStyle.gradient,
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent'
                            }}
                          >
                            {skillCategory.category}
                          </Typography>
                        </Box>

                        {/* Skills List */}
                        <Stack spacing={3}>
                          {skillCategory.items.map((skill, skillIndex) => (
                            <motion.div
                              key={skillIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: skillIndex * 0.1 }}
                            >
                              <Box>
                                <Box 
                                  display="flex" 
                                  justifyContent="space-between" 
                                  alignItems="center" 
                                  mb={1}
                                >
                                  <Typography 
                                    variant="body1" 
                                    fontWeight={600}
                                    color="text.primary"
                                  >
                                    {skill.name}
                                  </Typography>
                                  <Chip
                                    label={`${skill.level}%`}
                                    size="small"
                                    color={getSkillColor(skill.level)}
                                    variant="filled"
                                    sx={{ fontWeight: 600 }}
                                  />
                                </Box>
                                
                                {/* Progress Bar */}
                                <Box sx={{ position: 'relative' }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={skill.level}
                                    sx={{
                                      height: 8,
                                      borderRadius: 4,
                                      backgroundColor: alpha(categoryStyle.primary, 0.1),
                                      '& .MuiLinearProgress-bar': {
                                        borderRadius: 4,
                                        background: categoryStyle.gradient,
                                        boxShadow: `0 2px 8px ${alpha(categoryStyle.primary, 0.3)}`
                                      }
                                    }}
                                  />
                                  
                                  {/* Animated shimmer effect */}
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
                                    style={{
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      height: '100%',
                                      width: 20,
                                      background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.4)}, transparent)`,
                                      borderRadius: 4
                                    }}
                                  />
                                </Box>
                              </Box>
                            </motion.div>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>

          {/* Skills Summary */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={3} mb={6}>
              {skillsSummary.map((stat, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card 
                      elevation={3}
                      sx={{
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        background: theme.palette.mode === 'dark'
                          ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`
                          : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.light, 0.1)} 100%)`,
                        '&:hover': {
                          boxShadow: 6,
                          transform: 'translateY(-4px)'
                        }
                      }}
                    >
                      <CardContent sx={{ py: 4 }}>
                        <stat.icon 
                          sx={{ 
                            fontSize: 40, 
                            color: 'primary.main',
                            mb: 2 
                          }} 
                        />
                        <Typography 
                          variant="h3" 
                          fontWeight="bold" 
                          color="primary.main"
                          mb={1}
                        >
                          {stat.value}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Continuous Learning Section */}
          <motion.div variants={itemVariants}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.dark, 0.05)} 100%)`,
                textAlign: 'center'
              }}
            >
              <CardContent sx={{ p: 6 }}>
                <TrendingUpIcon 
                  sx={{ 
                    fontSize: 48, 
                    color: 'primary.main',
                    mb: 2 
                  }} 
                />
                <Typography variant="h4" fontWeight="bold" mb={3}>
                  Continuous Learning
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  lineHeight={1.7}
                  maxWidth="700px"
                  mx="auto"
                >
                  I'm constantly expanding my skill set and staying up-to-date with the latest technologies. 
                  Currently focusing on advanced Java frameworks, cloud technologies, and modern frontend development.
                </Typography>
                
                {/* Learning Focus Areas */}
                <Box mt={4}>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Current Focus Areas:
                  </Typography>
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    justifyContent="center"
                    flexWrap="wrap"
                    useFlexGap
                  >
                    {['Spring Boot', 'Docker', 'React Advanced', 'AWS', 'Microservices'].map((focus, index) => (
                      <Chip
                        key={index}
                        label={focus}
                        variant="outlined"
                        color="primary"
                        sx={{
                          fontWeight: 500,
                          '&:hover': {
                            backgroundColor: 'primary.light',
                            color: 'white'
                          }
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default Skills;