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
import { useCustomTheme } from '../../contexts/ThemeContext';
import { useApp } from '../../contexts/AppContext';
import { analyticsService } from '../../services';
import config from '../../config/appConfig';
import './Header.scss';

const MotionAppBar = motion(AppBar);
const MotionBox = motion(Box);

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleTheme, darkMode, currentTheme } = useCustomTheme();
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

  return (
    <div className={`header ${currentTheme === 'darkCoder' ? 'header--coder' : ''}`}>
      <MotionAppBar
        position="fixed"
        elevation={0}
        className={`header__appbar ${scrolled ? 'header__appbar--scrolled' : 'header__appbar--top'}`}
      >
        <Toolbar className="header__toolbar">
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(true)}
              className="header__mobile-menu-btn"
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo/Brand */}
          <Typography
            variant="h6"
            component="div"
            className="header__logo"
            onClick={() => handleNavigation('#home', 'Logo')}
          >
            {user?.name || 'Lê Trí Trung'}
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box className="header__nav">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  color="inherit"
                  onClick={() => handleNavigation(item.href, item.label)}
                  className="header__nav-item"
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
            className="header__theme-toggle"
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Profile Menu */}
          <IconButton
            onClick={handleProfileMenuOpen}
            className="header__profile-btn"
          >
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              className="header__avatar"
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
            className="header__mobile-drawer"
          >
            <MotionBox className="header__mobile-content">
              {/* Drawer Header */}
              <Box className="header__mobile-header">
                <Typography variant="h6" className="header__mobile-title">
                  {currentTheme === 'darkCoder' ? (
                    <span className="header__terminal-text">
                      <span className="header__prompt">$</span> menu --list
                    </span>
                  ) : (
                    'Menu'
                  )}
                </Typography>
                <IconButton 
                  onClick={() => setMobileMenuOpen(false)}
                  className="header__mobile-close"
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Navigation Items */}
              <List className="header__mobile-nav">
                {navigationItems.map((item) => (
                  <ListItem
                    key={item.id}
                    button
                    onClick={() => handleNavigation(item.href, item.label)}
                    className="header__mobile-nav-item"
                  >
                    <ListItemIcon className="header__mobile-nav-icon">
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={currentTheme === 'darkCoder' ? `./${item.label.toLowerCase()}` : item.label}
                      className="header__mobile-nav-text"
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
        className="header__profile-menu"
        PaperProps={{
          elevation: 3,
          className: `header__profile-menu-paper ${currentTheme === 'darkCoder' ? 'header__profile-menu-paper--coder' : ''}`,
        }}
      >
        <MenuItem onClick={handleDownloadCV} className="header__profile-menu-item">
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {currentTheme === 'darkCoder' ? 'wget cv.pdf' : 'Download CV'}
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={toggleTheme} className="header__profile-menu-item">
          <ListItemIcon>
            {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>
            {currentTheme === 'darkCoder' 
              ? (darkMode ? 'export THEME=light' : 'export THEME=dark')
              : (darkMode ? 'Light Mode' : 'Dark Mode')
            }
          </ListItemText>
        </MenuItem>
      </Menu>

      {/* Spacer for fixed header */}
      <Toolbar />
    </div>
  );
};

export default Header;