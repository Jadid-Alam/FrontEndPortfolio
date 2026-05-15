import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import { motion, useAnimation } from 'framer-motion';


const Scramble = ({ darkMode }) => {
  const theme = useTheme();
  const [rerender, SetRerender] = useState(true);
  useEffect(() => {}, [rerender]);

  const [page, setPage] = useState(0);
  const gameState = useRef(0);
  const guessInputAnim = useAnimation();
  const pointAddAnim = useAnimation();
  const pointAddAnim1 = useAnimation();
  const timerEndAnim = useAnimation();

  // backend connection and game logic
  const socketRef = useRef(null);
  const [available, setAvailable] = useState(String('0000'));
  const matchNames = ['Alpaca', 'Bridge', 'Clam', 'Dilly'];
  const matchLetters = ['a', 'b', 'c', 'd'];
  const inputRef = useRef(null);
  const [anagram, setAnagram] = useState('Anagram');
  const [myPts, setMyPts] = useState(0);
  const [oppPts, setOppPts] = useState(0);
  const [winner, setWinner] = useState(0);
  const reconnecting = useRef(0);
  const [maxMyPts, setMaxMyPts] = useState(0);
  const [maxOppPts, setMaxOppPts] = useState(0);

  const connectToMatch = () => {
    const ws = new WebSocket('wss://jadid-alam.com/ws');
    ws.onopen = () => {
      socketRef.current = ws;
      setPage(1);
    };

    ws.onmessage = (event) => {
      let s = '';
      if (event.data === 'ping') {
        sendMessage('pong');
      } else {
        s = event.data.toString().split(':');
        if (s[0] === 'a') {
          setAvailable(s[1]);
        } else if (s[0] === 's') {
          setAnagram(s[1]);
          StartGame();
        } else if (s[0] === 'w') {
          wrongGuess();
        } else if (s[0] === 'p') {
          setMaxMyPts(100 * parseInt(s[1], 10));
        } else if (s[0] === 'o') {
          const t = 100 * parseInt(s[1], 10);
          setMaxOppPts(t);
        } else if (s[0] === 'f') {
          if (s[1] === 'u') { setWinner(0); gameState.current = 5; }
          else if (s[1] === 'o') { setWinner(1); gameState.current = 5; }
          else if (s[1] === 'd') { setWinner(2); gameState.current = 5; }
          else if (s[1] === 'x') { gameState.current = 4; }
          SetRerender((r) => !r);
          setTimeout(() => resetGame(), 5000);
        }
      }
    };

    ws.onerror = (error) => console.error('WebSocket Error:', error);
    ws.onclose = () => {
      if (socketRef.current !== null) {
        const interval = setInterval(() => { resetGame(); }, 5000);
        return () => clearInterval(interval);
      } else if (reconnecting.current < 6) {
        reconnecting.current += 1;
        setTimeout(() => connectToMatch(), 1000);
      } else {
        resetGame();
      }
    };
  };

  const sendMessage = (d) => {
    if (!socketRef.current) return;
    if (socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(d.toLocaleLowerCase());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage('g:' + inputRef.current.value);
    inputRef.current.value = '';
  };

  useEffect(() => {
    if (myPts < maxMyPts) {
      const diff = maxMyPts - myPts;
      const interval = setInterval(() => {
        setMyPts((prev) => prev + 1);
        addPointsAnimation();
      }, 500 / diff);
      return () => clearInterval(interval);
    }
  }, [maxMyPts, myPts]);

  useEffect(() => {
    if (oppPts < maxOppPts) {
      const diff = 500 / (maxOppPts - oppPts);
      const interval = setInterval(() => {
        setOppPts((prev) => prev + 1);
        addPointsAnimation1();
      }, diff);
      return () => clearInterval(interval);
    }
  }, [maxOppPts, oppPts]);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
        if (seconds <= 5) startRedTimerAnimation();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  const WaitingRoom = (c) => {
    SetRerender(!rerender);
    sendMessage(c);
    gameState.current = 3;
  };

  const StartGame = () => {
    SetRerender(!rerender);
    gameState.current = 1;
    setSeconds(5);
    setTimeout(() => OngoingGame(), 5500);
  };

  const OngoingGame = () => {
    SetRerender(!rerender);
    gameState.current = 2;
    setSeconds(60);
  };

  useEffect(() => {
    if (page === 3) connectToMatch();
  }, [page]);

  useEffect(() => {
    let interval;
    if (page === 1 && gameState.current === 0) {
      interval = setInterval(() => { sendMessage('r'); }, 5000);
    }
    return () => clearInterval(interval);
  }, [page, gameState.current]);

  const resetGame = () => {
    gameState.current = 0;
    if (socketRef.current !== null) socketRef.current.close();
    socketRef.current = null;
    setPage(0);
    setAnagram('Anagram');
    setMyPts(0);
    setOppPts(0);
    setWinner(0);
    reconnecting.current = 0;
    window.location.reload();
  };

  // Animations
  const wrongGuess = () => {
    guessInputAnim.start({
      x: [0, -5, 5, -2, 2, 0],
      transition: { duration: 0.4 },
    });
  };

  const addPointsAnimation = () => {
    pointAddAnim.start({
      scale: [1, 1.15, 1],
      color: [theme.palette.text.primary, '#22c55e', theme.palette.text.primary],
      transition: { duration: 0.3 },
    });
  };

  const addPointsAnimation1 = () => {
    pointAddAnim1.start({
      scale: [1, 1.15, 1],
      color: [theme.palette.text.primary, '#ef4444', theme.palette.text.primary],
      transition: { duration: 0.3 },
    });
  };

  const startRedTimerAnimation = () => {
    timerEndAnim.start({
      scale: [1, 1.15, 1],
      color: [theme.palette.text.primary, '#ef4444', theme.palette.text.primary],
      transition: { duration: 0.8 },
    });
  };

  // ── Shared styles ──────────────────────────────
  const cardSx = {
    background: darkMode ? 'rgba(42, 71, 89, 0.7)' : 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    border: `1px solid ${darkMode ? 'rgba(238, 238, 238, 0.1)' : 'rgba(42, 71, 89, 0.08)'}`,
    borderRadius: 3,
  };

  const neonButtonSx = {
    background: 'linear-gradient(135deg, #DF8057, #3B637C)',
    color: '#fff',
    fontWeight: 700,
    fontSize: { xs: '1rem', md: '1.1rem' },
    py: 1.5,
    px: 4,
    borderRadius: 2,
    boxShadow: '0 4px 20px rgba(223, 128, 87, 0.3)',
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(223, 128, 87, 0.5)',
    },
  };

  // ── Score display component ──────────────────
  const ScoreDisplay = ({ label, pts, animCtrl, color }) => (
    <Box sx={{ textAlign: 'center', width: 80, flexShrink: 0 }}>
      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>
        {label}
      </Typography>
      <motion.div animate={animCtrl}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.text.primary, fontVariantNumeric: 'tabular-nums' }}>
          {pts}
        </Typography>
      </motion.div>
    </Box>
  );

  // ── Result display ──────────────────────────
  const GameResult = ({ message }) => (
    <Box sx={{ textAlign: 'center', py: 6 }}>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, color: theme.palette.text.primary }}>
        {message}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, mb: 4 }}>
        <ScoreDisplay label="You" pts={myPts} animCtrl={pointAddAnim} />
        <Typography variant="h4" sx={{ color: theme.palette.text.secondary, alignSelf: 'center' }}>—</Typography>
        <ScoreDisplay label="Foe" pts={oppPts} animCtrl={pointAddAnim1} />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 4, md: 6 }, pb: 8 }}>
      <Container maxWidth="md">
        <Card elevation={0} sx={{ ...cardSx, overflow: 'hidden', minHeight: { xs: '70vh', md: '75vh' } }}>
          <CardContent sx={{ p: { xs: 2, md: 4 }, height: '100%' }}>
            {/* ══════ GAME IN SESSION ══════ */}
            {page === 1 ? (
              <Box sx={{ height: '100%' }}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={resetGame}
                  size="small"
                  sx={{ color: theme.palette.text.secondary, mb: 2, '&:hover': { color: theme.palette.primary.main } }}
                >
                  Exit
                </Button>

                {/* Room Selection */}
                {gameState.current === 0 ? (
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.text.primary }}>
                      Choose a room:
                    </Typography>
                    <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {matchNames.map((serverName, index) => {
                        const isFull = available.charAt(index) === '2';
                        return (
                          <ListItem key={index} disablePadding>
                            <ListItemButton
                              disabled={isFull}
                              onClick={() => !isFull && WaitingRoom(matchLetters[index])}
                              sx={{
                                borderRadius: 2,
                                border: `1px solid ${darkMode ? 'rgba(223, 128, 87, 0.2)' : 'rgba(223, 128, 87, 0.15)'}`,
                                py: 2,
                                px: 3,
                                transition: 'all 0.2s',
                                '&:hover': {
                                  background: `${theme.palette.primary.main}15`,
                                  borderColor: theme.palette.primary.main,
                                  transform: 'translateX(4px)',
                                },
                                '&.Mui-disabled': { opacity: 0.4 },
                              }}
                            >
                              <ListItemText
                                primary={serverName}
                                primaryTypographyProps={{ fontWeight: 600, color: theme.palette.text.primary }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  color: isFull ? '#ef4444' : theme.palette.primary.main,
                                  fontWeight: 600,
                                }}
                              >
                                {available.charAt(index)}/2
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                ) : gameState.current === 1 ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                        Starting in
                      </Typography>
                      <Typography
                        variant="h1"
                        sx={{
                          fontWeight: 900,
                          fontSize: '5rem',
                          background: 'linear-gradient(135deg, #DF8057, #3B637C)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {seconds}
                      </Typography>
                    </Box>
                  </Box>
                ) : gameState.current === 2 ? (
                  /* ═══ ACTIVE GAME ═══ */
                  <Box>
                    <motion.div animate={timerEndAnim}>
                      <Typography variant="body2" sx={{ textAlign: 'center', color: theme.palette.text.secondary, mb: 2 }}>
                        Time remaining: <strong>{seconds}s</strong>
                      </Typography>
                    </motion.div>

                    {/* Timer progress bar */}
                    <Box sx={{ width: '100%', height: 4, borderRadius: 2, background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', mb: 3, overflow: 'hidden' }}>
                      <Box
                        sx={{
                          height: '100%',
                          borderRadius: 2,
                          width: `${(seconds / 60) * 100}%`,
                          background: seconds <= 10 ? '#ef4444' : 'linear-gradient(90deg, #DF8057, #3B637C)',
                          transition: 'width 1s linear, background 0.3s',
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: '80px 1fr 80px', gap: 1, mb: 3, alignItems: 'start' }}>
                      <ScoreDisplay label="You" pts={myPts} animCtrl={pointAddAnim} />
                      <Box sx={{ textAlign: 'center', minWidth: 0 }}>
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 900,
                            fontSize: { xs: '2rem', md: '3rem' },
                            letterSpacing: '0.1em',
                            background: 'linear-gradient(135deg, #DF8057, #FFB88C)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 3,
                          }}
                        >
                          {anagram}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                          <motion.div animate={guessInputAnim}>
                            <TextField
                              inputRef={inputRef}
                              onKeyDown={handleKeyDown}
                              variant="outlined"
                              placeholder="Type your guess..."
                              fullWidth
                              inputProps={{
                                maxLength: anagram.length,
                                minLength: 3,
                                style: {
                                  textAlign: 'center',
                                  fontWeight: 700,
                                  fontSize: '1.2rem',
                                  letterSpacing: '0.05em',
                                },
                              }}
                              sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  '& fieldset': { borderColor: `${theme.palette.primary.main}40` },
                                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                                },
                              }}
                            />
                          </motion.div>
                          <Button type="submit" fullWidth sx={neonButtonSx}>
                            Guess!
                          </Button>
                        </form>
                      </Box>
                      <ScoreDisplay label="Foe" pts={oppPts} animCtrl={pointAddAnim1} />
                    </Box>
                  </Box>
                ) : gameState.current === 3 ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <CircularProgress sx={{ color: theme.palette.primary.main, mb: 3 }} />
                      <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                        Waiting for opponent...
                      </Typography>
                    </Box>
                  </Box>
                ) : gameState.current === 4 ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: '#22c55e', mb: 2 }}>
                        Opponent disconnected!
                      </Typography>
                      <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                        You win by default!
                      </Typography>
                    </Box>
                  </Box>
                ) : gameState.current === 5 ? (
                  <Box>
                    {winner === 0 ? (
                      <Box className={seconds <= 0 ? 'celebration' : ''} sx={{ borderRadius: 3, p: 2 }}>
                        <GameResult message="🎉 You Win!" />
                      </Box>
                    ) : winner === 1 ? (
                      <GameResult message="Opponent Wins" />
                    ) : winner === 2 ? (
                      <GameResult message="It's a Draw!" />
                    ) : (
                      <Typography color="error">Error with game display</Typography>
                    )}
                  </Box>
                ) : (
                  <Typography color="error">Error with game display</Typography>
                )}
              </Box>
            ) : page === 2 ? (
              /* ═══ RULES ═══ */
              <Box>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => setPage(0)}
                  size="small"
                  sx={{ color: theme.palette.text.secondary, mb: 3, '&:hover': { color: theme.palette.primary.main } }}
                >
                  Back
                </Button>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.text.primary }}>
                  How to Play
                </Typography>
                {[
                  'You will be given a word with 8 letters.',
                  'Your aim is to guess as many words as possible by using each letter only once.',
                  'Guessed words cannot be shorter than 3 letters.',
                  'Whoever has the most points at the end wins!',
                ].map((rule, i) => (
                  <Typography
                    key={i}
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 1.5,
                      pl: 2,
                      borderLeft: `2px solid ${theme.palette.primary.main}40`,
                    }}
                  >
                    {i + 1}. {rule}
                  </Typography>
                ))}
              </Box>
            ) : page === 3 ? (
              /* ═══ CONNECTING ═══ */
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column' }}>
                <CircularProgress sx={{ color: theme.palette.primary.main, mb: 3 }} size={60} />
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                  Joining game...
                </Typography>
              </Box>
            ) : (
              /* ═══ MAIN MENU ═══ */
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', py: 8 }}>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      mb: 6,
                      textAlign: 'center',
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      background: 'linear-gradient(135deg, #DF8057, #3B637C)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    1v1 Scramble
                  </Typography>
                </motion.div>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '80%', md: '50%' } }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button fullWidth sx={neonButtonSx} onClick={() => setPage(3)}>
                      Join Game
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => setPage(2)}
                      sx={{
                        borderColor: `${theme.palette.primary.main}40`,
                        color: theme.palette.text.secondary,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          background: `${theme.palette.primary.main}10`,
                        },
                      }}
                    >
                      How to Play?
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Scramble;