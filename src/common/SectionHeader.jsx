import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const SectionHeader = ({
  title,
  subtitle,
  description,
  centered = false,
  variant = 'standard',
  animationDelay = 0,
  children,
  ...props
}) => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: animationDelay,
      },
    },
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return {
          titleVariant: 'h2',
          subtitleVariant: 'h4',
          descriptionVariant: 'h6',
          spacing: 3,
          titleWeight: 'bold',
        };
      case 'large':
        return {
          titleVariant: 'h3',
          subtitleVariant: 'h5',
          descriptionVariant: 'body1',
          spacing: 2,
          titleWeight: 'bold',
        };
      case 'compact':
        return {
          titleVariant: 'h5',
          subtitleVariant: 'h6',
          descriptionVariant: 'body2',
          spacing: 1,
          titleWeight: 'medium',
        };
      default: // standard
        return {
          titleVariant: 'h4',
          subtitleVariant: 'h6',
          descriptionVariant: 'body1',
          spacing: 2,
          titleWeight: 'bold',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <MotionBox
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        textAlign: centered ? 'center' : 'left',
        mb: variant === 'hero' ? 6 : 4,
        position: 'relative',
        ...props.sx,
      }}
      {...props}
    >
      {/* Decorative Line */}
      {!centered && variant !== 'compact' && (
        <Box
          sx={{
            width: 60,
            height: 4,
            backgroundColor: 'primary.main',
            borderRadius: 2,
            mb: 2,
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          }}
        />
      )}

      {/* Subtitle (appears above title) */}
      {subtitle && (
        <Typography
          variant={styles.subtitleVariant}
          sx={{
            color: 'primary.main',
            fontWeight: 'medium',
            mb: 1,
            textTransform: variant === 'hero' ? 'none' : 'uppercase',
            letterSpacing: variant === 'hero' ? 'normal' : 1,
            fontSize: variant === 'hero' ? undefined : '0.875rem',
          }}
        >
          {subtitle}
        </Typography>
      )}

      {/* Main Title */}
      <Typography
        variant={styles.titleVariant}
        component="h2"
        sx={{
          fontWeight: styles.titleWeight,
          mb: styles.spacing,
          lineHeight: 1.2,
          color: 'text.primary',
          position: 'relative',
          ...(variant === 'hero' && {
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }),
        }}
      >
        {title}
      </Typography>

      {/* Description */}
      {description && (
        <Typography
          variant={styles.descriptionVariant}
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
            maxWidth: centered ? 800 : '100%',
            mx: centered ? 'auto' : 0,
            mb: children ? 2 : 0,
          }}
        >
          {description}
        </Typography>
      )}

      {/* Additional Content */}
      {children && (
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: centered ? 'center' : 'flex-start',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {children}
        </Box>
      )}

      {/* Background Decoration for Hero Variant */}
      {variant === 'hero' && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            background: `radial-gradient(circle, ${theme.palette.primary.main}08 0%, transparent 70%)`,
            zIndex: -1,
            borderRadius: '50%',
          }}
        />
      )}

      {/* Centered Decorative Line */}
      {centered && variant !== 'compact' && (
        <Box
          sx={{
            width: 80,
            height: 4,
            backgroundColor: 'primary.main',
            borderRadius: 2,
            mx: 'auto',
            mt: 2,
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          }}
        />
      )}
    </MotionBox>
  );
};

export default SectionHeader;