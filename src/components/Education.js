import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import {
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Section from '../common/Section';
import { education } from '../data';

const Education = () => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const getStatusColor = (status) => {
    return status === 'Current' ? 'success' : 'primary';
  };

  const educationHighlights = {
    'FPT University': [
      'Active participation in coding competitions',
      'Leadership roles in student organizations',
      'Strong foundation in software development'
    ],
    'Phan Chau Trinh High School': [
      'Outstanding academic performance',
      'Strong mathematics and sciences background',
      'Active in extracurricular activities'
    ]
  };

  return (
    <Section 
      id="education" 
      sx={{ 
        py: { xs: 8, md: 12 },
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(21, 101, 192, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(25, 118, 210, 0.03) 0%, rgba(21, 101, 192, 0.05) 100%)'
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
                  Education
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
                My academic journey and achievements in pursuing knowledge and excellence.
              </Typography>
            </Box>
          </motion.div>

          {/* Education Timeline */}
          <motion.div variants={itemVariants}>
            <Timeline 
              position="alternate"
              sx={{
                [`& .MuiTimelineItem-root:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {education.map((edu, index) => (
                <TimelineItem key={edu.id}>
                  <TimelineSeparator>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <TimelineDot 
                        sx={{
                          backgroundColor: 'primary.main',
                          width: 56,
                          height: 56,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <SchoolIcon sx={{ fontSize: 28, color: 'white' }} />
                      </TimelineDot>
                    </motion.div>
                    {index < education.length - 1 && (
                      <TimelineConnector 
                        sx={{
                          backgroundColor: 'primary.light',
                          width: 3
                        }}
                      />
                    )}
                  </TimelineSeparator>
                  
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        elevation={4}
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: 8,
                            transform: 'translateY(-4px)'
                          }
                        }}
                      >
                        <CardContent sx={{ p: 4 }}>
                          {/* Status and Duration */}
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Chip 
                              label={edu.status}
                              color={getStatusColor(edu.status)}
                              variant="filled"
                              sx={{ fontWeight: 600 }}
                            />
                            <Box display="flex" alignItems="center" color="text.secondary">
                              <CalendarIcon sx={{ mr: 1, fontSize: 16 }} />
                              <Typography variant="body2" fontWeight={500}>
                                {edu.duration}
                              </Typography>
                            </Box>
                          </Box>

                          {/* School Name */}
                          <Typography 
                            variant="h4" 
                            fontWeight="bold" 
                            color="text.primary"
                            mb={1}
                          >
                            {edu.school}
                          </Typography>

                          {/* Degree */}
                          <Typography 
                            variant="h6" 
                            color="primary.main"
                            fontWeight={600}
                            mb={2}
                          >
                            {edu.degree}
                          </Typography>

                          {/* GPA */}
                          <Box display="flex" alignItems="center" mb={3}>
                            <StarIcon sx={{ color: 'warning.main', mr: 1 }} />
                            <Typography variant="body1" color="text.secondary">
                              GPA:{' '}
                              <Box 
                                component="span" 
                                color="primary.main" 
                                fontWeight="bold"
                                fontSize="1.1rem"
                              >
                                {edu.gpa}
                              </Box>
                            </Typography>
                          </Box>

                          {/* Description */}
                          <Typography 
                            variant="body1" 
                            color="text.secondary" 
                            lineHeight={1.6}
                            mb={3}
                          >
                            {edu.description}
                          </Typography>

                          {/* Highlights */}
                          {educationHighlights[edu.school] && (
                            <Box 
                              sx={{
                                mt: 3,
                                pt: 3,
                                borderTop: 1,
                                borderColor: 'divider'
                              }}
                            >
                              <Typography 
                                variant="subtitle1" 
                                fontWeight={600} 
                                color="text.primary"
                                mb={2}
                              >
                                Key Highlights:
                              </Typography>
                              <List dense sx={{ pt: 0 }}>
                                {educationHighlights[edu.school].map((highlight, idx) => (
                                  <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                      <CheckIcon 
                                        sx={{ 
                                          fontSize: 16, 
                                          color: 'success.main' 
                                        }} 
                                      />
                                    </ListItemIcon>
                                    <ListItemText 
                                      primary={highlight}
                                      primaryTypographyProps={{
                                        variant: 'body2',
                                        color: 'text.secondary'
                                      }}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </motion.div>

          {/* Education Summary */}
          <motion.div variants={itemVariants}>
            <Box mt={8}>
              <Card
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.dark, 0.15)} 100%)`
                    : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                  textAlign: 'center'
                }}
              >
                <CardContent sx={{ p: 6 }}>
                  <Typography variant="h4" fontWeight="bold" mb={3}>
                    Academic Excellence
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    lineHeight={1.7}
                    maxWidth="800px"
                    mx="auto"
                  >
                    Throughout my academic journey, I have maintained a strong commitment to learning and 
                    personal growth. My education has provided me with a solid foundation in computer science 
                    principles and practical skills that I apply in real-world projects.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default Education;