import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const contactLinks = [
  {
    icon: EmailIcon,
    label: 'Email',
    value: 'jadid.alam.08@gmail.com',
    href: 'mailto:jadid.alam.08@gmail.com',
    hoverColor: '#EA4335',
  },
  {
    icon: GitHubIcon,
    label: 'GitHub',
    value: 'Jadid-Alam',
    href: 'https://github.com/Jadid-Alam?tab=repositories',
    hoverColor: '#f0f0f0',
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'Jadid Alam',
    href: 'https://www.linkedin.com/in/jadid-alam-b57a112a5/',
    hoverColor: '#0A66C2',
  },
  {
    icon: PhoneIcon,
    label: 'Phone',
    value: '+44 7491 277476',
    href: 'tel:+447491277476',
    hoverColor: '#22c55e',
  },
];

const ContactMe = ({ darkMode }) => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: { xs: 4, md: 0 } }}>
      <Container maxWidth="md">
        <Grid container spacing={6} alignItems="center">
          {/* Left side - heading */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  lineHeight: 1.2,
                  color: theme.palette.text.primary,
                  mb: 2,
                  letterSpacing: '-0.02em',
                }}
              >
                Interested in{' '}
                <Box component="span" className="gradient-text">
                  collaborating
                </Box>
                ?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary, lineHeight: 1.7 }}
              >
                Feel free to reach out through any of these channels. I'm always open to new opportunities and conversations.
              </Typography>
            </motion.div>
          </Grid>

          {/* Right side — contact cards */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {contactLinks.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <Grid item xs={6} key={contact.label}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <Card
                        component="a"
                        href={contact.href}
                        target={contact.label === 'Email' || contact.label === 'Phone' ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        elevation={0}
                        sx={{
                          textDecoration: 'none',
                          display: 'block',
                          background: darkMode
                            ? 'rgba(42, 71, 89, 0.5)'
                            : 'rgba(255, 255, 255, 0.7)',
                          backdropFilter: 'blur(20px)',
                          border: `1px solid ${darkMode ? 'rgba(238, 238, 238, 0.08)' : 'rgba(42, 71, 89, 0.06)'}`,
                          borderRadius: 3,
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'translateY(-6px)',
                            borderColor: contact.hoverColor + '60',
                            boxShadow: `0 20px 40px ${contact.hoverColor}15`,
                            '& .contact-icon': {
                              color: contact.hoverColor,
                              transform: 'scale(1.15)',
                            },
                          },
                        }}
                      >
                        <CardContent sx={{ p: { xs: 2, md: 3 }, textAlign: 'center' }}>
                          <Icon
                            className="contact-icon"
                            sx={{
                              fontSize: { xs: 32, md: 40 },
                              color: theme.palette.text.secondary,
                              mb: 1.5,
                              transition: 'all 0.3s ease',
                            }}
                          />
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.text.primary,
                              mb: 0.5,
                              fontSize: '0.85rem',
                            }}
                          >
                            {contact.label}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: '0.7rem',
                              wordBreak: 'break-all',
                            }}
                          >
                            {contact.value}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactMe;