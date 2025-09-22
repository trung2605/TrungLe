import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Divider,
  useTheme,
  Stack,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  ArrowUpward as ArrowUpIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { analyticsService } from '../services';

const MotionBox = motion(Box);

const Footer = () => {
  const theme = useTheme();
  const { user } = useApp();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <GitHubIcon />,
      url: user?.social?.github || '#',
      color: '#333',
    },
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon />,
      url: user?.social?.linkedin || '#',
      color: '#0077B5',
    },
    {
      name: 'Twitter',
      icon: <TwitterIcon />,
      url: user?.social?.twitter || '#',
      color: '#1DA1F2',
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      url: user?.social?.facebook || '#',
      color: '#4267B2',
    },
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const contactInfo = [
    {
      icon: <EmailIcon />,
      label: 'Email',
      value: user?.email || 'letritrung@example.com',
      href: `mailto:${user?.email || 'letritrung@example.com'}`,
    },
    {
      icon: <PhoneIcon />,
      label: 'Phone',
      value: user?.phone || '+84 123 456 789',
      href: `tel:${user?.phone || '+84123456789'}`,
    },
    {
      icon: <LocationIcon />,
      label: 'Location',
      value: user?.location || 'Ho Chi Minh City, Vietnam',
      href: '#',
    },
  ];

  const handleLinkClick = (url, label) => {
    analyticsService.trackInteraction('footer_link_click', 'Footer', label);
    
    if (url.startsWith('#')) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (url.startsWith('mailto:') || url.startsWith('tel:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    analyticsService.trackInteraction('scroll_to_top', 'Footer', 'Back to Top');
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <MotionBox
      component="footer"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      sx={{
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.grey[900] 
          : theme.palette.grey[100],
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.02,
          backgroundImage: `
            linear-gradient(45deg, ${theme.palette.primary.main} 25%, transparent 25%), 
            linear-gradient(-45deg, ${theme.palette.primary.main} 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, ${theme.palette.primary.main} 75%), 
            linear-gradient(-45deg, transparent 75%, ${theme.palette.primary.main} 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main Footer Content */}
        <Box sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* About Section */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {user?.name || 'Lê Trí Trung'}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3, lineHeight: 1.6 }}
                >
                  {user?.bio || 'Passionate software developer creating innovative solutions with modern technologies.'}
                </Typography>

                {/* Social Links */}
                <Stack direction="row" spacing={1}>
                  {socialLinks.map((social) => (
                    <IconButton
                      key={social.name}
                      onClick={() => handleLinkClick(social.url, social.name)}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': {
                          color: social.color,
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={2}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  Quick Links
                </Typography>
                <Stack spacing={1}>
                  {quickLinks.map((link) => (
                    <Link
                      key={link.label}
                      component="button"
                      variant="body2"
                      onClick={() => handleLinkClick(link.href, link.label)}
                      sx={{
                        textAlign: 'left',
                        color: 'text.secondary',
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline',
                        },
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  Contact Info
                </Typography>
                <Stack spacing={2}>
                  {contactInfo.map((contact) => (
                    <Box
                      key={contact.label}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        cursor: contact.href !== '#' ? 'pointer' : 'default',
                        '&:hover': contact.href !== '#' && {
                          color: 'primary.main',
                        },
                        transition: 'color 0.3s ease',
                      }}
                      onClick={() => contact.href !== '#' && handleLinkClick(contact.href, contact.label)}
                    >
                      <Box
                        sx={{
                          color: 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {contact.icon}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {contact.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Back to Top */}
            <Grid item xs={12} md={3}>
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-end' },
                    height: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    Let's Connect
                  </Typography>
                  
                  <IconButton
                    onClick={handleScrollToTop}
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                        transform: 'translateY(-4px)',
                      },
                      transition: 'all 0.3s ease',
                      mt: 2,
                    }}
                  >
                    <ArrowUpIcon />
                  </IconButton>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Footer Bottom */}
        <Divider sx={{ mb: 3 }} />
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              pb: 3,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} {user?.name || 'Lê Trí Trung'}. All rights reserved.
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              Built with ❤️ using React & Material-UI
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </MotionBox>
  );
};

export default Footer;