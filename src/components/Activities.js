import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Groups,
  CalendarToday,
  Handshake,
  Mic,
  MusicNote,
  DirectionsRun,
  TheaterComedy,
  Person,
} from '@mui/icons-material';
import { activities } from '../data';

// Styled components
const ActivityCard = styled(motion.div)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  border: `1px solid ${theme.palette.grey[200]}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[8],
    transform: 'translateY(-8px) scale(1.02)',
  },
  ...(theme.palette.mode === 'dark' && {
    border: `1px solid ${theme.palette.grey[700]}`,
  }),
}));

const ActivityIcon = styled(Avatar)(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.main}20`,
  color: theme.palette.primary.main,
  marginRight: theme.spacing(2),
  width: 48,
  height: 48,
}));

const StatCard = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
}));

const PhilosophyBox = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}20)`,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  marginTop: theme.spacing(8),
}));

const Activities = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const getActivityIcon = (title) => {
    if (title.includes('Innocode') || title.includes('ResFres')) return Groups;
    if (title.includes('Mic Home')) return Mic;
    if (title.includes('FUM')) return MusicNote;
    if (title.includes('Referee')) return DirectionsRun;
    if (title.includes('Ambassador')) return Person;
    if (title.includes('Acting')) return TheaterComedy;
    return Handshake;
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Completed':
        return 'info';
      default:
        return 'default';
    }
  };

  const getRoleColor = (role) => {
    if (role === 'Leader') return 'secondary.main';
    if (role === 'Core Member') return 'info.main';
    if (role === 'Ambassador') return 'success.main';
    return 'text.secondary';
  };

  return (
    <Box
      id="activities"
      component="section"
      sx={{
        py: 10,
        backgroundColor: 'grey.50',
        ...(theme => theme.palette.mode === 'dark' && {
          backgroundColor: 'grey.900',
        }),
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
                My{' '}
                <Box component="span" color="primary.main">
                  Activities
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
                Active participation in various clubs, organizations, and community initiatives that have shaped my leadership and interpersonal skills.
              </Typography>
            </Box>
          </motion.div>

          {/* Activities Grid */}
          <Grid container spacing={3} mb={8}>
            {activities.map((activity) => {
              const ActivityIconComponent = getActivityIcon(activity.title);
              const statusChipColor = getStatusChipColor(activity.status);
              const roleColor = getRoleColor(activity.role);

              return (
                <Grid item xs={12} md={6} lg={4} key={activity.id}>
                  <ActivityCard
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Activity Header */}
                    <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                      <Box display="flex" alignItems="center">
                        <ActivityIcon>
                          <ActivityIconComponent />
                        </ActivityIcon>
                        <Chip
                          label={activity.status}
                          color={statusChipColor}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      <Box display="flex" alignItems="center" color="text.secondary">
                        <CalendarToday sx={{ mr: 0.5, fontSize: '0.875rem' }} />
                        <Typography variant="caption">
                          {activity.duration}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Activity Title */}
                    <Typography
                      variant="h6"
                      component="h3"
                      fontWeight="bold"
                      mb={1}
                      color="text.primary"
                    >
                      {activity.title}
                    </Typography>

                    {/* Role and Organization */}
                    <Box mb={2}>
                      <Typography
                        variant="subtitle2"
                        fontWeight="semibold"
                        sx={{ color: roleColor, mb: 0.5 }}
                      >
                        {activity.role}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {activity.organization}
                      </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      lineHeight={1.6}
                    >
                      {activity.description}
                    </Typography>
                  </ActivityCard>
                </Grid>
              );
            })}
          </Grid>

          {/* Activities Summary */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={4} mb={8}>
              <Grid item xs={12} md={4}>
                <StatCard elevation={4}>
                  <Groups sx={{ color: 'primary.main', fontSize: '2rem', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="text.primary" mb={0.5}>
                    7+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Organizations
                  </Typography>
                </StatCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <StatCard elevation={4}>
                  <Handshake sx={{ color: 'success.main', fontSize: '2rem', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="text.primary" mb={0.5}>
                    4
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Roles
                  </Typography>
                </StatCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <StatCard elevation={4}>
                  <Mic sx={{ color: 'secondary.main', fontSize: '2rem', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="text.primary" mb={0.5}>
                    3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Leadership Positions
                  </Typography>
                </StatCard>
              </Grid>
            </Grid>
          </motion.div>

          {/* Leadership Philosophy */}
          <motion.div variants={itemVariants}>
            <PhilosophyBox elevation={2}>
              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <Groups sx={{ color: 'primary.main', mr: 2, fontSize: '2rem' }} />
                <Typography variant="h4" component="h3" fontWeight="bold">
                  Leadership & Community
                </Typography>
              </Box>
              <Typography
                variant="body1"
                color="text.secondary"
                maxWidth="md"
                mx="auto"
                lineHeight={1.7}
              >
                Through my involvement in various activities and organizations, I've developed strong leadership skills,
                learned the importance of teamwork, and discovered the joy of contributing to meaningful causes.
                Each experience has enriched my perspective and helped me grow both personally and professionally.
              </Typography>
            </PhilosophyBox>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Activities;