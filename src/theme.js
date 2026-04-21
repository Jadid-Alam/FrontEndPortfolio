import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'dark' ? {
      primary: { main: '#8b5cf6', light: '#a78bfa', dark: '#7c3aed' },
      secondary: { main: '#06b6d4', light: '#22d3ee', dark: '#0891b2' },
      background: {
        default: '#0a0e17',
        paper: '#111827',
      },
      text: {
        primary: '#f1f5f9',
        secondary: '#94a3b8',
      },
      divider: 'rgba(148, 163, 184, 0.12)',
    } : {
      primary: { main: '#7c3aed', light: '#a78bfa', dark: '#6d28d9' },
      secondary: { main: '#0891b2', light: '#06b6d4', dark: '#0e7490' },
      background: {
        default: '#f1f5f9',
        paper: '#ffffff',
      },
      text: {
        primary: '#0f172a',
        secondary: '#64748b',
      },
      divider: 'rgba(15, 23, 42, 0.08)',
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
