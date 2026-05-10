# Portfolio

## Overview
Personal portfolio website showcasing projects, skills, and experience. Built with React + Vite and Material-UI, featuring dark/light mode, smooth animations, and a hidden admin panel for content management.

## Features
- **Project Showcase** — expandable cards with tech stack icons, images, and detail paragraphs
- **Experience Timeline** — animated timeline of professional roles
- **Dark / Light Mode** — persisted across the session
- **Scramble Mini-Game** — real-time multiplayer word scramble over WebSockets
- **Admin Panel** — password-protected panel to add/edit/reorder projects and experiences without touching code
- **Trading Dashboard** — hidden analytics dashboard (password-gated)

## Technology Stack
- **Frontend:** React 19, Vite 6, Material-UI, Framer Motion, Tailwind CSS
- **Backend:** Rust (WebSocket game server hosted on VPS)
- **Hosting:** Vercel (frontend) / VPS with NGINX (game backend)

## Commands

| Command | Description |
|---|---|
| `npm install` | Install dependencies |
| `npm start` | Start dev server at `http://localhost:5173` |
| `npm run build` | Build for production (output → `dist/`) |
| `./deploy.sh` | Build and deploy to `/var/www/jadid-alam.com` with correct NGINX permissions |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run tests with Vitest |

## Content Management (Admin Panel)

Project and experience data is stored in JSON files under `public/data/`:

```
public/
  data/
    projects.json      ← project cards
    experiences.json   ← experience timeline
  images/
    icons/             ← tech stack icons (svg/png)
    photos/            ← project screenshots & gifs
```

**To update content:**
1. Navigate to `/admin` (there is an invisible button in the footer copyright row)
2. Password: see project notes
3. Add / edit / reorder / delete entries
4. Click **Export JSON** to download the updated file
5. Replace the file in `public/data/` and redeploy

Changes made in the admin panel are saved to `localStorage` immediately and appear live. To make them permanent, export and replace the JSON files.

**To add new images/icons:**
- Upload via the admin panel (stored as base64 for quick previewing)
- For production, add the file to `public/images/icons/` or `public/images/photos/` and reference it by path (e.g. `/images/icons/typescript.svg`)

## Project Structure

```
src/
  Pages/
    Home.jsx
    Projects.jsx        ← loads from public/data/projects.json
    Experience.jsx      ← loads from public/data/experiences.json
    ContactMe.jsx
    Scrabble.jsx
    AdminPanel.jsx      ← content management panel
    TradingDashboard.jsx
  Components/
    TopPanel.jsx
    FooterPanel.jsx     ← hidden nav buttons in copyright row
    ProjectButton.jsx
    ExperienceSection.jsx
    BackgroundEffect.jsx
  theme.js
```

## License
Personal project — not open-source licensed.
