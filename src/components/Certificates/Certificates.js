import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Avatar,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { WorkspacePremium, CalendarToday, EmojiEvents } from '@mui/icons-material';
import { certificates } from '../../data';
import './Certificates.scss';

// Styled components
const StyledCard = styled(motion.div)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease-in-out',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    boxShadow: theme.shadows[8],
    transform: 'translateY(-8px) scale(1.02)',
  },
}));

const CertificateImage = styled(CardMedia)(({ theme }) => ({
  height: 192,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
  },
}));

const CertificateIcon = styled(Avatar)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: `${theme.palette.background.paper}90`,
  backdropFilter: 'blur(10px)',
  zIndex: 1,
}));

const DateChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  backgroundColor: `${theme.palette.background.paper}90`,
  backdropFilter: 'blur(10px)',
  color: theme.palette.text.primary,
  zIndex: 1,
}));

const SummaryBox = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}20)`,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  marginTop: theme.spacing(8),
}));

const Certificates = () => {
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

  return (
    <Box
      id="certificates"
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
                  Certificates
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
                Professional certifications and achievements that validate my skills and commitment to continuous learning.
              </Typography>
            </Box>
          </motion.div>

          {/* Certificates Grid */}
          <Grid container spacing={4}>
            {certificates.map((cert) => (
              <Grid item xs={12} md={6} key={cert.id}>
                <StyledCard
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Certificate Image */}
                    <Box position="relative">
                      <CertificateImage
                        component={motion.div}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        image={cert.image}
                        title={cert.name}
                      />
                      <CertificateIcon>
                        <WorkspacePremium color="primary" />
                      </CertificateIcon>
                      <DateChip
                        icon={<CalendarToday />}
                        label={cert.year}
                        size="small"
                      />
                    </Box>

                    {/* Certificate Content */}
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography
                        variant="h6"
                        component="h3"
                        fontWeight="bold"
                        mb={1}
                        color="text.primary"
                      >
                        {cert.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary.main"
                        fontWeight="semibold"
                        mb={2}
                      >
                        {cert.issuer}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        lineHeight={1.6}
                      >
                        {cert.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          {/* Certificates Summary */}
          <motion.div variants={itemVariants}>
            <SummaryBox elevation={2}>
              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <EmojiEvents
                  sx={{ color: 'primary.main', mr: 2, fontSize: '2rem' }}
                />
                <Typography variant="h4" component="h3" fontWeight="bold">
                  Commitment to Excellence
                </Typography>
              </Box>
              <Typography
                variant="body1"
                color="text.secondary"
                maxWidth="md"
                mx="auto"
                lineHeight={1.7}
              >
                These certifications represent my dedication to professional development and mastery of
                essential skills. I continuously seek opportunities to validate and expand my knowledge
                through recognized programs and assessments.
              </Typography>
            </SummaryBox>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Certificates;