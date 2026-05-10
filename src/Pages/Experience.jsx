import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import ExperienceSection from '../Components/ExperienceSection';

const Experience = ({ darkMode }) => {
  const theme = useTheme();
  const [experiencesData, setExperiencesData] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('portfolio_admin_experiences');
    if (stored) {
      setExperiencesData(JSON.parse(stored));
    } else {
      fetch('/data/experiences.json')
        .then((r) => r.json())
        .then(setExperiencesData);
    }
  }, []);

  if (!experiencesData.length) return null;

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 4, md: 8 }, pb: 8 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              color: theme.palette.text.primary,
              letterSpacing: '-0.02em',
            }}
          >
            Experience
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, mb: 5, fontSize: '1rem' }}
          >
            My professional journey and roles that shaped my career.
          </Typography>
        </motion.div>

        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 16, md: 20 },
              top: 0,
              bottom: 0,
              width: 2,
              background: `linear-gradient(180deg, ${theme.palette.primary.main}60, ${theme.palette.secondary.main}30, transparent)`,
              borderRadius: 1,
              display: { xs: 'none', md: 'block' },
            }}
          />
          <Box sx={{ pl: { xs: 0, md: 6 } }}>
            {experiencesData.map((experience, index) => (
              <ExperienceSection
                key={experience.id}
                experience={experience}
                darkMode={darkMode}
                index={index}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Experience;
