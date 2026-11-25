# United Smiles Family Dentistry — Website

Official website for **United Smiles Family Dentistry**, led by **Dr. Annie Mohan (BDS, 25+ years of experience)**, opposite the High Court of Kerala, Ernakulam, Kochi.

**Live site:** https://unitedsmiledentalclinic.com

## Features
- **Interactive 3D tooth** (Three.js) that rotates on its own and can be dragged, with animated green-and-blue protection swooshes
- **Appointment requests:** the contact form (with preferred date & time) is emailed to the clinic via [Formspree](https://formspree.io); every "Book" button scrolls to it
- **Floating quick actions:** a + button with Call, Book appointment and WhatsApp
- **About section and visiting specialists**, with arched portrait cards
- **3D circular treatments carousel:** auto-rotates and can be dragged, swiped or clicked
- **Clinic gallery collage** with "View more"
- **Google-style patient reviews**
- **Instagram-style reel feed** that plays videos in a pop-up
- **Contact section** with a Google Map, opening hours, phone, WhatsApp and email
- **About page** (`/about/`) with the full clinic story, Dr. Annie, visiting specialists, treatments, reviews and contact form
- **iOS-style "liquid glass" UI**, traditional-meets-modern design, fully responsive

## Tech stack
React 18 · Vite 6 · Three.js · Framer Motion · Lucide icons

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # preview the production build
```

## Deployment (GitHub Pages)
Every push to `main` builds and deploys the site through GitHub Actions (`.github/workflows/deploy.yml`).

One-time setup: **Repo → Settings → Pages → Build and deployment → Source: GitHub Actions.**

If the repository is renamed, update `base` in `vite.config.js` to match.

## Project structure
```
public/logo.jpg        clinic logo (header, footer, favicon)
src/main.jsx           page sections and clinic details (CLINIC object at the top)
src/Tooth3D.jsx        3D tooth and animated protection swooshes
src/styles.css         design system, glass UI, responsive styles
vite.config.js         Vite config (GitHub Pages base path)
```

## Content still to update
Search the code for `TODO`:
- Clinic **phone** and **WhatsApp** numbers (`CLINIC` in `src/main.jsx`)
- Visiting doctors' names, photos and visiting days
- Patient reviews (the current ones are layout samples)
- Instagram reels (currently a sample video)
- Real clinic photos (currently free Unsplash stock images)

---
© United Smiles Family Dentistry, Kochi. All rights reserved.
