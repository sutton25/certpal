<!-- Copilot instructions for AI coding agents working on cert-pal-study-buddy -->
# Quick Guide for AI Code Assistants

Purpose: Help a coding assistant be immediately productive in this repository (frontend + small server + Supabase functions).

- **Repo type:** Vite + React + TypeScript frontend in `src/`. Small Node Express server in `server/` used as an AI proxy. Supabase Edge/Deno function in `supabase/functions/chat/` for an alternative AI integration.

How to run locally
- **Frontend (dev):** from repo root run `npm i` then `npm run dev` (this starts Vite on the default port). See `package.json` scripts.
- **Server (AI proxy):** server folder contains `index.mjs`. Start with `cd server; npm i; npm start` or from repo root: `npm --prefix server start`.
- **AI backends:** The Express server proxies to Ollama at `http://localhost:11434` (see `server/index.mjs`). The Supabase function (`supabase/functions/chat/index.ts`) calls Lovable AI when `LOVABLE_API_KEY` is provided. Ensure Ollama or LOVABLE credentials are available when testing chat.
- **Build / preview:** `npm run build` then `npm run preview` (Vite) to check production output.

Environment variables to be aware of
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` — used by `src/integrations/supabase/client.ts` (Vite exposes these via `import.meta.env`).
- `LOVABLE_API_KEY` — used by `supabase/functions/chat/index.ts` (Deno runtime). Also used when running Lovable AI gateway flows.

Key files and patterns (use these as anchors when making changes)
- `src/` — application code, pages in `src/pages/`, UI components in `src/components/` (shadcn-style components live at `src/components/ui/`).
- `src/App.tsx` — defines routes and mounts the `ChatBot` component; add UI routes above the catch-all `*` route.
- `src/integrations/supabase/client.ts` — single place to create and import the Supabase client; prefer this import pattern: `import { supabase } from "@/integrations/supabase/client";`.
- `server/index.mjs` — Express server that proxies `/api/chat` to Ollama. Logs helpful debug lines; use this when testing local Ollama integration.
- `supabase/functions/chat/index.ts` — Deno-based serverless function for chat; this calls Lovable's AI gateway. This is a separate runtime from the Node `server/` folder.

Conventions and useful tips specific to this repo
- Imports use the `@/` path alias mapped to `src/` (see `tsconfig.json` `paths`). Use `@/` for consistency.
- UI components under `src/components/ui/` are the canonical design system (shadcn variants). Prefer reusing them rather than adding duplicate styles.
- Routes are centrally declared in `src/App.tsx`. Place new routes before the `"*"` route and keep route components in `src/pages/`.
- The chat UX includes a React `ChatBot` component (`src/components/ChatBot.tsx`) that communicates with either `/api/chat` (Node proxy) or Supabase function endpoints depending on deployment. Inspect that component before changing the chat API shape.

Debugging notes for AI-related features
- If chat returns 500s: check whether the Express server is running (`server/index.mjs`) and whether Ollama is reachable at `localhost:11434`.
- For Lovable-based flows, validate that `LOVABLE_API_KEY` is set in the environment used by the Deno function or your deployment.
- Watch logs: `server/index.mjs` prints incoming messages and Ollama responses; `supabase/functions/chat/index.ts` logs request counts and gateway errors.

When making changes, prefer minimal surface edits
- Keep UI component props and exported names stable. Many files import from `@/components/ui/*` and rely on exported component names.
- When changing chat request/response shapes, update `src/components/ChatBot.tsx`, `server/index.mjs`, and `supabase/functions/chat/index.ts` together to avoid runtime mismatches.

If you need further context or want this doc expanded (examples of common PR text, linting rules, or test commands), say which area to expand.

---
Files referenced: `package.json`, `server/index.mjs`, `supabase/functions/chat/index.ts`, `src/App.tsx`, `src/components/ChatBot.tsx`, `src/integrations/supabase/client.ts`, `tsconfig.json`.
