# Project status

## Completed
- M0 foundation: npm workspaces with isolated web and API modules.
- Next.js App Router interface with responsive knowledge-first landing page.
- Fastify API with validated health endpoint, structured errors, logging, CORS, rate limiting, and OpenAPI docs.
- PostgreSQL/Redis Docker Compose setup and initial Drizzle schema/migration configuration.

## Pending
- M1 authentication, user accounts, role enforcement, creator applications.
- Video provider, upload/review workflow, discovery, learning features, and moderation (M2–M6).

## Setup
1. Copy `.env.example` to `.env`.
2. Run `npm install`.
3. Run `docker compose up -d`.
4. Run `npm run db:generate` and `npm run db:migrate`.
5. Run `npm run dev`, then open `http://localhost:3000`.
6. API health: `http://localhost:4000/health`; docs: `http://localhost:4000/documentation`.

## Known limitations
- Docker CLI/Desktop is not installed in this development environment, so Compose startup and database migration application must be run after installing Docker Desktop.
- Authentication and external video-provider credentials are intentionally deferred to M1/M2.

## Next milestone
M1: secure authentication, accounts, roles, creator applications, and protected role-specific areas.
