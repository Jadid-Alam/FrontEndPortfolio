import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import WorkIcon from '@mui/icons-material/Work';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const ExperienceSection = ({ experience, darkMode, index }) => {
  const { title, company, paragraphs, alignment } = experience;
  const theme = useTheme();
  const isLeft = alignment === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    >
      <Card
        elevation={0}
        sx={{
          mb: 3,
          p: 0,
          background: darkMode
            ? 'rgba(42, 71, 89, 0.5)'
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${darkMode ? 'rgba(238, 238, 238, 0.08)' : 'rgba(42, 71, 89, 0.06)'}`,
          borderRadius: 3,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: darkMode
              ? '0 20px 40px rgba(223, 128, 87, 0.1)'
              : '0 20px 40px rgba(0, 0, 0, 0.08)',
            borderColor: darkMode ? 'rgba(223, 128, 87, 0.3)' : 'rgba(223, 128, 87, 0.2)',
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                border: `1px solid ${theme.palette.primary.main}30`,
              }}
            >
              <WorkIcon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  color: theme.palette.text.primary,
                  lineHeight: 1.3,
                }}
              >
                {title}
              </Typography>
              <Chip
                label={company}
                size="small"
                sx={{
                  mt: 0.5,
                  height: 24,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
                  color: theme.palette.primary.light,
                  border: 'none',
                }}
              />
            </Box>
          </Box>

          {paragraphs.map((paragraph) => (
            <Typography
              key={paragraph.id}
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mb: 1.5,
                lineHeight: 1.7,
                fontSize: { xs: '0.85rem', md: '0.9rem' },
                '&:last-child': { mb: 0 },
              }}
            >
              {paragraph.content}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceSection;