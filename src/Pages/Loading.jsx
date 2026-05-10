import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';

const Loading = ({ darkMode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 1800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: darkMode ? '#1E3340' : '#EEEEEE',
        zIndex: 9999,
      }}
    >
      {/* Outer ring pulse */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.8, 2.2],
          opacity: [0, 0.3, 0],
        }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          width: 80,
          height: 80,
          borderRadius: 16,
          background: 'linear-gradient(135deg, #DF8057, #3B637C)',
        }}
      />

      {/* Logo box */}
      <motion.div
        initial={{ scale: 0, rotateZ: -180 }}
        animate={{ scale: 1, rotateZ: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          duration: 0.8,
        }}
        style={{
          width: 72,
          height: 72,
          borderRadius: 16,
          background: 'linear-gradient(135deg, #DF8057, #3B637C)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(223, 128, 87, 0.4)',
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{
            color: '#ffffff',
            fontSize: '2rem',
            fontWeight: 900,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.02em',
          }}
        >
          J
        </motion.span>
      </motion.div>
    </Box>
  );
};

export default Loading;
