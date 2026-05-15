import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RefreshIcon from '@mui/icons-material/Refresh';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const KNOWN_ICONS = [
  { name: 'React', path: '/images/icons/react.svg' },
  { name: 'JavaScript', path: '/images/icons/javascript.svg' },
  { name: 'Java', path: '/images/icons/java.svg' },
  { name: 'Python', path: '/images/icons/python.png' },
  { name: 'Rust', path: '/images/icons/rust.svg' },
  { name: 'C++', path: '/images/icons/c++.png' },
  { name: 'Django', path: '/images/icons/django.svg' },
  { name: 'HTML', path: '/images/icons/html.svg' },
  { name: 'CSS', path: '/images/icons/css.svg' },
  { name: 'PHP', path: '/images/icons/php.svg' },
  { name: 'MySQL', path: '/images/icons/mysql.svg' },
  { name: 'AWS', path: '/images/icons/aws.svg' },
];

const COLORS = {
  bg: '#0d1117',
  surface: '#161b22',
  border: '#30363d',
  accent: '#DF8057',
  text: '#e6edf3',
  textMuted: '#8b949e',
  danger: '#f85149',
  success: '#3fb950',
};

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: COLORS.text,
    '& fieldset': { borderColor: COLORS.border },
    '&:hover fieldset': { borderColor: COLORS.accent },
    '&.Mui-focused fieldset': { borderColor: COLORS.accent },
  },
  '& .MuiInputLabel-root': { color: COLORS.textMuted },
  '& .MuiInputLabel-root.Mui-focused': { color: COLORS.accent },
};

const btnSx = {
  borderColor: COLORS.border,
  color: COLORS.text,
  '&:hover': { borderColor: COLORS.accent, color: COLORS.accent, background: 'transparent' },
};

// ---------- empty templates ----------
const emptyProject = () => ({
  id: `b${Date.now()}`,
  title: '',
  images: [],
  description: '',
  detailImage: { src: '', alt: '', caption: '' },
  paragraphs: [''],
});

const emptyExperience = () => ({
  id: `div${Date.now()}`,
  title: '',
  company: '',
  alignment: 'left',
  paragraphs: [{ id: `p${Date.now()}`, content: '' }],
});

// ---------- helpers ----------
function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function readFileAsBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

