import React from 'react';
import { Card, CardContent, CardActions, CardMedia, Typography, Chip, Box } from '@mui/material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const ProjectCard = ({
  project,
  onClick,
  variant = 'standard',
  showActions = true,
  elevation = 2,
  ...props
}) => {
  const {
    title,
    description,
    technologies = [],
    image,
    category,
    featured = false,
    status,
  } = project;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
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
      elevation={elevation}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: (theme) => theme.shadows[8],
        },
        ...props.sx,
      }}
      onClick={onClick}
      {...props}
    >
      {/* Featured Badge */}
      {featured && (
        <Chip
          label="Featured"
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 1,
            fontWeight: 'bold',
          }}
        />
      )}

      {/* Status Badge */}
      {status && (
        <Chip
          label={status}
          color={status === 'Completed' ? 'success' : 'warning'}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 1,
          }}
        />
      )}

      {/* Project Image */}
      {image && (
        <CardMedia
          component="img"
          height={variant === 'compact' ? 120 : 200}
          image={image}
          alt={title}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        {/* Category */}
        {category && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
              mb: 1,
              fontWeight: 'medium',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {category}
          </Typography>
        )}

        {/* Title */}
        <Typography
          variant={variant === 'compact' ? 'h6' : 'h5'}
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            lineHeight: 1.2,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: variant === 'compact' ? 2 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>

        {/* Technologies */}
        {technologies.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
            {technologies.slice(0, variant === 'compact' ? 3 : 5).map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            ))}
            {technologies.length > (variant === 'compact' ? 3 : 5) && (
              <Chip
                label={`+${technologies.length - (variant === 'compact' ? 3 : 5)}`}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            )}
          </Box>
        )}
      </CardContent>

      {/* Actions */}
      {showActions && (
        <CardActions sx={{ px: 2, pb: 2 }}>
          {/* Action buttons would be passed as children or props */}
          {props.children}
        </CardActions>
      )}
    </MotionCard>
  );
};

export default ProjectCard;