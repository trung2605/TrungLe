import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Email as EmailIcon,
  PlayArrow as PlayIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useCustomTheme } from '../contexts/ThemeContext';
import { AnimatedButton } from '../common';
import { analyticsService } from '../services';
import Hero3DScene from './Hero3DScene';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useApp();
  const { darkMode } = useCustomTheme();
  
  const [titleIndex, setTitleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const titles = [
    'Software Developer',
    'React Specialist',
    'Full Stack Engineer',
    'Problem Solver',
  ];

  // Rotating titles effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [titles.length]);

  // Component visibility
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDownloadCV = () => {
    analyticsService.trackDownload('Le_Tri_Trung_CV.pdf', 'pdf');
    // Implement actual download logic here
    console.log('Downloading CV...');
  };

  const handleContactClick = () => {
    analyticsService.trackInteraction('contact_button_click', 'Hero', 'Contact Me');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSocialClick = (platform, url) => {
    analyticsService.trackInteraction('social_click', 'Hero', platform);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Box
      id="home"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: darkMode
          ? `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`
          : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
      }}
    >
      {/* 3D Background Scene */}
      {!isMobile && (
        <Hero3DScene darkMode={darkMode} />
      )}

      {/* Content Overlay */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          py: 8,
        }}
      >
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 8 },
            minHeight: { xs: 'auto', md: '80vh' },
          }}
        >
          {/* Left Content */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: 'center', md: 'left' },
              order: { xs: 2, md: 1 },
            }}
          >
            {/* Greeting */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'medium',
                  mb: 1,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                Hello, I'm
              </Typography>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  lineHeight: 1.1,
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {user?.name || 'Lê Trí Trung'}
              </Typography>
            </motion.div>

            {/* Animated Title */}
            <Box sx={{ height: 60, display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 'medium',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                I'm a{' '}
              </Typography>
              
              <Box sx={{ ml: 1, position: 'relative', minWidth: 200 }}>
                <Fade in={true} timeout={500} key={titleIndex}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 'bold',
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      position: 'absolute',
                      left: 0,
                      top: 0,
                    }}
                  >
                    {titles[titleIndex]}
                  </Typography>
                </Fade>
              </Box>
            </Box>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  lineHeight: 1.6,
                  maxWidth: 500,
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                {user?.bio || 'Passionate about creating innovative solutions with modern web technologies. I love turning ideas into reality through clean, efficient code.'}
              </Typography>
            </motion.div>

            {/* Skills Tags */}
            <motion.div variants={itemVariants}>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mb: 4,
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  gap: 1,
                }}
              >
                {['React', 'JavaScript', 'Node.js', 'Material-UI'].map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    variant="outlined"
                    color="primary"
                    sx={{
                      fontWeight: 'medium',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </Stack>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  mb: 4,
                }}
              >
                <AnimatedButton
                  variant="contained"
                  size="large"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadCV}
                  animationType="bounce"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                  }}
                >
                  Download CV
                </AnimatedButton>

                <AnimatedButton
                  variant="outlined"
                  size="large"
                  startIcon={<EmailIcon />}
                  onClick={handleContactClick}
                  animationType="slide"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                  }}
                >
                  Contact Me
                </AnimatedButton>
              </Stack>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <AnimatedButton
                  iconOnly
                  onClick={() => handleSocialClick('GitHub', user?.social?.github || '#')}
                  tooltip="GitHub"
                  animationType="scale"
                >
                  <GitHubIcon />
                </AnimatedButton>

                <AnimatedButton
                  iconOnly
                  onClick={() => handleSocialClick('LinkedIn', user?.social?.linkedin || '#')}
                  tooltip="LinkedIn"
                  animationType="scale"
                >
                  <LinkedInIcon />
                </AnimatedButton>
              </Stack>
            </motion.div>
          </Box>

          {/* Right Content - Avatar/Image */}
          <Box
            sx={{
              flex: { xs: 'none', md: 1 },
              display: 'flex',
              justifyContent: 'center',
              order: { xs: 1, md: 2 },
            }}
          >
            <motion.div variants={itemVariants}>
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                sx={{
                  width: { xs: 200, md: 300, lg: 350 },
                  height: { xs: 200, md: 300, lg: 350 },
                  border: `4px solid ${theme.palette.primary.main}`,
                  boxShadow: theme.shadows[8],
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  transition: 'transform 0.3s ease',
                }}
              >
                {user?.name?.charAt(0) || 'L'}
              </Avatar>
            </motion.div>
          </Box>
        </MotionBox>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
            },
            transition: 'color 0.3s ease',
          }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Typography variant="caption" sx={{ mb: 1 }}>
            Scroll Down
          </Typography>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <PlayIcon sx={{ transform: 'rotate(90deg)' }} />
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Hero;