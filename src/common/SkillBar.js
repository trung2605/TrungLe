import React from 'react';
import { LinearProgress, Box, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const SkillBar = ({
  skill,
  showIcon = true,
  showLevel = true,
  showExperience = false,
  variant = 'standard',
  animated = true,
  ...props
}) => {
  const {
    name,
    level = 0,
    category,
    icon,
    color = '#1976d2',
    experience,
  } = skill;

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
        delay: 0.2,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <MotionBox
      variants={animated ? containerVariants : undefined}
      initial={animated ? 'hidden' : undefined}
      animate={animated ? 'visible' : undefined}
      sx={{
        width: '100%',
        mb: variant === 'compact' ? 2 : 3,
        ...props.sx,
      }}
      {...props}
    >
      {/* Skill Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Skill Icon */}
          {showIcon && icon && (
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              {icon.charAt(0).toUpperCase()}
            </Box>
          )}

          {/* Skill Name */}
          <Typography
            variant={variant === 'compact' ? 'body2' : 'body1'}
            sx={{
              fontWeight: 'medium',
              color: 'text.primary',
            }}
          >
            {name}
          </Typography>

          {/* Category Chip */}
          {category && variant !== 'compact' && (
            <Chip
              label={category}
              size="small"
              variant="outlined"
              sx={{
                height: 20,
                fontSize: '0.7rem',
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
          )}
        </Box>

        {/* Level Percentage */}
        {showLevel && (
          <Typography
            variant={variant === 'compact' ? 'caption' : 'body2'}
            sx={{
              fontWeight: 'bold',
              color: 'text.secondary',
              minWidth: 'auto',
            }}
          >
            {level}%
          </Typography>
        )}
      </Box>

      {/* Progress Bar Container */}
      <Box
        sx={{
          position: 'relative',
          height: variant === 'compact' ? 6 : 8,
          backgroundColor: 'grey.200',
          borderRadius: 4,
          overflow: 'hidden',
          mb: showExperience ? 1 : 0,
        }}
      >
        {/* Background Progress */}
        <LinearProgress
          variant="determinate"
          value={100}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'grey.200',
            },
          }}
        />

        {/* Animated Progress */}
        <MotionBox
          variants={animated ? progressVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          animate={animated ? 'visible' : undefined}
          sx={{
            position: 'absolute',
            height: '100%',
            backgroundColor: color,
            borderRadius: 4,
            background: `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`,
            boxShadow: `0 0 10px ${color}33`,
          }}
          style={!animated ? { width: `${level}%` } : undefined}
        />

        {/* Skill Level Indicator */}
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            width: 2,
            backgroundColor: 'grey.400',
            borderRadius: 1,
          }}
        />
      </Box>

      {/* Experience Information */}
      {showExperience && experience && (
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontStyle: 'italic',
          }}
        >
          {experience} experience
        </Typography>
      )}
    </MotionBox>
  );
};

export default SkillBar;