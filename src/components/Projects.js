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
import { styled } from '@mui/material/styles';
import { GitHub, Launch, CalendarToday, Person } from '@mui/icons-material';
import { projects } from '../data';

// Styled components
const StyledCard = styled(motion.div)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[8],
    transform: 'translateY(-8px)',
  },
}));

const StatusChip = styled(Chip)(({ status, theme }) => {
  const colors = {
    'Active': {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.success.dark,
    },
    'In Development': {
      backgroundColor: theme.palette.warning.light,
      color: theme.palette.warning.dark,
    },
    'Completed': {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.info.dark,
    },
  };
  
  return {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1,
    ...colors[status] || {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.grey[700],
    },
  };
});

const TechChip = styled(Chip)(({ tech, theme }) => {
  const colors = {
    'React': { backgroundColor: '#e3f2fd', color: '#1976d2' },
    'Spring Boot': { backgroundColor: '#e8f5e8', color: '#388e3c' },
    'MySQL': { backgroundColor: '#fff3e0', color: '#f57c00' },
    'PostgreSQL': { backgroundColor: '#e3f2fd', color: '#1976d2' },
    'MongoDB': { backgroundColor: '#e8f5e8', color: '#388e3c' },
    'Docker': { backgroundColor: '#e3f2fd', color: '#1976d2' },
    'AWS': { backgroundColor: '#fff3e0', color: '#f57c00' },
    'Node.js': { backgroundColor: '#e8f5e8', color: '#388e3c' },
    'Express': { backgroundColor: '#f5f5f5', color: '#616161' },
    'Redis': { backgroundColor: '#ffebee', color: '#d32f2f' },
    'Kubernetes': { backgroundColor: '#e3f2fd', color: '#1976d2' },
    'Stripe API': { backgroundColor: '#f3e5f5', color: '#7b1fa2' },
  };
  
  return {
    margin: theme.spacing(0.5),
    fontSize: '0.75rem',
    height: '24px',
    ...colors[tech] || {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.grey[700],
    },
  };
});

const Projects = () => {
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

  return (
    <Box 
      component="section" 
      id="projects" 
      sx={{ 
        py: 10,
        backgroundColor: 'background.default',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl">
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
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { xs: '2.5rem', sm: '3rem', lg: '3.5rem' },
                }}
              >
                My{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  Projects
                </Box>
              </Typography>
              <Divider
                sx={{
                  width: 96,
                  height: 4,
                  backgroundColor: 'primary.main',
                  mx: 'auto',
                  mb: 3,
                  borderRadius: 2,
                }}
              />
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
              >
                Here are some of the projects I've worked on, showcasing my skills and experience in various technologies.
              </Typography>
            </Box>
          </motion.div>

          {/* Projects Grid */}
          <Grid container spacing={4}>
            {projects.map((project) => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <StyledCard
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Project Image */}
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component={motion.img}
                        image={project.image}
                        alt={project.title}
                        sx={{ height: 200 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <StatusChip
                        status={project.status}
                        label={project.status}
                        size="small"
                      />
                    </Box>

                    {/* Project Content */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                        {project.title}
                      </Typography>

                      {/* Project Meta */}
                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Person fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {project.role}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <CalendarToday fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {project.duration}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Project Description */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        sx={{ lineHeight: 1.6 }}
                      >
                        {project.description}
                      </Typography>

                      {/* Tech Stack */}
                      <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                          Tech Stack:
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={0.5}>
                          {project.techStack.map((tech, index) => (
                            <TechChip
                              key={index}
                              tech={tech}
                              label={tech}
                              size="small"
                              component={motion.div}
                              whileHover={{ scale: 1.05 }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </CardContent>

                    {/* Action Buttons */}
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        variant="outlined"
                        startIcon={<GitHub />}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ flex: 1 }}
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
                        sx={{ flex: 1 }}
                        component={motion.a}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Live Demo
                      </Button>
                    </CardActions>
                  </Card>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          {/* Projects Summary */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={2}
              sx={{
                mt: 8,
                p: 4,
                textAlign: 'center',
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.primary.main}20)`,
                borderRadius: 3,
              }}
            >
              <Typography variant="h4" component="h3" fontWeight="bold" gutterBottom>
                Want to See More?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{ maxWidth: '600px', mx: 'auto', mb: 3 }}
              >
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
                sx={{ px: 4, py: 1.5 }}
                component={motion.a}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects
              </Button>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Projects;