import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const ProjectButton = ({ project, darkMode, index }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Card
        elevation={0}
        onClick={() => setExpanded(!expanded)}
        sx={{
          cursor: 'pointer',
          height: '100%',
          background: darkMode
            ? 'rgba(42, 71, 89, 0.5)'
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${darkMode ? 'rgba(238, 238, 238, 0.08)' : 'rgba(42, 71, 89, 0.06)'}`,
          borderRadius: 3,
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: darkMode
              ? '0 20px 40px rgba(223, 128, 87, 0.12)'
              : '0 20px 40px rgba(0, 0, 0, 0.08)',
            borderColor: darkMode ? 'rgba(223, 128, 87, 0.3)' : 'rgba(223, 128, 87, 0.2)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #DF8057, #3B637C)',
            opacity: expanded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          {/* Title row */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: theme.palette.text.primary,
                flex: 1,
                pr: 1,
              }}
            >
              {project.title}
            </Typography>
            <IconButton
              size="small"
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                color: theme.palette.text.secondary,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
            >
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Tech stack pills */}
          {project.images.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {project.images.map((img, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: darkMode ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.9)',
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.12)'}`,
                    transition: 'all 0.2s',
                    '&:hover': {
                      background: `${theme.palette.primary.main}15`,
                      borderColor: `${theme.palette.primary.main}40`,
                      transform: 'scale(1.15)',
                    },
                  }}
                >
                  <img src={img} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />
                </Box>
              ))}
            </Box>
          )}

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.7,
              fontSize: '0.85rem',
            }}
          >
            {project.description}
          </Typography>

          {!expanded && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 2,
                color: theme.palette.primary.main,
                fontWeight: 500,
                fontSize: '0.75rem',
              }}
            >
              Click to view details →
            </Typography>
          )}

          {/* Expandable Detail */}
          <Collapse in={expanded} timeout={400}>
            <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              {project.detailImage?.src && (
                <Box
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <img
                    src={project.detailImage.src}
                    alt={project.detailImage.alt}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  {project.detailImage.caption && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        p: 1,
                        color: theme.palette.text.secondary,
                        textAlign: 'center',
                        fontSize: '0.7rem',
                      }}
                    >
                      {project.detailImage.caption}
                    </Typography>
                  )}
                </Box>
              )}

              {project.paragraphs.map((paragraph, i) => (
                <Typography
                  key={i}
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 1.5,
                    lineHeight: 1.7,
                    fontSize: '0.85rem',
                    '&:last-child': { mb: 0 },
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectButton;