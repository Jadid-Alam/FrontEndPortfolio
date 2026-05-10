import './App.css';
import { useMemo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from './theme';
import Loading from './Pages/Loading';
import Home from './Pages/Home';
import Scrabble from './Pages/Scrabble';
import Experience from './Pages/Experience';
import Projects from './Pages/Projects';
import ContactMe from './Pages/ContactMe';
import TradingDashboard from './Pages/TradingDashboard';
import TopPanel from './Components/TopPanel';
import FooterPanel from './Components/FooterPanel';
import BackgroundEffect from './Components/BackgroundEffect';

/* Layout wrapper that conditionally hides nav/footer on /dashboard */
const AppLayout = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <>
      {!isDashboard && (
        <TopPanel darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
      {!isDashboard && <BackgroundEffect darkMode={darkMode} />}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Loading darkMode={darkMode} />} />
          <Route path="/home" element={<Home darkMode={darkMode} />} />
          <Route path="/scrabble-minigame" element={<Scrabble darkMode={darkMode} />} />
          <Route path="/experience" element={<Experience darkMode={darkMode} />} />
          <Route path="/projects" element={<Projects darkMode={darkMode} />} />
          <Route path="/contact-me" element={<ContactMe darkMode={darkMode} />} />
          <Route path="/dashboard" element={<TradingDashboard />} />
        </Routes>
      </div>
      {!isDashboard && <FooterPanel darkMode={darkMode} />}
    </>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = sessionStorage.getItem('darkMode');
    return saved === null ? true : saved === 'true';
  });

  useEffect(() => {
    sessionStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const theme = useMemo(() => getTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppLayout darkMode={darkMode} setDarkMode={setDarkMode} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
