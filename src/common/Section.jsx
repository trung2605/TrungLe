import React from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Section = ({
  children,
  id,
  backgroundColor = 'transparent',
  padding = 'large', // 'small', 'medium', 'large', 'xlarge'
  maxWidth = 'lg',
  fullHeight = false,
  centered = false,
  gradient = false,
  gradientDirection = '135deg',
  pattern = false,
  animate = true,
  animationDelay = 0,
  ...props
}) => {
  const theme = useTheme();

  const getPadding = () => {
    const paddingMap = {
      small: { xs: 4, md: 6 },
      medium: { xs: 6, md: 8 },
      large: { xs: 8, md: 12 },
      xlarge: { xs: 12, md: 16 },
    };
    return paddingMap[padding] || paddingMap.large;
  };

  const getBackground = () => {
    if (gradient) {
      const primaryColor = theme.palette.primary.main;
      const secondaryColor = theme.palette.secondary.main;
      return `linear-gradient(${gradientDirection}, ${primaryColor}15, ${secondaryColor}15)`;
    }
    
    if (backgroundColor === 'alternate') {
      return theme.palette.mode === 'dark' 
        ? theme.palette.grey[900] 
        : theme.palette.grey[50];
    }
    
    return backgroundColor;
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: animationDelay,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <MotionBox
      component="section"
      id={id}
      variants={animate ? sectionVariants : undefined}
      initial={animate ? 'hidden' : undefined}
      whileInView={animate ? 'visible' : undefined}
      viewport={{ once: true, margin: '-100px' }}
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: fullHeight ? '100vh' : 'auto',
        background: getBackground(),
        py: getPadding(),
        overflow: 'hidden',
        display: centered ? 'flex' : 'block',
        alignItems: centered ? 'center' : 'stretch',
        justifyContent: centered ? 'center' : 'stretch',
        ...props.sx,
      }}
      {...props}
    >
      {/* Background Pattern */}
      {pattern && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage: `
              radial-gradient(circle at 1px 1px, ${theme.palette.primary.main} 1px, transparent 0)
            `,
            backgroundSize: '20px 20px',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content Container */}
      <Container
        maxWidth={maxWidth}
        sx={{
          height: fullHeight ? '100%' : 'auto',
          display: centered ? 'flex' : 'block',
          alignItems: centered ? 'center' : 'stretch',
          justifyContent: centered ? 'center' : 'stretch',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Container>

      {/* Decorative Elements */}
      {gradient && (
        <>
          {/* Top Gradient Orb */}
          <Box
            sx={{
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '60%',
              height: '120%',
              background: `radial-gradient(circle, ${theme.palette.primary.main}08 0%, transparent 50%)`,
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          
          {/* Bottom Gradient Orb */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '-50%',
              left: '-20%',
              width: '60%',
              height: '120%',
              background: `radial-gradient(circle, ${theme.palette.secondary.main}08 0%, transparent 50%)`,
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        </>
      )}
    </MotionBox>
  );
};

export default Section;