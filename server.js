require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { triage, LANGS } = require('./triage');

const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/', rateLimit({ windowMs: 60_000, max: 20 }));

app.post('/api/triage', async (req, res) => {
  const text = String(req.body?.text || '').trim().slice(0, 1000);
  const lang = LANGS[req.body?.lang] ? req.body.lang : 'en';
  if (!text) return res.status(400).json({ error: 'text required' });
  res.json(await triage(text, lang));
});

app.get('/health', (_, res) => res.json({ ok: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Swasth Saathi running on http://localhost:${port}`));
