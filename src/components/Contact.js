import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Send,
  Person,
  Edit,
} from '@mui/icons-material';
import { personalInfo } from '../data';

// Styled components
const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  height: '100%',
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: theme.palette.grey[900],
  }),
}));

const ContactListItem = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateX(8px)',
  },
}));

const ContactIcon = styled(Avatar)(({ color, theme }) => {
  const colors = {
    email: theme.palette.error.main,
    phone: theme.palette.success.main,
    location: theme.palette.info.main,
    facebook: theme.palette.primary.main,
  };

  return {
    backgroundColor: `${colors[color]}20`,
    color: colors[color],
    marginRight: theme.spacing(2),
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: `${colors[color]}30`,
    },
  };
});

const StatsBox = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}20)`,
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(4),
})); 

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Email,
      label: 'Email',
      value: personalInfo.contact.email,
      href: `mailto:${personalInfo.contact.email}`,
      color: 'email'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.contact.phone,
      href: `tel:${personalInfo.contact.phone}`,
      color: 'phone'
    },
    {
      icon: LocationOn,
      label: 'Location',
      value: personalInfo.contact.location,
      href: '#',
      color: 'location'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      value: personalInfo.contact.facebook,
      href: 'https://facebook.com/trung.le',
      color: 'facebook'
    }
  ];

  return (
    <Box
      id="contact"
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
                Get In{' '}
                <Box component="span" color="primary.main">
                  Touch
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
                I'm always open to discussing new opportunities, collaborations, or just having a friendly chat about technology and development.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={6}>
            {/* Contact Information */}
            <Grid item xs={12} lg={6}>
              <motion.div variants={itemVariants}>
                <Typography variant="h4" component="h3" fontWeight="bold" mb={4}>
                  Let's Connect
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  mb={4}
                  lineHeight={1.7}
                >
                  Whether you have a project in mind, want to discuss opportunities, or just want to say hello,
                  I'd love to hear from you. Feel free to reach out through any of the following channels.
                </Typography>

                <Box mb={4}>
                  {contactInfo.map((info, index) => (
                    <ContactListItem
                      key={index}
                      whileHover={{ x: 8 }}
                      component="a"
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      sx={{ textDecoration: 'none' }}
                    >
                      <ContactIcon color={info.color}>
                        <info.icon />
                      </ContactIcon>
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          sx={{ textTransform: 'uppercase', letterSpacing: 1 }}
                        >
                          {info.label}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          fontWeight="medium"
                          sx={{
                            '&:hover': {
                              color: 'primary.main',
                            },
                          }}
                        >
                          {info.value}
                        </Typography>
                      </Box>
                    </ContactListItem>
                  ))}
                </Box>

                {/* Quick Stats */}
                <motion.div variants={itemVariants}>
                  <StatsBox elevation={2}>
                    <Typography variant="h6" fontWeight="semibold" mb={2}>
                      Response Time
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box textAlign="center">
                          <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="primary.main"
                          >
                            &lt; 24h
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Email Response
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box textAlign="center">
                          <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="primary.main"
                          >
                            Always
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Open to Chat
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </StatsBox>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} lg={6}>
              <motion.div variants={itemVariants}>
                <ContactCard elevation={4}>
                  <Typography variant="h4" component="h3" fontWeight="bold" mb={4}>
                    Send a Message
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit} sx={{ '& > *': { mb: 3 } }}>
                    {/* Name Field */}
                    <StyledTextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <Person sx={{ color: 'text.secondary', mr: 1 }} />
                        ),
                      }}
                      placeholder="Enter your name"
                    />

                    {/* Email Field */}
                    <StyledTextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <Email sx={{ color: 'text.secondary', mr: 1 }} />
                        ),
                      }}
                      placeholder="Enter your email"
                    />

                    {/* Message Field */}
                    <StyledTextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      multiline
                      rows={4}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <Edit sx={{ color: 'text.secondary', mr: 1, alignSelf: 'flex-start', mt: 1 }} />
                        ),
                      }}
                      placeholder="Enter your message..."
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      component={motion.button}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      startIcon={
                        isSubmitting ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Send />
                        )
                      }
                      sx={{
                        py: 1.5,
                        boxShadow: 4,
                        '&:hover': {
                          boxShadow: 8,
                        },
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Alert severity="success" sx={{ mt: 2 }}>
                          ✅ Message sent successfully! I'll get back to you soon.
                        </Alert>
                      </motion.div>
                    )}
                  </Box>
                </ContactCard>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;