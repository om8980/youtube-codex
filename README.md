# Vidya platform

Vidya is an npm-workspace monorepo for a knowledge-first video platform.

## Repository structure

```text
.
├── apps/
│   ├── web/              Next.js 15 App Router frontend
│   └── api/              Fastify REST API and Drizzle schema
├── docker-compose.yml    Local PostgreSQL and Redis only
├── vercel.json           Deploys the web workspace from the repository root
└── package.json          npm workspaces and shared commands
```

## Vercel deployment

This repository deliberately uses two Vercel projects. A Vercel project represents one deployable service; one `vercel.json` cannot turn a monorepo into multiple independently running services.

### 1. Frontend project

Import the repository as a Vercel project from the repository root. The root [vercel.json](./vercel.json) tells Vercel to build only `@vidya/web` with `npm run build -w @vidya/web`. It uses the Next.js framework preset, so Vercel manages the `.next` output automatically—do not set a custom Output Directory.

In **Settings → Build and Deployment** leave Install Command and Output Directory set to **Automatic**. Select Node.js 20 or later. Add `NEXT_PUBLIC_API_URL` once the API has a public URL.

### 2. API project

Create a second Vercel project from the same Git repository. Set its **Root Directory** to `apps/api`; this is required because Vercel Root Directory is a project setting, not a `vercel.json` property. Leave Framework Preset and Build Command on **Automatic**. Vercel's Fastify detection recognizes `apps/api/src/server.ts` and deploys it as one Vercel Function.

Set `DATABASE_URL` to a managed PostgreSQL connection string. Do not use the local Docker hostname or credentials in `.env.example` for production.

### Services not hosted by Vercel

`docker-compose.yml` is for local development. Vercel does not run Docker Compose, PostgreSQL, Redis, or persistent worker processes. Use managed PostgreSQL (for example Neon, Supabase, or RDS) and managed Redis (for example Upstash or Redis Cloud). No background worker exists in the current codebase. When pg-boss is added, run its worker on an always-on worker host such as Render, Railway, Fly.io, or Cloud Run; do not run a long-lived worker inside a Vercel Function.

## Local development

```sh
npm install
npm run dev
```

For local data services, install Docker Desktop and run `docker compose up -d`.
