import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import ProjectButton from '../Components/ProjectButton';

const Projects = ({ darkMode }) => {
  const theme = useTheme();
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('portfolio_admin_projects');
    if (stored) {
      setProjectsData(JSON.parse(stored));
    } else {
      fetch('/data/projects.json')
        .then((r) => r.json())
        .then(setProjectsData);
    }
  }, []);

  if (!projectsData.length) return null;

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 4, md: 8 }, pb: 8 }}>
      <Container maxWidth="lg">
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
            Projects
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, mb: 5, fontSize: '1rem' }}
          >
            A selection of things I've built. Click any card to see more details.
          </Typography>
        </motion.div>

        <Box sx={{ mb: 4 }}>
          <ProjectButton project={projectsData[0]} darkMode={darkMode} index={0} />
        </Box>

        <Grid container spacing={3}>
          {projectsData.slice(1).map((project, index) => (
            <Grid item xs={12} md={6} key={project.id}>
              <ProjectButton project={project} darkMode={darkMode} index={index + 1} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
