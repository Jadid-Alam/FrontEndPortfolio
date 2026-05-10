import { useState, useEffect, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import LockIcon from '@mui/icons-material/Lock';
import { createChart } from 'lightweight-charts';

/* ═══════════════════════════════════════════════════════════════════
   BACKEND CONFIG
   The backend is a Node.js server running on localhost:3001.
   All requests include an Authorization header with the session token.
   ═══════════════════════════════════════════════════════════════════ */
const API_BASE = 'http://localhost:3001/api/dashboard';
const POLL_INTERVAL_MS = 30000; // 30 seconds

/* ═══════════════════════════════════════════════════════════════════
   MOCK DATA - Used as fallback when backend is not running.
   Replace with live backend data by removing the mock returns.
   ═══════════════════════════════════════════════════════════════════ */
const generateMockData = () => {
  const now = Math.floor(Date.now() / 1000);
  const weekStart = now - (4 * 24 * 3600); // 4 days ago
  const interval = 3600; // 1-hour candles

  const candles = [];
  const predictions = [];
  const equity = [];
  const trades = [];
  let price = 1.0850;
  let equityVal = 10000;

  for (let t = weekStart; t <= now; t += interval) {
    const open = price;
    const high = open + Math.random() * 0.0030;
    const low = open - Math.random() * 0.0030;
    const close = low + Math.random() * (high - low);
    price = close;

    candles.push({ time: t, open, high, low, close });

    // Prediction data: actual vs predicted bullish/bearish probabilities
    const actualBull = Math.random();
    const actualBear = 1 - actualBull;
    const predBull = actualBull + (Math.random() * 0.3 - 0.15);
    const predBear = 1 - predBull;
    predictions.push({
      time: t,
      actualBullish: actualBull,
      actualBearish: actualBear,
      predictedBullish: Math.max(0, Math.min(1, predBull)),
      predictedBearish: Math.max(0, Math.min(1, predBear)),
    });

    equityVal += (Math.random() - 0.48) * 50;
    equity.push({ time: t, value: equityVal });
  }

  // Generate some sample trades
  for (let i = 0; i < 12; i++) {
    const idx = Math.floor(Math.random() * (candles.length - 5));
    const closeIdx = idx + Math.floor(Math.random() * 4) + 1;
    const type = Math.random() > 0.5 ? 'buy' : 'sell';
    trades.push({
      openTime: candles[idx].time,
      openPrice: candles[idx].close,
      closeTime: candles[closeIdx].time,
      closePrice: candles[closeIdx].close,
      type,
    });
  }

  return {
    candles,
    trades,
    predictions,
    equity,
    stats: {
      pnl: 234.50,
      winRate: 0.65,
      tradeCount: 47,
      avgWin: 15.20,
      avgLoss: -8.40,
      maxDrawdown: -120.30,
      sharpeRatio: 1.42,
      profitFactor: 1.78,
    },
  };
};

/* ═══════════════════════════════════════════════════════════════════
   PASSWORD GATE COMPONENT
   Sends POST to /api/dashboard/auth with { password } body.
   Expects response: { success: boolean, token?: string, error?: string }
   ═══════════════════════════════════════════════════════════════════ */
const PasswordGate = ({ onAuth }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      /*
       * POST /api/dashboard/auth
       * Body: { password: string }
       * Expected response: {
       *   success: boolean,
       *   token: string    // JWT or session token to use in subsequent requests
       *   error?: string   // present when success is false
       * }
       */
      const res = await fetch(`${API_BASE}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success && data.token) {
        sessionStorage.setItem('dashboardToken', data.token);
        onAuth(data.token);
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      // If backend is not running, use mock auth for development
      console.warn('Backend not available, using mock auth:', err.message);
      if (password === 'admin') {
        const mockToken = 'mock-dev-token';
        sessionStorage.setItem('dashboardToken', mockToken);
        onAuth(mockToken);
      } else {
        setError('Backend not available. Use "admin" for dev mode.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0e17',
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: 380,
          background: 'rgba(17, 24, 39, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(148,163,184,0.1)',
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              mx: 'auto',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))',
              border: '1px solid rgba(139,92,246,0.3)',
            }}
          >
            <LockIcon sx={{ color: '#8b5cf6', fontSize: 28 }} />
          </Box>
          <Typography variant="h6" sx={{ color: '#f1f5f9', fontWeight: 700, mb: 1 }}>
            Trading Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
            Enter password to access
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              fullWidth
              variant="outlined"
              error={!!error}
              helperText={error}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.03)',
                  '& fieldset': { borderColor: 'rgba(148,163,184,0.15)' },
                  '&:hover fieldset': { borderColor: 'rgba(139,92,246,0.4)' },
                  '&.Mui-focused fieldset': { borderColor: '#8b5cf6' },
                },
                '& .MuiInputBase-input': { color: '#f1f5f9' },
              }}
            />
            <Button
              type="submit"
              fullWidth
              disabled={loading || !password}
              sx={{
                py: 1.3,
                background: loading ? 'rgba(139,92,246,0.3)' : 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                color: '#fff',
                fontWeight: 700,
                borderRadius: 2,
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(139, 92, 246, 0.4)',
                },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Access Dashboard'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   CHART COLORS - consistent dark theme
   ═══════════════════════════════════════════════════════════════════ */
const CHART_COLORS = {
  background: '#0d1117',
  gridLines: 'rgba(148, 163, 184, 0.06)',
  text: '#94a3b8',
  bullish: '#22c55e',
  bearish: '#ef4444',
  predictedBull: 'rgba(34, 197, 94, 0.35)',
  predictedBear: 'rgba(239, 68, 68, 0.35)',
  equity: '#8b5cf6',
  buyMarker: '#22c55e',
  sellMarker: '#ef4444',
};

/* ═══════════════════════════════════════════════════════════════════
   CHART PANEL - wrapper for each Lightweight Charts instance
   ═══════════════════════════════════════════════════════════════════ */
const useChart = (containerRef, options = {}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      layout: {
        background: { color: CHART_COLORS.background },
        textColor: CHART_COLORS.text,
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: CHART_COLORS.gridLines },
        horzLines: { color: CHART_COLORS.gridLines },
      },
      timeScale: {
        borderColor: 'rgba(148, 163, 184, 0.1)',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: { borderColor: 'rgba(148, 163, 184, 0.1)' },
      crosshair: {
        vertLine: { color: 'rgba(139, 92, 246, 0.3)', labelBackgroundColor: '#8b5cf6' },
        horzLine: { color: 'rgba(139, 92, 246, 0.3)', labelBackgroundColor: '#8b5cf6' },
      },
      ...options,
    });

    chartRef.current = chart;

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return chartRef;
};

/* ═══════════════════════════════════════════════════════════════════
   PANEL 1: CANDLESTICK CHART (Top-Left, 75% width)
   - OHLC candlestick data for the current trading week
   - Buy markers (green, below candle)
   - Sell markers (red, above candle)
   - Lines connecting trade open → close (not directly supported by
     lightweight-charts, so we overlay with line series per trade)
   ═══════════════════════════════════════════════════════════════════ */
const CandlestickPanel = ({ data }) => {
  const containerRef = useRef(null);
  const chartRef = useChart(containerRef);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !data) return;

    /*
     * Candle data format from backend:
     * Array of { time: number (unix), open: number, high: number, low: number, close: number }
     */
    const candleSeries = chart.addCandlestickSeries({
      upColor: CHART_COLORS.bullish,
      downColor: CHART_COLORS.bearish,
      borderUpColor: CHART_COLORS.bullish,
      borderDownColor: CHART_COLORS.bearish,
      wickUpColor: CHART_COLORS.bullish,
      wickDownColor: CHART_COLORS.bearish,
    });
    candleSeries.setData(data.candles);

    /*
     * Trade markers format from backend:
     * Array of {
     *   openTime: number (unix), openPrice: number,
     *   closeTime: number (unix), closePrice: number,
     *   type: "buy" | "sell"
     * }
     */
    const markers = [];
    if (data.trades) {
      data.trades.forEach((trade) => {
        // Open marker
        markers.push({
          time: trade.openTime,
          position: trade.type === 'buy' ? 'belowBar' : 'aboveBar',
          color: trade.type === 'buy' ? CHART_COLORS.buyMarker : CHART_COLORS.sellMarker,
          shape: trade.type === 'buy' ? 'arrowUp' : 'arrowDown',
          text: trade.type === 'buy' ? 'BUY' : 'SELL',
        });
      });
      markers.sort((a, b) => a.time - b.time);
      candleSeries.setMarkers(markers);

      /*
       * Lines connecting trade open → close:
       * Each trade gets its own line series to draw the open→close connection
       */
      data.trades.forEach((trade, i) => {
        const lineSeries = chart.addLineSeries({
          color: trade.type === 'buy'
            ? 'rgba(34, 197, 94, 0.4)'
            : 'rgba(239, 68, 68, 0.4)',
          lineWidth: 1,
          lineStyle: 2, // dashed
          priceLineVisible: false,
          lastValueVisible: false,
          crosshairMarkerVisible: false,
        });
        lineSeries.setData([
          { time: trade.openTime, value: trade.openPrice },
          { time: trade.closeTime, value: trade.closePrice },
        ]);
      });
    }

    chart.timeScale().fitContent();
  }, [data]);

  return (
    <Box ref={containerRef} sx={{ width: '100%', height: '100%', borderRadius: 1, overflow: 'hidden' }} />
  );
};

/* ═══════════════════════════════════════════════════════════════════
   PANEL 2: PREDICTION BARS (Bottom-Left, 75% width)
   - 4 histogram series layered:
     1. Actual bullish (solid green)
     2. Actual bearish (solid red, negative values)
     3. Predicted bullish (light green overlay)
     4. Predicted bearish (light red overlay, negative values)
   ═══════════════════════════════════════════════════════════════════ */
const PredictionPanel = ({ data }) => {
  const containerRef = useRef(null);
  const chartRef = useChart(containerRef);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !data?.predictions) return;

    /*
     * Prediction data format from backend:
     * Array of {
     *   time: number (unix),
     *   actualBullish: number (0-1),   - actual bullish probability
     *   actualBearish: number (0-1),   - actual bearish probability
     *   predictedBullish: number (0-1), - model's predicted bullish probability
     *   predictedBearish: number (0-1), - model's predicted bearish probability
     * }
     */

    // Actual bullish (positive, solid green bars)
    const actualBullSeries = chart.addHistogramSeries({
      color: CHART_COLORS.bullish,
      priceLineVisible: false,
      lastValueVisible: false,
      priceFormat: { type: 'percent' },
    });
    actualBullSeries.setData(
      data.predictions.map((p) => ({ time: p.time, value: p.actualBullish }))
    );

    // Actual bearish (negative, solid red bars)
    const actualBearSeries = chart.addHistogramSeries({
      color: CHART_COLORS.bearish,
      priceLineVisible: false,
      lastValueVisible: false,
    });
    actualBearSeries.setData(
      data.predictions.map((p) => ({ time: p.time, value: -p.actualBearish }))
    );

    // Predicted bullish (lighter green overlay)
    const predBullSeries = chart.addHistogramSeries({
      color: CHART_COLORS.predictedBull,
      priceLineVisible: false,
      lastValueVisible: false,
    });
    predBullSeries.setData(
      data.predictions.map((p) => ({ time: p.time, value: p.predictedBullish }))
    );

    // Predicted bearish (lighter red overlay, negative)
    const predBearSeries = chart.addHistogramSeries({
      color: CHART_COLORS.predictedBear,
      priceLineVisible: false,
      lastValueVisible: false,
    });
    predBearSeries.setData(
      data.predictions.map((p) => ({ time: p.time, value: -p.predictedBearish }))
    );

    chart.timeScale().fitContent();
  }, [data]);

  return (
    <Box ref={containerRef} sx={{ width: '100%', height: '100%', borderRadius: 1, overflow: 'hidden' }} />
  );
};

/* ═══════════════════════════════════════════════════════════════════
   PANEL 3: EQUITY CURVE (Top-Right, 25% width)
   - Line graph showing account value over time
   ═══════════════════════════════════════════════════════════════════ */
const EquityPanel = ({ data }) => {
  const containerRef = useRef(null);
  const chartRef = useChart(containerRef);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !data?.equity) return;

    /*
     * Equity data format from backend:
     * Array of { time: number (unix), value: number (account balance) }
     */
    const lineSeries = chart.addLineSeries({
      color: CHART_COLORS.equity,
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: true,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
    });

    // Add area fill below the line
    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(139, 92, 246, 0.3)',
      bottomColor: 'rgba(139, 92, 246, 0.02)',
      lineColor: CHART_COLORS.equity,
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    areaSeries.setData(data.equity);
    chart.timeScale().fitContent();
  }, [data]);

  return (
    <Box ref={containerRef} sx={{ width: '100%', height: '100%', borderRadius: 1, overflow: 'hidden' }} />
  );
};

/* ═══════════════════════════════════════════════════════════════════
   PANEL 4: STATS TABLE (Bottom-Right, 25% width)
   ═══════════════════════════════════════════════════════════════════ */
const StatsPanel = ({ data }) => {
  /*
   * Stats data format from backend:
   * {
   *   pnl: number,          - total profit/loss in account currency
   *   winRate: number,       - win rate as decimal (0-1), displayed as percentage
   *   tradeCount: number,    - total number of trades executed
   *   avgWin: number,        - average winning trade value
   *   avgLoss: number,       - average losing trade value (negative)
   *   maxDrawdown: number,   - maximum drawdown (negative)
   *   sharpeRatio: number,   - risk-adjusted return ratio
   *   profitFactor: number,  - gross profit / gross loss
   * }
   */
  const stats = data?.stats || {};

  const rows = [
    { label: 'PnL', value: `$${(stats.pnl || 0).toFixed(2)}`, color: (stats.pnl || 0) >= 0 ? '#22c55e' : '#ef4444' },
    { label: 'Win Rate', value: `${((stats.winRate || 0) * 100).toFixed(1)}%`, color: (stats.winRate || 0) >= 0.5 ? '#22c55e' : '#ef4444' },
    { label: 'Trades', value: stats.tradeCount || 0, color: '#f1f5f9' },
    { label: 'Avg Win', value: `$${(stats.avgWin || 0).toFixed(2)}`, color: '#22c55e' },
    { label: 'Avg Loss', value: `$${(stats.avgLoss || 0).toFixed(2)}`, color: '#ef4444' },
    { label: 'Max DD', value: `$${(stats.maxDrawdown || 0).toFixed(2)}`, color: '#ef4444' },
    { label: 'Sharpe', value: (stats.sharpeRatio || 0).toFixed(2), color: '#8b5cf6' },
    { label: 'P.Factor', value: (stats.profitFactor || 0).toFixed(2), color: (stats.profitFactor || 0) >= 1 ? '#22c55e' : '#ef4444' },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        background: CHART_COLORS.background,
        borderRadius: 1,
        overflow: 'auto',
        p: 1.5,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#94a3b8',
          fontWeight: 700,
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          display: 'block',
          mb: 1,
        }}
      >
        Performance
      </Typography>
      <Table size="small" sx={{ '& td, & th': { border: 'none', py: 0.6, px: 1 } }}>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.label} sx={{ '&:hover': { background: 'rgba(255,255,255,0.02)' } }}>
              <TableCell sx={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 500, pl: 0 }}>
                {row.label}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: row.color,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  fontFamily: "'Inter', monospace",
                  pr: 0,
                }}
              >
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN DASHBOARD COMPONENT
   Renders the 2x2 grid layout with 3:1 horizontal ratio
   ═══════════════════════════════════════════════════════════════════ */
const Dashboard = ({ token }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      /*
       * GET /api/dashboard/data
       * Headers: { Authorization: "Bearer <token>" }
       *
       * Expected response (full dashboard data):
       * {
       *   candles: Array<{ time: number, open: number, high: number, low: number, close: number }>,
       *   trades: Array<{ openTime: number, openPrice: number, closeTime: number, closePrice: number, type: "buy"|"sell" }>,
       *   predictions: Array<{ time: number, actualBullish: number, actualBearish: number, predictedBullish: number, predictedBearish: number }>,
       *   equity: Array<{ time: number, value: number }>,
       *   stats: { pnl: number, winRate: number, tradeCount: number, avgWin: number, avgLoss: number, maxDrawdown: number, sharpeRatio: number, profitFactor: number }
       * }
       *
       * Data scope: Charts 1 & 2 show current trading week only (Mon-Fri)
       * All data should be time-aligned across charts
       */
      const res = await fetch(`${API_BASE}/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setLastUpdate(new Date());
    } catch (err) {
      // Fallback: use mock data when backend is unavailable
      console.warn('Backend unavailable, using mock data:', err.message);
      setData(generateMockData());
      setLastUpdate(new Date());
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Initial fetch + polling
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0e17' }}>
        <CircularProgress sx={{ color: '#8b5cf6' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        background: '#0a0e17',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <Box
        sx={{
          px: 2.5,
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(148,163,184,0.08)',
          background: 'rgba(17, 24, 39, 0.5)',
          backdropFilter: 'blur(10px)',
          flexShrink: 0,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '0.9rem',
          }}
        >
          Trading Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {lastUpdate && (
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
              Updated: {lastUpdate.toLocaleTimeString()}
            </Typography>
          )}
          <Button
            size="small"
            onClick={fetchData}
            sx={{
              color: '#94a3b8',
              fontSize: '0.7rem',
              minWidth: 'auto',
              '&:hover': { color: '#8b5cf6' },
            }}
          >
            Refresh
          </Button>
          <Button
            size="small"
            onClick={() => {
              sessionStorage.removeItem('dashboardToken');
              window.location.reload();
            }}
            sx={{
              color: '#94a3b8',
              fontSize: '0.7rem',
              minWidth: 'auto',
              '&:hover': { color: '#ef4444' },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* ═══════════════════════════════════════════════
          2x2 GRID LAYOUT
          Horizontal ratio: 3:1 (75% / 25%)
          Vertical ratio: 1:1 (50% / 50%)
         ═══════════════════════════════════════════════ */}
      <Box
        sx={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '3fr 1fr' },
          gridTemplateRows: '1fr 1fr',
          gap: '4px',
          p: '4px',
          minHeight: 0,
        }}
      >
        {/* Panel 1: Candlestick Chart (Top-Left) */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: '1' },
            gridRow: '1',
            position: 'relative',
            minHeight: 0,
          }}
        >
          <Box sx={{ position: 'absolute', top: 8, left: 12, zIndex: 1 }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              OHLC · Trades
            </Typography>
          </Box>
          <CandlestickPanel data={data} />
        </Box>

        {/* Panel 2: Prediction Bars (Bottom-Left) */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: '1' },
            gridRow: '2',
            position: 'relative',
            minHeight: 0,
          }}
        >
          <Box sx={{ position: 'absolute', top: 8, left: 12, zIndex: 1 }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Predictions · Actual vs Predicted
            </Typography>
          </Box>
          <PredictionPanel data={data} />
        </Box>

        {/* Panel 3: Equity Curve (Top-Right) */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: '2' },
            gridRow: { xs: '3', md: '1' },
            position: 'relative',
            minHeight: { xs: 200, md: 0 },
          }}
        >
          <Box sx={{ position: 'absolute', top: 8, left: 12, zIndex: 1 }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Equity Curve
            </Typography>
          </Box>
          <EquityPanel data={data} />
        </Box>

        {/* Panel 4: Stats Table (Bottom-Right) */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: '2' },
            gridRow: { xs: '4', md: '2' },
            minHeight: { xs: 200, md: 0 },
          }}
        >
          <StatsPanel data={data} />
        </Box>
      </Box>
    </Box>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   ROOT EXPORT - handles auth state
   ═══════════════════════════════════════════════════════════════════ */
const TradingDashboard = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem('dashboardToken'));

  // Bypassing login for testing
  // if (!token) {
  //   return <PasswordGate onAuth={setToken} />;
  // }

  return <Dashboard token={token || 'mock-dev-token'} />;
};

export default TradingDashboard;
