import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  EmojiEvents as TrophyIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';

const MotionCard = motion(Card);

const AchievementCard = ({
  achievement,
  type = 'prize', // 'prize', 'certificate', 'activity'
  variant = 'standard',
  showActions = true,
  ...props
}) => {
  const {
    title,
    issuer,
    organizer,
    event,
    date,
    issueDate,
    expiryDate,
    rank,
    description,
    image,
    category,
    amount,
    credentialId,
    verificationUrl,
    achievements: subAchievements = [],
  } = achievement;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTypeConfig = () => {
    switch (type) {
      case 'certificate':
        return {
          color: 'success',
          icon: <TrophyIcon />,
          dateField: issueDate || date,
          organization: issuer || organizer,
        };
      case 'activity':
        return {
          color: 'info',
          icon: <TrophyIcon />,
          dateField: date,
          organization: organizer,
        };
      default: // prize
        return {
          color: 'warning',
          icon: <TrophyIcon />,
          dateField: date,
          organization: organizer || event,
        };
    }
  };

  const config = getTypeConfig();

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
      y: -4,
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
          boxShadow: (theme) => theme.shadows[8],
        },
        ...props.sx,
      }}
      {...props}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          {/* Achievement Icon/Image */}
          <Avatar
            src={image}
            sx={{
              width: 56,
              height: 56,
              backgroundColor: `${config.color}.main`,
            }}
          >
            {config.icon}
          </Avatar>

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            {/* Category */}
            {category && (
              <Chip
                label={category}
                size="small"
                color={config.color}
                variant="outlined"
                sx={{ mb: 1 }}
              />
            )}

            {/* Title */}
            <Typography
              variant={variant === 'compact' ? 'h6' : 'h5'}
              component="h3"
              sx={{
                fontWeight: 'bold',
                lineHeight: 1.2,
                mb: 0.5,
              }}
            >
              {title}
            </Typography>

            {/* Rank */}
            {rank && (
              <Chip
                label={rank}
                color="primary"
                size="small"
                sx={{
                  fontWeight: 'bold',
                  mb: 1,
                }}
              />
            )}
          </Box>

          {/* Amount/Prize Money */}
          {amount && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'success.main',
                fontWeight: 'bold',
              }}
            >
              <MoneyIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {amount}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Organization/Event */}
        {config.organization && (
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 'medium',
              color: 'primary.main',
              mb: 1,
            }}
          >
            {config.organization}
          </Typography>
        )}

        {/* Date and Location */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          {config.dateField && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {formatDate(config.dateField)}
              </Typography>
            </Box>
          )}

          {/* Expiry Date for Certificates */}
          {type === 'certificate' && expiryDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Expires: {formatDate(expiryDate)}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Description */}
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Typography>
        )}

        {/* Sub-achievements for Activities */}
        {type === 'activity' && subAchievements.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                mb: 1,
                color: 'text.primary',
              }}
            >
              Highlights
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              {subAchievements.slice(0, 3).map((item, index) => (
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
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        )}

        {/* Credential ID */}
        {credentialId && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Credential ID: {credentialId}
            </Typography>
          </Box>
        )}
      </CardContent>

      {/* Actions */}
      {showActions && verificationUrl && (
        <>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Button
              size="small"
              color="primary"
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 'medium' }}
            >
              Verify Credential
            </Button>
          </Box>
        </>
      )}

      {/* Decorative Corner */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderLeft: '20px solid transparent',
          borderTop: `20px solid`,
          borderTopColor: `${config.color}.main`,
          opacity: 0.1,
        }}
      />
    </MotionCard>
  );
};

export default AchievementCard;