// ---------- Icon Picker ----------
function IconPicker({ selected, onChange, customIcons, onUploadIcon }) {
  const allIcons = [...KNOWN_ICONS, ...customIcons];
  const iconUploadRef = useRef();

  async function handleIconFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await readFileAsBase64(file);
    onUploadIcon({ name: file.name.replace(/\.[^.]+$/, ''), path: base64 });
    e.target.value = '';
  }

  return (
    <Box>
      <Typography sx={{ color: COLORS.textMuted, fontSize: '0.8rem', mb: 1 }}>
        Tech Stack Icons — click to toggle
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
        {allIcons.map((icon) => {
          const active = selected.includes(icon.path);
          return (
            <Tooltip key={icon.path} title={icon.name} placement="top">
              <Box
                onClick={() => {
                  if (active) onChange(selected.filter((p) => p !== icon.path));
                  else onChange([...selected, icon.path]);
                }}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  border: `2px solid ${active ? COLORS.accent : COLORS.border}`,
                  background: active ? `${COLORS.accent}18` : COLORS.surface,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: COLORS.accent },
                }}
              >
                <img src={icon.path} alt={icon.name} style={{ width: 22, height: 22, objectFit: 'contain' }} />
                {active && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: COLORS.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 10, color: '#fff' }} />
                  </Box>
                )}
              </Box>
            </Tooltip>
          );
        })}
        <Tooltip title="Upload new icon" placement="top">
          <Box
            onClick={() => iconUploadRef.current?.click()}
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              border: `2px dashed ${COLORS.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: COLORS.textMuted,
              transition: 'all 0.2s',
              '&:hover': { borderColor: COLORS.accent, color: COLORS.accent },
            }}
          >
            <AddIcon sx={{ fontSize: 18 }} />
          </Box>
        </Tooltip>
      </Box>
      <input ref={iconUploadRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleIconFile} />
    </Box>
  );
}

// ---------- Image Uploader ----------
function ImageUploader({ value, onChange, label }) {
  const fileRef = useRef();

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await readFileAsBase64(file);
    onChange(base64);
    e.target.value = '';
  }

  return (
    <Box>
      <Typography sx={{ color: COLORS.textMuted, fontSize: '0.8rem', mb: 1 }}>{label}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        {value && (
          <Box
            sx={{
              width: 120,
              height: 80,
              borderRadius: 1.5,
              border: `1px solid ${COLORS.border}`,
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img src={value} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<UploadFileIcon />}
            onClick={() => fileRef.current?.click()}
            sx={btnSx}
          >
            Upload Image
          </Button>
          {value && (
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => onChange('')}
              sx={{ borderColor: COLORS.danger, color: COLORS.danger, '&:hover': { background: 'transparent' } }}
            >
              Remove
            </Button>
          )}
        </Box>
      </Box>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
    </Box>
  );
}

// ---------- Project Form Dialog ----------
function ProjectDialog({ open, project, customIcons, onUploadIcon, onSave, onClose, saving }) {
  const [form, setForm] = useState(emptyProject());

  useEffect(() => {
    if (project) setForm(JSON.parse(JSON.stringify(project)));
    else setForm(emptyProject());
  }, [project, open]);

  function set(key, val) { setForm((f) => ({ ...f, [key]: val })); }
  function setDetail(key, val) { setForm((f) => ({ ...f, detailImage: { ...f.detailImage, [key]: val } })); }

  function addParagraph() { setForm((f) => ({ ...f, paragraphs: [...f.paragraphs, ''] })); }
  function removeParagraph(i) { setForm((f) => ({ ...f, paragraphs: f.paragraphs.filter((_, idx) => idx !== i) })); }
  function setParagraph(i, val) {
    setForm((f) => {
      const paragraphs = [...f.paragraphs];
      paragraphs[i] = val;
      return { ...f, paragraphs };
    });
  }

  const valid = form.title.trim() && form.description.trim();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 3 } }}
    >
      <DialogTitle sx={{ color: COLORS.text, borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {project ? 'Edit Project' : 'New Project'}
        <IconButton onClick={onClose} size="small" sx={{ color: COLORS.textMuted }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          fullWidth
          sx={inputSx}
        />
        <TextField
          label="Description"
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={inputSx}
        />

        <IconPicker
          selected={form.images}
          onChange={(imgs) => set('images', imgs)}
          customIcons={customIcons}
          onUploadIcon={onUploadIcon}
        />

        <Divider sx={{ borderColor: COLORS.border }} />

        <ImageUploader
          label="Detail Image"
          value={form.detailImage?.src || ''}
          onChange={(src) => setDetail('src', src)}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Image Alt Text"
            value={form.detailImage?.alt || ''}
            onChange={(e) => setDetail('alt', e.target.value)}
            fullWidth
            size="small"
            sx={inputSx}
          />
          <TextField
            label="Image Caption"
            value={form.detailImage?.caption || ''}
            onChange={(e) => setDetail('caption', e.target.value)}
            fullWidth
            size="small"
            sx={inputSx}
          />
        </Box>

        <Divider sx={{ borderColor: COLORS.border }} />

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography sx={{ color: COLORS.textMuted, fontSize: '0.85rem' }}>Paragraphs</Typography>
            <Button size="small" startIcon={<AddIcon />} onClick={addParagraph} sx={{ color: COLORS.accent, '&:hover': { background: 'transparent' } }}>
              Add
            </Button>
          </Box>
          {form.paragraphs.map((p, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'flex-start' }}>
              <TextField
                value={p}
                onChange={(e) => setParagraph(i, e.target.value)}
                multiline
                rows={3}
                fullWidth
                label={`Paragraph ${i + 1}`}
                sx={inputSx}
              />
              <IconButton
                onClick={() => removeParagraph(i)}
                disabled={form.paragraphs.length === 1}
                sx={{ color: COLORS.danger, mt: 1 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ borderTop: `1px solid ${COLORS.border}`, p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" sx={btnSx} disabled={saving}>Cancel</Button>
        <Button
          onClick={() => valid && onSave(form)}
          variant="contained"
          disabled={!valid || saving}
          startIcon={saving ? <CircularProgress size={14} color="inherit" /> : null}
          sx={{ background: COLORS.accent, '&:hover': { background: '#c96f46' } }}
        >
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ---------- Experience Form Dialog ----------
function ExperienceDialog({ open, experience, onSave, onClose, saving }) {
  const [form, setForm] = useState(emptyExperience());

  useEffect(() => {
    if (experience) setForm(JSON.parse(JSON.stringify(experience)));
    else setForm(emptyExperience());
  }, [experience, open]);

  function set(key, val) { setForm((f) => ({ ...f, [key]: val })); }

  function addParagraph() {
    setForm((f) => ({
      ...f,
      paragraphs: [...f.paragraphs, { id: `p${Date.now()}`, content: '' }],
    }));
  }
  function removeParagraph(i) {
    setForm((f) => ({ ...f, paragraphs: f.paragraphs.filter((_, idx) => idx !== i) }));
  }
  function setParagraph(i, val) {
    setForm((f) => {
      const paragraphs = [...f.paragraphs];
      paragraphs[i] = { ...paragraphs[i], content: val };
      return { ...f, paragraphs };
    });
  }

  const valid = form.title.trim() && form.company.trim();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 3 } }}
    >
      <DialogTitle sx={{ color: COLORS.text, borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {experience ? 'Edit Experience' : 'New Experience'}
        <IconButton onClick={onClose} size="small" sx={{ color: COLORS.textMuted }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField label="Job Title" value={form.title} onChange={(e) => set('title', e.target.value)} fullWidth sx={inputSx} />
        <TextField label="Company" value={form.company} onChange={(e) => set('company', e.target.value)} fullWidth sx={inputSx} />

        <FormControl fullWidth sx={inputSx}>
          <InputLabel>Card Alignment</InputLabel>
          <Select value={form.alignment} label="Card Alignment" onChange={(e) => set('alignment', e.target.value)} sx={{ color: COLORS.text }}>
            <MenuItem value="left">Left</MenuItem>
            <MenuItem value="right">Right</MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ borderColor: COLORS.border }} />

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography sx={{ color: COLORS.textMuted, fontSize: '0.85rem' }}>Paragraphs</Typography>
            <Button size="small" startIcon={<AddIcon />} onClick={addParagraph} sx={{ color: COLORS.accent, '&:hover': { background: 'transparent' } }}>
              Add
            </Button>
          </Box>
          {form.paragraphs.map((p, i) => (
            <Box key={p.id} sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'flex-start' }}>
              <TextField
                value={p.content}
                onChange={(e) => setParagraph(i, e.target.value)}
                multiline
                rows={3}
                fullWidth
                label={`Paragraph ${i + 1}`}
                sx={inputSx}
              />
              <IconButton
                onClick={() => removeParagraph(i)}
                disabled={form.paragraphs.length === 1}
                sx={{ color: COLORS.danger, mt: 1 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ borderTop: `1px solid ${COLORS.border}`, p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" sx={btnSx} disabled={saving}>Cancel</Button>
        <Button
          onClick={() => valid && onSave(form)}
          variant="contained"
          disabled={!valid || saving}
          startIcon={saving ? <CircularProgress size={14} color="inherit" /> : null}
          sx={{ background: COLORS.accent, '&:hover': { background: '#c96f46' } }}
        >
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ---------- Project List Item ----------
function ProjectItem({ project, onEdit, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 1.5,
        background: COLORS.bg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: '12px 16px !important', display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ color: COLORS.text, fontWeight: 600, fontSize: '0.9rem', mb: 0.5 }} noWrap>
            {project.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {project.images.slice(0, 6).map((src, i) => (
              <img key={i} src={src} alt="" style={{ width: 16, height: 16, objectFit: 'contain', opacity: 0.7 }} />
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
          <Tooltip title="Move up">
            <span>
              <IconButton size="small" onClick={onMoveUp} disabled={isFirst} sx={{ color: COLORS.textMuted }}>
                <KeyboardArrowUpIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Move down">
            <span>
              <IconButton size="small" onClick={onMoveDown} disabled={isLast} sx={{ color: COLORS.textMuted }}>
                <KeyboardArrowDownIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={onEdit} sx={{ color: COLORS.accent }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={onDelete} sx={{ color: COLORS.danger }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}

// ---------- Experience List Item ----------
function ExperienceItem({ experience, onEdit, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 1.5,
        background: COLORS.bg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: '12px 16px !important', display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ color: COLORS.text, fontWeight: 600, fontSize: '0.9rem' }}>
            {experience.title}
          </Typography>
          <Typography sx={{ color: COLORS.textMuted, fontSize: '0.78rem' }}>
            {experience.company}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
          <Tooltip title="Move up">
            <span>
              <IconButton size="small" onClick={onMoveUp} disabled={isFirst} sx={{ color: COLORS.textMuted }}>
                <KeyboardArrowUpIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Move down">
            <span>
              <IconButton size="small" onClick={onMoveDown} disabled={isLast} sx={{ color: COLORS.textMuted }}>
                <KeyboardArrowDownIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={onEdit} sx={{ color: COLORS.accent }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={onDelete} sx={{ color: COLORS.danger }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}

// ---------- Main AdminPanel ----------
const AdminPanel = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [customIcons, setCustomIcons] = useState([]);

  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [experienceDialogOpen, setExperienceDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const [token, setToken] = useState(() => sessionStorage.getItem('adminToken') || '');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState('');

  // Auto-authenticate if a session token already exists
  useEffect(() => {
    if (token) setAuthenticated(true);
  }, []);

  // Load data from backend once authenticated
  useEffect(() => {
    if (!authenticated) return;
    fetch(`${API_URL}/api/projects`).then((r) => r.json()).then(setProjects).catch(() => {});
    fetch(`${API_URL}/api/experiences`).then((r) => r.json()).then(setExperiences).catch(() => {});
    const storedIcons = localStorage.getItem('portfolio_admin_custom_icons');
    if (storedIcons) setCustomIcons(JSON.parse(storedIcons));
  }, [authenticated]);

  function flashSaved() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleAuthError() {
    sessionStorage.removeItem('adminToken');
    setToken('');
    setAuthenticated(false);
  }

  async function apiCall(path, method, body) {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (res.status === 401 || res.status === 403) {
      handleAuthError();
      throw new Error('Session expired');
    }
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem('adminToken', data.token);
        setToken(data.token);
        setAuthenticated(true);
        setPasswordError(false);
      } else {
        setPasswordError(true);
      }
    } catch {
      setPasswordError(true);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('adminToken');
    setToken('');
    setAuthenticated(false);
  }

  // ---- Projects CRUD ----
  async function handleSaveProject(form) {
    setSaving(true);
    setApiError('');
    try {
      if (editingProject) {
        const updated = await apiCall(`/api/projects/${form.id}`, 'PUT', form);
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        // Strip the client-generated temp id; backend assigns a real one
        const { id: _tempId, ...body } = form;
        const created = await apiCall('/api/projects', 'POST', body);
        setProjects((prev) => [created, ...prev]);
      }
      flashSaved();
      setProjectDialogOpen(false);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteProject(id) {
    if (!window.confirm('Delete this project?')) return;
    try {
      await apiCall(`/api/projects/${id}`, 'DELETE');
      setProjects((prev) => prev.filter((p) => p.id !== id));
      flashSaved();
    } catch (err) {
      setApiError(err.message);
    }
  }

  async function moveProject(index, dir) {
    const arr = [...projects];
    const target = index + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    setProjects(arr); // optimistic update
    try {
      await apiCall('/api/projects/reorder', 'PUT', { orderedIds: arr.map((p) => p.id) });
      flashSaved();
    } catch (err) {
      setApiError(err.message);
    }
  }

  // ---- Experiences CRUD ----
  async function handleSaveExperience(form) {
    setSaving(true);
    setApiError('');
    try {
      if (editingExperience) {
        const updated = await apiCall(`/api/experiences/${form.id}`, 'PUT', form);
        setExperiences((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      } else {
        const { id: _tempId, ...body } = form;
        const created = await apiCall('/api/experiences', 'POST', body);
        setExperiences((prev) => [created, ...prev]);
      }
      flashSaved();
      setExperienceDialogOpen(false);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteExperience(id) {
    if (!window.confirm('Delete this experience?')) return;
    try {
      await apiCall(`/api/experiences/${id}`, 'DELETE');
      setExperiences((prev) => prev.filter((e) => e.id !== id));
      flashSaved();
    } catch (err) {
      setApiError(err.message);
    }
  }

  async function moveExperience(index, dir) {
    const arr = [...experiences];
    const target = index + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    setExperiences(arr); // optimistic update
    try {
      await apiCall('/api/experiences/reorder', 'PUT', { orderedIds: arr.map((e) => e.id) });
      flashSaved();
    } catch (err) {
      setApiError(err.message);
    }
  }

  // ---- Icons (kept in localStorage — base64 blobs don't need backend) ----
  function handleUploadIcon(icon) {
    const updated = [...customIcons, icon];
    setCustomIcons(updated);
    localStorage.setItem('portfolio_admin_custom_icons', JSON.stringify(updated));
  }

  // ---- Reload from server ----
  async function handleReset(type) {
    if (!window.confirm(`Reload ${type} from the server?`)) return;
    try {
      if (type === 'projects') {
        const data = await fetch(`${API_URL}/api/projects`).then((r) => r.json());
        setProjects(data);
      } else {
        const data = await fetch(`${API_URL}/api/experiences`).then((r) => r.json());
        setExperiences(data);
      }
    } catch (err) {
      setApiError(err.message);
    }
  }

  // ---------- Password Gate ----------
  if (!authenticated) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: COLORS.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 3,
            p: 4,
            width: 340,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography sx={{ color: COLORS.text, fontWeight: 700, fontSize: '1.2rem', mb: 0.5 }}>
            Admin Panel
          </Typography>
          <Typography sx={{ color: COLORS.textMuted, fontSize: '0.85rem', mb: 1 }}>
            Enter your admin password to continue.
          </Typography>
          <TextField
            type="password"
            label="Password"
            value={passwordInput}
            onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }}
            error={passwordError}
            helperText={passwordError ? 'Incorrect password' : ''}
            fullWidth
            autoFocus
            sx={inputSx}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ background: COLORS.accent, '&:hover': { background: '#c96f46' }, mt: 0.5 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    );
  }

  // ---------- Main Panel ----------
  return (
    <Box sx={{ minHeight: '100vh', background: COLORS.bg, color: COLORS.text }}>
      {/* Header */}
      <Box
        sx={{
          borderBottom: `1px solid ${COLORS.border}`,
          px: 3,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: COLORS.surface,
          zIndex: 10,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: COLORS.text }}>
          Admin Panel
          {saved && (
            <Typography component="span" sx={{ ml: 2, color: COLORS.success, fontSize: '0.78rem', fontWeight: 400 }}>
              ✓ Saved
            </Typography>
          )}
          {apiError && (
            <Typography component="span" sx={{ ml: 2, color: COLORS.danger, fontSize: '0.78rem', fontWeight: 400 }}>
              ✗ {apiError}
            </Typography>
          )}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Export projects.json">
            <Button
              size="small"
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={() => downloadJson(projects, 'projects.json')}
              sx={{ ...btnSx, fontSize: '0.75rem' }}
            >
              Projects JSON
            </Button>
          </Tooltip>
          <Tooltip title="Export experiences.json">
            <Button
              size="small"
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={() => downloadJson(experiences, 'experiences.json')}
              sx={{ ...btnSx, fontSize: '0.75rem' }}
            >
              Experiences JSON
            </Button>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton size="small" onClick={handleLogout} sx={{ color: COLORS.textMuted, ml: 0.5 }}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: `1px solid ${COLORS.border}`, px: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            '& .MuiTab-root': { color: COLORS.textMuted, textTransform: 'none', fontWeight: 500 },
            '& .Mui-selected': { color: COLORS.accent },
            '& .MuiTabs-indicator': { background: COLORS.accent },
          }}
        >
          <Tab label={`Projects (${projects.length})`} />
          <Tab label={`Experiences (${experiences.length})`} />
        </Tabs>
      </Box>

      {/* Content */}
      <Box sx={{ maxWidth: 860, mx: 'auto', px: 3, py: 3 }}>
        {/* Projects Tab */}
        {activeTab === 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
              <Typography sx={{ color: COLORS.textMuted, fontSize: '0.85rem' }}>
                First project is featured (full-width). Rest are displayed in a grid.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Reload from server">
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={() => handleReset('projects')}
                    sx={{ ...btnSx, fontSize: '0.75rem' }}
                  >
                    Reload
                  </Button>
                </Tooltip>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => { setEditingProject(null); setProjectDialogOpen(true); }}
                  sx={{ background: COLORS.accent, '&:hover': { background: '#c96f46' }, fontSize: '0.8rem' }}
                >
                  Add Project
                </Button>
              </Box>
            </Box>

            {projects.map((project, i) => (
              <ProjectItem
                key={project.id}
                project={project}
                isFirst={i === 0}
                isLast={i === projects.length - 1}
                onEdit={() => { setEditingProject(project); setProjectDialogOpen(true); }}
                onDelete={() => handleDeleteProject(project.id)}
                onMoveUp={() => moveProject(i, -1)}
                onMoveDown={() => moveProject(i, 1)}
              />
            ))}

            {projects.length === 0 && (
              <Typography sx={{ color: COLORS.textMuted, textAlign: 'center', py: 6 }}>
                No projects yet. Click "Add Project" to get started.
              </Typography>
            )}
          </Box>
        )}

        {/* Experiences Tab */}
        {activeTab === 1 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
              <Typography sx={{ color: COLORS.textMuted, fontSize: '0.85rem' }}>
                Experiences are displayed in order from top to bottom.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Reload from server">
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={() => handleReset('experiences')}
                    sx={{ ...btnSx, fontSize: '0.75rem' }}
                  >
                    Reload
                  </Button>
                </Tooltip>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => { setEditingExperience(null); setExperienceDialogOpen(true); }}
                  sx={{ background: COLORS.accent, '&:hover': { background: '#c96f46' }, fontSize: '0.8rem' }}
                >
                  Add Experience
                </Button>
              </Box>
            </Box>

            {experiences.map((exp, i) => (
              <ExperienceItem
                key={exp.id}
                experience={exp}
                isFirst={i === 0}
                isLast={i === experiences.length - 1}
                onEdit={() => { setEditingExperience(exp); setExperienceDialogOpen(true); }}
                onDelete={() => handleDeleteExperience(exp.id)}
                onMoveUp={() => moveExperience(i, -1)}
                onMoveDown={() => moveExperience(i, 1)}
              />
            ))}

            {experiences.length === 0 && (
              <Typography sx={{ color: COLORS.textMuted, textAlign: 'center', py: 6 }}>
                No experiences yet. Click "Add Experience" to get started.
              </Typography>
            )}
          </Box>
        )}
      </Box>

      {/* Dialogs */}
      <ProjectDialog
        open={projectDialogOpen}
        project={editingProject}
        customIcons={customIcons}
        onUploadIcon={handleUploadIcon}
        onSave={handleSaveProject}
        onClose={() => setProjectDialogOpen(false)}
        saving={saving}
      />
      <ExperienceDialog
        open={experienceDialogOpen}
        experience={editingExperience}
        onSave={handleSaveExperience}
        onClose={() => setExperienceDialogOpen(false)}
        saving={saving}
      />
    </Box>
  );
};

export default AdminPanel;
