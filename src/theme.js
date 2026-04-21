import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'dark' ? {
      primary: { main: '#DF8057', light: '#F79B72', dark: '#B55D3A' },
      secondary: { main: '#DDDDDD', light: '#EEEEEE', dark: '#B0B0B0' },
      background: {
        default: '#1E3340',
        paper: '#2A4759',
      },
      text: {
        primary: '#EEEEEE',
        secondary: '#DDDDDD',
      },
      divider: 'rgba(238, 238, 238, 0.12)',
    } : {
      primary: { main: '#DF8057', light: '#F79B72', dark: '#B55D3A' },
      secondary: { main: '#2A4759', light: '#3B637C', dark: '#1E3340' },
      background: {
        default: '#EEEEEE',
        paper: '#DDDDDD',
      },
      text: {
        primary: '#2A4759',
        secondary: '#4A6B80',
      },
      divider: 'rgba(42, 71, 89, 0.08)',
    }),
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
