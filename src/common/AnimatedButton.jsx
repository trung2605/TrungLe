import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);

const AnimatedButton = ({
  children,
  loading = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  iconOnly = false,
  tooltip,
  animationType = 'scale', // 'scale', 'bounce', 'pulse', 'slide'
  disabled = false,
  onClick,
  startIcon,
  endIcon,
  fullWidth = false,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const getAnimationVariants = () => {
    switch (animationType) {
      case 'bounce':
        return {
          hover: { scale: 1.05, y: -2 },
          tap: { scale: 0.95, y: 0 },
          clicked: {
            scale: [1, 1.1, 1],
            transition: { duration: 0.3, times: [0, 0.5, 1] },
          },
        };
      case 'pulse':
        return {
          hover: { scale: 1.05 },
          tap: { scale: 0.95 },
          clicked: {
            scale: [1, 1.2, 1],
            transition: { duration: 0.4, times: [0, 0.6, 1] },
          },
        };
      case 'slide':
        return {
          hover: { x: 4, scale: 1.02 },
          tap: { x: 0, scale: 0.98 },
          clicked: {
            x: [0, 8, 0],
            transition: { duration: 0.3, times: [0, 0.5, 1] },
          },
        };
      default: // scale
        return {
          hover: { scale: 1.05 },
          tap: { scale: 0.95 },
          clicked: {
            scale: [1, 1.1, 1],
            transition: { duration: 0.2, times: [0, 0.5, 1] },
          },
        };
    }
  };

  const variants = getAnimationVariants();

  const handleClick = async (event) => {
    if (disabled || loading) return;

    setIsClicked(true);
    
    if (onClick) {
      await onClick(event);
    }

    // Reset clicked state after animation
    setTimeout(() => setIsClicked(false), 300);
  };

  const buttonProps = {
    disabled: disabled || loading,
    onClick: handleClick,
    variant,
    color,
    size,
    fullWidth,
    ...props,
    sx: {
      position: 'relative',
      overflow: 'hidden',
      ...(props.sx || {}),
    },
  };

  const ButtonComponent = iconOnly ? MotionIconButton : MotionButton;

  const buttonContent = (
    <ButtonComponent
      variants={variants}
      whileHover={!disabled && !loading ? 'hover' : undefined}
      whileTap={!disabled && !loading ? 'tap' : undefined}
      animate={isClicked ? 'clicked' : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...buttonProps}
    >
      {/* Loading Overlay */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 1,
          }}
        >
          <CircularProgress
            size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
            color="inherit"
          />
        </Box>
      )}

      {/* Button Content */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          opacity: loading ? 0.3 : 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        {startIcon}
        {children}
        {endIcon}
      </Box>

      {/* Ripple Effect */}
      {!iconOnly && !loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            opacity: 0,
            transform: 'scale(0)',
            transition: 'all 0.3s ease',
            pointerEvents: 'none',
            ...(isClicked && {
              opacity: 1,
              transform: 'scale(1)',
              transition: 'all 0.6s ease',
            }),
          }}
        />
      )}
    </ButtonComponent>
  );

  // Wrap with tooltip if provided
  if (tooltip) {
    return (
      <Tooltip title={tooltip} arrow>
        <span>{buttonContent}</span>
      </Tooltip>
    );
  }

  return buttonContent;
};

export default AnimatedButton;