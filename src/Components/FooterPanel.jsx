import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const FooterPanel = ({ darkMode }) => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 3,
        textAlign: 'center',
        borderTop: `1px solid ${theme.palette.divider}`,
        background: darkMode ? 'rgba(30, 51, 64, 0.5)' : 'rgba(238, 238, 238, 0.5)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
        <IconButton
          component="a"
          href="https://github.com/Jadid-Alam?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: theme.palette.text.secondary,
            transition: 'all 0.3s',
            '&:hover': { color: theme.palette.primary.main, transform: 'translateY(-2px)' },
          }}
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/jadid-alam-b57a112a5/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: theme.palette.text.secondary,
            transition: 'all 0.3s',
            '&:hover': { color: '#0A66C2', transform: 'translateY(-2px)' },
          }}
        >
          <LinkedInIcon fontSize="small" />
        </IconButton>
        <IconButton
          component="a"
          href="mailto:jadid.alam.08@gmail.com"
          sx={{
            color: theme.palette.text.secondary,
            transition: 'all 0.3s',
            '&:hover': { color: '#EA4335', transform: 'translateY(-2px)' },
          }}
        >
          <EmailIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
          &copy; {new Date().getFullYear()} Jadid Alam. All rights reserved.
        </Typography>
        <IconButton
          component={Link}
          to="/dashboard"
          size="small"
          sx={{
            color: 'transparent',
            padding: '2px',
            '&:hover': {
              color: theme.palette.text.secondary,
              background: 'transparent',
            },
            transition: 'color 0.5s ease',
          }}
        >
          <BarChartIcon sx={{ fontSize: 14 }} />
        </IconButton>
        <IconButton
          component={Link}
          to="/admin"
          size="small"
          sx={{
            color: 'transparent',
            padding: '2px',
            '&:hover': {
              color: theme.palette.text.secondary,
              background: 'transparent',
            },
            transition: 'color 0.5s ease',
          }}
        >
          <BarChartIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FooterPanel;
