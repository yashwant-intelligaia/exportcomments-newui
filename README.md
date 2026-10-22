# ExportComments Frontend

Next.js 16 (App Router, SSR) + React 19 + Tailwind CSS v4, styled with the Intelligaia design tokens.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

Set `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_KOA2_BASE_URL` to point at the backend (defaults to localhost:4000 / :8000).
See `CLAUDE.md` for architecture notes.
