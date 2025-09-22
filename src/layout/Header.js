import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  EmojiEvents as PrizesIcon,
  LocalActivity as ActivityIcon,
  Email as ContactIcon,
  Code as SkillsIcon,
  GetApp as DownloadIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomTheme } from '../contexts/ThemeContext';
import { useApp } from '../contexts/AppContext';
import { analyticsService } from '../services';
import config from '../config/appConfig';

const MotionAppBar = motion(AppBar);
const MotionBox = motion(Box);

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleTheme, darkMode } = useCustomTheme();
  const { user } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = config.navigation.sections.map((section) => {
    const iconMap = {
      home: <HomeIcon />,
      about: <PersonIcon />,
      education: <SchoolIcon />,
      skills: <SkillsIcon />,
      projects: <WorkIcon />,
      certificates: <SchoolIcon />,
      prizes: <PrizesIcon />,
      activities: <ActivityIcon />,
      contact: <ContactIcon />,
    };

    return {
      ...section,
      icon: iconMap[section.id] || <HomeIcon />,
    };
  });

  const handleNavigation = (href, label) => {
    if (href.startsWith('#')) {
      // Smooth scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // External navigation
      window.open(href, '_blank', 'noopener,noreferrer');
    }

    // Track navigation
    analyticsService.trackInteraction('navigation_click', 'Header', label);
    
    // Close mobile menu
    setMobileMenuOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleDownloadCV = () => {
    // Track download
    analyticsService.trackDownload('Le_Tri_Trung_CV.pdf', 'pdf');
    
    // Download logic (you would implement actual download here)
    console.log('Downloading CV...');
    handleProfileMenuClose();
  };

  const appBarVariants = {
    scrolled: {
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(18, 18, 18, 0.95)' 
        : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: theme.shadows[4],
    },
    top: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  };

  const mobileMenuVariants = {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      <MotionAppBar
        position="fixed"
        elevation={0}
        variants={appBarVariants}
        animate={scrolled ? 'scrolled' : 'top'}
        transition={{ duration: 0.3 }}
        sx={{
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo/Brand */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              cursor: 'pointer',
            }}
            onClick={() => handleNavigation('#home', 'Logo')}
          >
            {user?.name || 'Lê Trí Trung'}
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  color="inherit"
                  onClick={() => handleNavigation(item.href, item.label)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'medium',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Theme Toggle */}
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            sx={{ ml: 1 }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Profile Menu */}
          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{ ml: 1 }}
          >
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              sx={{ width: 32, height: 32 }}
            >
              {user?.name?.charAt(0) || 'L'}
            </Avatar>
          </IconButton>
        </Toolbar>
      </MotionAppBar>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Drawer
            anchor="left"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
          >
            <MotionBox
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              sx={{
                width: 280,
                height: '100%',
                backgroundColor: theme.palette.background.paper,
              }}
            >
              {/* Drawer Header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Menu
                </Typography>
                <IconButton onClick={() => setMobileMenuOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Navigation Items */}
              <List sx={{ pt: 0 }}>
                {navigationItems.map((item) => (
                  <ListItem
                    key={item.id}
                    button
                    onClick={() => handleNavigation(item.href, item.label)}
                    sx={{
                      py: 1.5,
                      px: 2,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: 'medium',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </MotionBox>
          </Drawer>
        )}
      </AnimatePresence>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={handleDownloadCV}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download CV</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={toggleTheme}>
          <ListItemIcon>
            {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </ListItemText>
        </MenuItem>
      </Menu>

      {/* Spacer for fixed header */}
      <Toolbar />
    </>
  );
};

export default Header;