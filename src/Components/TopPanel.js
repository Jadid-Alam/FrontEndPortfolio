import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import DownloadIcon from '@mui/icons-material/Download';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const navLinks = [
  { label: 'Home', path: '/home' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: '1v1 Scrabble', path: '/scrabble-minigame' },
  { label: 'Contact', path: '/contact-me' },
];

const TopPanel = ({ darkMode, setDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Jadid-Alam-CV.pdf';
    link.download = 'Jadid-Alam-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: darkMode
            ? 'rgba(30, 51, 64, 0.8)'
            : 'rgba(238, 238, 238, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${darkMode ? 'rgba(148,163,184,0.08)' : 'rgba(15,23,42,0.06)'}`,
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 1200, mx: 'auto', width: '100%', px: { xs: 2, md: 3 } }}>
          {/* Logo */}
          <Typography
            component={Link}
            to="/home"
            variant="h6"
            sx={{
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              background: 'linear-gradient(135deg, #DF8057, #3B637C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
          >
            Jadid Alam
          </Typography>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: location.pathname === link.path
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    fontWeight: location.pathname === link.path ? 700 : 500,
                    fontSize: '0.9rem',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: location.pathname === link.path ? '60%' : '0%',
                      height: '2px',
                      background: 'linear-gradient(90deg, #DF8057, #3B637C)',
                      borderRadius: '1px',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '60%',
                    },
                    '&:hover': {
                      color: theme.palette.primary.main,
                      background: 'transparent',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}

              <Divider orientation="vertical" flexItem sx={{ mx: 1, opacity: 0.3 }} />

              <Button
                onClick={handleDownload}
                startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
                variant="outlined"
                size="small"
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  fontSize: '0.8rem',
                  px: 2,
                  '&:hover': {
                    background: `${theme.palette.primary.main}15`,
                    borderColor: theme.palette.primary.light,
                  },
                }}
              >
                Resume
              </Button>

              <IconButton
                onClick={() => setDarkMode((prev) => !prev)}
                sx={{
                  ml: 0.5,
                  color: theme.palette.text.secondary,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    transform: 'rotate(30deg)',
                  },
                }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => setDarkMode((prev) => !prev)}
                sx={{ color: theme.palette.text.secondary }}
              >
                {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ color: theme.palette.text.primary }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: theme.palette.background.paper,
            borderLeft: `1px solid ${darkMode ? 'rgba(238, 238, 238, 0.1)' : 'rgba(42, 71, 89, 0.06)'}`,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              mb: 3,
              background: 'linear-gradient(135deg, #DF8057, #3B637C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Jadid Alam
          </Typography>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.path} disablePadding>
              <ListItemButton
                component={Link}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
                selected={location.pathname === link.path}
                sx={{
                  px: 3,
                  py: 1.5,
                  '&.Mui-selected': {
                    background: `${theme.palette.primary.main}15`,
                    borderRight: `3px solid ${theme.palette.primary.main}`,
                  },
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === link.path ? 700 : 400,
                    color: location.pathname === link.path
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ px: 3, mt: 2 }}>
          <Button
            fullWidth
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
            variant="outlined"
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
            }}
          >
            Download Resume
          </Button>
        </Box>
      </Drawer>

      {/* Spacer for fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default TopPanel;
