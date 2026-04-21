import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import myImage from '../images/LeetcodeProfile.png';

const techStack = [
  'React', 'TypeScript', 'Rust', 'C++', 'Python', 'Java',
  'JavaScript', 'Django', 'AWS', 'Node.js',
];

const Home = ({ darkMode }) => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* ════════════════════════════════════════════
          HERO SECTION
         ════════════════════════════════════════════ */}
      <Container maxWidth="md" sx={{ pt: { xs: 10, md: 18 }, pb: { xs: 8, md: 14 }, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' },
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 3,
              color: theme.palette.text.primary,
              letterSpacing: '-0.02em',
            }}
          >
            I am{' '}
            <Box
              component="span"
              className="gradient-text-animated"
              sx={{ fontWeight: 900 }}
            >
              Jadid Alam
            </Box>
            ,
            <br />
            a programmer pursuing a career in tech.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: '1rem', md: '1.15rem' },
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.7,
              mb: 4,
            }}
          >
            Full-stack developer building high-performance systems in Rust, C++, and React.
            Currently studying Computer Science at Queen Mary University of London.
          </Typography>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 2 }}>
            {techStack.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.05 }}
              >
                <Chip
                  label={tech}
                  size="small"
                  sx={{
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    background: darkMode ? 'rgba(223, 128, 87, 0.1)' : 'rgba(223, 128, 87, 0.08)',
                    color: theme.palette.primary.light,
                    border: `1px solid ${darkMode ? 'rgba(223, 128, 87, 0.2)' : 'rgba(223, 128, 87, 0.15)'}`,
                    transition: 'all 0.2s',
                    '&:hover': {
                      background: `${theme.palette.primary.main}25`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}20`,
                    },
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>

      {/* ════════════════════════════════════════════
          ABOUT / MOTIVATION
         ════════════════════════════════════════════ */}
      <Container maxWidth="md" sx={{ pb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <Card
            elevation={0}
            sx={{
              background: darkMode ? 'rgba(42, 71, 89, 0.5)' : 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${darkMode ? 'rgba(238, 238, 238, 0.08)' : 'rgba(42, 71, 89, 0.06)'}`,
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary, lineHeight: 1.8, mb: 2, fontSize: '0.95rem' }}
              >
                What makes people feel content with their lives? Owning expensive cars? Living in a mansion? Neither.
                It's having a sense of purpose, goals to strive for!
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary, lineHeight: 1.8, fontSize: '0.95rem' }}
              >
                Therefore, I make it a priority to set clear goals for myself and organize my daily activities to achieve them.
                For instance, I often challenge myself using LeetCode to enhance my problem-solving skills and improve my understanding of coding.
              </Typography>
            </CardContent>

            {/* LeetCode image */}
            <Box
              component="a"
              href="https://leetcode.com/u/jadid-alam/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'block',
                borderTop: `1px solid ${theme.palette.divider}`,
                overflow: 'hidden',
                transition: 'opacity 0.3s',
                '&:hover': { opacity: 0.85 },
              }}
            >
              <img
                src={myImage}
                alt="LeetCode Profile"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                py: 1,
                color: theme.palette.text.secondary,
                fontSize: '0.7rem',
              }}
            >
              LeetCode Profile
            </Typography>
          </Card>
        </motion.div>
      </Container>

      {/* ════════════════════════════════════════════
          ACADEMIC HISTORY
         ════════════════════════════════════════════ */}
      <Container maxWidth="md" sx={{ pb: 12 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 4,
              color: theme.palette.text.primary,
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            Academic History
          </Typography>

          {/* Timeline items */}
          <Box sx={{ position: 'relative', pl: { xs: 3, md: 4 } }}>
            {/* Vertical line */}
            <Box
              sx={{
                position: 'absolute',
                left: { xs: 8, md: 12 },
                top: 8,
                bottom: 8,
                width: 2,
                background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: 1,
                opacity: 0.3,
              }}
            />

            {/* QMUL */}
            <Box sx={{ position: 'relative', mb: 4 }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: -19, md: -22 },
                  top: 6,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: `0 0 12px ${theme.palette.primary.main}40`,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary, fontSize: '1.05rem', mb: 0.5 }}>
                Queen Mary University of London
              </Typography>
              <Chip label="Computer Science" size="small" sx={{ mb: 1.5, background: `${theme.palette.primary.main}15`, color: theme.palette.primary.light, border: 'none', fontSize: '0.75rem' }} />
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.7 }}>
                Currently studying Computer Science, exploring programming languages, data structures, and honing my skills as a programmer.
                My passion for Computer Science began in secondary school, but I initially pursued Engineering due to not taking the subject at GCSE.
              </Typography>
            </Box>

            {/* Oxford */}
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: -19, md: -22 },
                  top: 6,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  boxShadow: `0 0 12px ${theme.palette.secondary.main}40`,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary, fontSize: '1.05rem', mb: 0.5 }}>
                University of Oxford
              </Typography>
              <Chip label="Engineering" size="small" sx={{ mb: 1.5, background: `${theme.palette.secondary.main}15`, color: theme.palette.secondary.light, border: 'none', fontSize: '0.75rem' }} />
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.7 }}>
                After a year studying Engineering, I realised my true interest lay in Computer Science, prompting my transfer to Queen Mary.
                Here, I am excited to deepen my technical knowledge and gain practical experience, particularly through an individual project in my final year.
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;
