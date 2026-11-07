---
description: Strict deployment, environment variable, security, and allowed_hosts rules
---

# Mandatory Deployment & Environment Rules

1. **Port Numbers Strictly Managed by `.env`**:
   - Server and proxy port numbers (`PORT`, `PROXY_PORT`, `HOSTNAME`) must ONLY be managed via `.env` (loaded via `scripts/start-server.mjs`). Never hardcode ports in code or start scripts.
2. **Zero Vulnerable Modules**:
   - Never install or use packages with known security vulnerabilities (`npm audit` must report `0 vulnerabilities`).
3. **Allowed Hosts Mapped via `.env`**:
   - Always map `ALLOWED_HOSTS` from `.env` in `next.config.mjs` (`allowedDevOrigins`, `experimental.serverActions.allowedOrigins`) or `vite.config.js` (`server.allowedHosts: true` / `.env` list) so `"Blocked request. This host is not allowed"` errors never occur on any domain.
4. **Full Production Build & Start Verification Before Deployment**:
   - Always test the full production pipeline before completing deployment:
     1. `npm install` (and `npm audit`)
     2. `npm run build`
     3. `npm start` (verifying the live server binds to the `.env` port and responds with `200 OK`).
