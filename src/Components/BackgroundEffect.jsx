import Box from '@mui/material/Box';

const BackgroundEffect = ({ darkMode }) => {
  if (!darkMode) {
    return (
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <Box
          className="orb orb-1"
          sx={{ top: '-10%', right: '-5%', opacity: 0.2 }}
        />
        <Box
          className="orb orb-2"
          sx={{ bottom: '-10%', left: '-5%', opacity: 0.15 }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <Box className="orb orb-1" sx={{ top: '-15%', right: '-10%' }} />
      <Box className="orb orb-2" sx={{ bottom: '-10%', left: '-10%' }} />
      <Box className="orb orb-3" sx={{ top: '40%', left: '30%' }} />
    </Box>
  );
};

export default BackgroundEffect;
