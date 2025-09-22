import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { School as SchoolIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';

const MotionCard = motion(Card);

const EducationCard = ({
  education,
  variant = 'standard',
  showAchievements = true,
  showLogo = true,
  ...props
}) => {
  const {
    institution,
    degree,
    field,
    startDate,
    endDate,
    grade,
    description,
    logo,
    location,
    achievements = [],
  } = education;

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <MotionCard
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: (theme) => theme.shadows[6],
        },
        ...props.sx,
      }}
      {...props}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Header with Logo and Institution */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          {showLogo && (
            <Avatar
              src={logo}
              sx={{
                width: 48,
                height: 48,
                backgroundColor: 'primary.main',
              }}
            >
              <SchoolIcon />
            </Avatar>
          )}

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            {/* Institution Name */}
            <Typography
              variant={variant === 'compact' ? 'h6' : 'h5'}
              component="h3"
              sx={{
                fontWeight: 'bold',
                lineHeight: 1.2,
                mb: 0.5,
              }}
            >
              {institution}
            </Typography>

            {/* Location */}
            {location && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: 'block',
                  mb: 1,
                  fontWeight: 'medium',
                }}
              >
                {location}
              </Typography>
            )}
          </Box>

          {/* Grade/GPA */}
          {grade && (
            <Chip
              label={grade}
              color="primary"
              variant="outlined"
              size="small"
              sx={{
                fontWeight: 'bold',
                minWidth: 60,
              }}
            />
          )}
        </Box>

        {/* Degree and Field */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'medium',
            color: 'primary.main',
            mb: 1,
          }}
        >
          {degree}
          {field && ` in ${field}`}
        </Typography>

        {/* Duration */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2,
            color: 'text.secondary',
          }}
        >
          <CalendarIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2">
            {formatDate(startDate)} - {formatDate(endDate)}
          </Typography>
        </Box>

        {/* Description */}
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        )}

        {/* Achievements */}
        {showAchievements && achievements.length > 0 && (
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                mb: 1,
                color: 'text.primary',
              }}
            >
              Key Achievements
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              {achievements.map((achievement, index) => (
                <Typography
                  key={index}
                  component="li"
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 0.5,
                    lineHeight: 1.5,
                  }}
                >
                  {achievement}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>

      {/* Decorative Border */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 4,
          height: '100%',
          background: (theme) =>
            `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        }}
      />
    </MotionCard>
  );
};

export default EducationCard;