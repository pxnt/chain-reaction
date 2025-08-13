## Chain Reaction

[![Netlify Status](https://api.netlify.com/api/v1/badges/76da6ef3-a136-454b-bde5-a3368fa747ee/deploy-status)](https://app.netlify.com/projects/chain-reaction-fe/deploys)
[![Render API](https://img.shields.io/badge/Render-API%20Live-brightgreen?logo=render)]

Real‑time multiplayer Chain Reaction game. Frontend (Vue 3 + Vite) and Backend (Node.js + Socket.IO + Redis).

### Play online

[Play now](https://chain-reaction.pxnt.me)

### Quick start

Prerequisites: Node 18+, pnpm, Redis running locally

Dev setup (two terminals):

```bash
# 1) Backend
cd be
pnpm install
pnpm dev

# 2) Frontend
cd fe
pnpm install
pnpm dev
```

Environment variables:

```bash
# fe/.env.dev
VITE_NODE_ENV=dev

# fe/.env  (for production builds)
VITE_NODE_ENV=prod
VITE_API_URL=https://YOUR_RENDER_SERVICE_URL

# be/.env
PORT=8080
REDIS=redis://localhost:6379
```

Build:

```bash
cd fe && pnpm build
```

### Deployment

- Netlify (frontend): set base to `fe`, build to `pnpm -C fe build`, publish dir `fe/dist`. Add the Netlify status badge by replacing `YOUR_NETLIFY_BADGE_ID` and `YOUR_NETLIFY_SITE_NAME` above.
- Render (backend): use start command `pnpm prod` in `be`. Link the badge above to your service URL.

### Tech

- Vue 3, TypeScript, Vite, Pinia, Tailwind CSS
- Node.js, Express, Socket.IO, Redis


