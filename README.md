# 🩺 Swasth Saathi – Voice-first Health Guide

**HackNowa Global Hackathon 2026 · Track: Inclusive Technology**

A voice-first web app that lets low-literacy users speak their symptoms in their own language and get simple, spoken triage advice: **home care, visit a clinic, or emergency**.

## Problem
Hundreds of millions of people can't easily read health websites or apps, don't speak English, and live far from a doctor. They often wait too long, or rush to hospital for mild problems.

## Solution
- 🎤 **Speak, don't type**: Web Speech API for input in English, Hindi, Marathi, Tamil, Telugu and Bengali
- 🧠 **Claude-powered triage**: plain-language output at a ~10-year-old reading level, with warning signs
- 🔊 **Read aloud**: advice is spoken back automatically
- 🚦 **Colour-coded result**: green (home care), amber (see a clinic within 24h), red (call 108/112)
- 🛡️ **Safety first**: keyword red-flag override, cautious-by-default prompt, no diagnoses or dosages, offline rule-based fallback if the API is unavailable

## Architecture
```
Browser (public/index.html)
  ├─ SpeechRecognition  → text
  ├─ POST /api/triage ──► Express (server.js) ─► triage.js ─► Claude API
  └─ SpeechSynthesis    ← JSON {level,label,summary,advice,warning_signs,speak}
```

## Run locally
Requires Node 18+ and an [Anthropic API key](https://console.anthropic.com/).

```bash
git clone <your-repo-url> && cd swasth-saathi
npm install
cp .env.example .env      # then add your ANTHROPIC_API_KEY
npm start                 # http://localhost:3000
```
Use **Chrome** or **Edge** for voice input (Firefox has no speech recognition; typing still works).
Without an API key the app still runs using the basic rule-based fallback.

## Deploy
Any Node host works (Render, Railway, Fly.io). Set `ANTHROPIC_API_KEY` as an environment variable and use `npm start`.

## Roadmap
- WhatsApp voice-note interface (WhatsApp Business API webhook → `triage()`)
- Nearest clinic / PHC finder
- More languages and dialect tuning
- Validation of triage rules by doctors and ASHA workers

## Disclaimer
Guidance only. Not a medical device and not a substitute for a doctor. In an emergency call your local emergency number (India: 108 / 112).

## License
MIT
