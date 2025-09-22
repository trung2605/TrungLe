import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { EmojiEvents, WorkspacePremium, Star, CalendarToday } from '@mui/icons-material';
import { prizes } from '../data';

// Styled components
const PrizeCard = styled(motion.div)(({ position, theme }) => {
  const getGradientColors = () => {
    if (position.includes('Winner') || position.includes('1st')) {
      return {
        background: `linear-gradient(135deg, ${theme.palette.warning.light}20, ${theme.palette.warning.main}20)`,
        border: `1px solid ${theme.palette.warning.light}`,
      };
    }
    if (position.includes('Runner-up') || position.includes('2nd')) {
      return {
        background: `linear-gradient(135deg, ${theme.palette.grey[300]}20, ${theme.palette.grey[400]}20)`,
        border: `1px solid ${theme.palette.grey[300]}`,
      };
    }
    if (position.includes('Finalist')) {
      return {
        background: `linear-gradient(135deg, ${theme.palette.warning.light}20, ${theme.palette.warning.main}20)`,
        border: `1px solid ${theme.palette.warning.light}`,
      };
    }
    return {
      background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}20)`,
      border: `1px solid ${theme.palette.primary.light}`,
    };
  };

  return {
    ...getGradientColors(),
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    boxShadow: theme.shadows[4],
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      boxShadow: theme.shadows[8],
      transform: 'translateY(-8px) scale(1.02)',
    },
  };
});

const StatCard = styled(Paper)(({ color, theme }) => {
  const colors = {
    gold: { bg: theme.palette.warning.light + '20', color: theme.palette.warning.main },
    silver: { bg: theme.palette.grey[300] + '20', color: theme.palette.grey[600] },
    bronze: { bg: '#ffb74d20', color: '#ff9800' },
    primary: { bg: theme.palette.primary.light + '20', color: theme.palette.primary.main },
  };

  return {
    textAlign: 'center',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    backgroundColor: colors[color]?.bg || colors.primary.bg,
    color: colors[color]?.color || colors.primary.color,
  };
});

const MotivationalBox = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}20)`,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  marginTop: theme.spacing(8),
}));

const Prizes = () => {
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

  const getPositionIcon = (position) => {
    if (position.includes('Winner') || position.includes('1st')) return EmojiEvents;
    if (position.includes('Runner-up') || position.includes('2nd')) return WorkspacePremium;
    if (position.includes('Finalist')) return Star;
    return EmojiEvents;
  };

  const getPositionColor = (position) => {
    if (position.includes('Winner') || position.includes('1st')) return 'warning.main';
    if (position.includes('Runner-up') || position.includes('2nd')) return 'grey.500';
    if (position.includes('Finalist')) return 'orange.main';
    return 'primary.main';
  };

  const getAchievementChipProps = (position) => {
    if (position.includes('Winner') || position.includes('1st')) {
      return { color: 'warning', label: 'Winner' };
    }
    if (position.includes('Runner-up') || position.includes('2nd')) {
      return { color: 'default', label: 'Runner-up' };
    }
    if (position.includes('Finalist')) {
      return { color: 'secondary', label: 'Finalist' };
    }
    return { color: 'primary', label: 'Achievement' };
  };

  return (
    <Box
      id="prizes"
      component="section"
      sx={{
        py: 10,
        backgroundColor: 'background.default',
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
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', lg: '3rem' },
                  color: 'text.primary',
                }}
              >
                Awards &{' '}
                <Box component="span" color="primary.main">
                  Prizes
                </Box>
              </Typography>
              <Box
                sx={{
                  width: 96,
                  height: 4,
                  backgroundColor: 'primary.main',
                  mx: 'auto',
                  mb: 3,
                }}
              />
              <Typography
                variant="h6"
                color="text.secondary"
                maxWidth="md"
                mx="auto"
              >
                Recognition and achievements earned through competitions, contests, and outstanding performance.
              </Typography>
            </Box>
          </motion.div>

          {/* Prizes Grid */}
          <Grid container spacing={4} mb={8}>
            {prizes.map((prize) => {
              const PositionIcon = getPositionIcon(prize.position);
              const positionColor = getPositionColor(prize.position);
              const chipProps = getAchievementChipProps(prize.position);

              return (
                <Grid item xs={12} md={6} key={prize.id}>
                  <PrizeCard
                    position={prize.position}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Prize Header */}
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                      <Box flex={1}>
                        <Typography
                          variant="h6"
                          component="h3"
                          fontWeight="bold"
                          mb={1}
                          color="text.primary"
                        >
                          {prize.title}
                        </Typography>
                        <Box display="flex" alignItems="center" mb={1}>
                          <PositionIcon sx={{ color: positionColor, mr: 1 }} />
                          <Typography
                            variant="subtitle1"
                            fontWeight="semibold"
                            sx={{ color: positionColor }}
                          >
                            {prize.position}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {prize.organization}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" color="text.secondary">
                        <CalendarToday sx={{ mr: 0.5, fontSize: '1rem' }} />
                        <Typography variant="caption" fontWeight="medium">
                          {prize.year}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Prize Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      lineHeight={1.6}
                      mb={3}
                    >
                      {prize.description}
                    </Typography>

                    {/* Achievement Badge */}
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Chip
                        icon={<Star />}
                        label={chipProps.label}
                        color={chipProps.color}
                        size="small"
                        variant="outlined"
                      />
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <PositionIcon sx={{ color: positionColor, fontSize: '2rem' }} />
                      </motion.div>
                    </Box>
                  </PrizeCard>
                </Grid>
              );
            })}
          </Grid>

          {/* Achievement Stats */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={3} mb={8}>
              <Grid item xs={6} md={3}>
                <StatCard color="gold" elevation={2}>
                  <EmojiEvents sx={{ fontSize: '2rem', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="text.primary">
                    1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Winner
                  </Typography>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard color="silver" elevation={2}>
                  <WorkspacePremium sx={{ fontSize: '2rem', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="text.primary">
                    1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Runner-up
                  </Typography>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard color="bronze" elevation={2}>
                  <Star sx={{ fontSize: '2rem', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="text.primary">
                    2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Finalist
                  </Typography>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard color="primary" elevation={2}>
                  <EmojiEvents sx={{ fontSize: '2rem', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="text.primary">
                    4
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Awards
                  </Typography>
                </StatCard>
              </Grid>
            </Grid>
          </motion.div>

          {/* Motivational Quote */}
          <motion.div variants={itemVariants}>
            <MotivationalBox elevation={2}>
              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <EmojiEvents sx={{ color: 'primary.main', mr: 2, fontSize: '2rem' }} />
                <Typography variant="h4" component="h3" fontWeight="bold">
                  Striving for Excellence
                </Typography>
              </Box>
              <Typography
                variant="body1"
                color="text.secondary"
                maxWidth="md"
                mx="auto"
                lineHeight={1.7}
                fontStyle="italic"
              >
                "Success is not final, failure is not fatal: it is the courage to continue that counts.
                Each competition and challenge has been a stepping stone toward becoming a better developer and leader."
              </Typography>
            </MotivationalBox>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Prizes;