import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import { z } from "zod";
export function buildApp() { const app = Fastify({ logger: { level: process.env.NODE_ENV === "test" ? "silent" : "info" } }); app.register(cors, { origin: process.env.NODE_ENV === "production" ? false : true }); app.register(rateLimit, { max: 100, timeWindow: "1 minute" }); app.register(swagger, { openapi: { info: { title: "Vidya API", version: "0.1.0", description: "Knowledge-first video platform API" } } }); app.register(swaggerUi, { routePrefix: "/documentation" }); app.get("/health", { schema: { tags: ["system"], response: { 200: { type: "object", required: ["status","timestamp"], properties: { status: { type: "string" }, timestamp: { type: "string" } } } } } }, async () => z.object({ status: z.literal("ok"), timestamp: z.string().datetime() }).parse({ status: "ok", timestamp: new Date().toISOString() })); app.setErrorHandler((error, _request, reply) => { app.log.error(error); const statusCode = typeof (error as { statusCode?: unknown }).statusCode === "number" ? (error as { statusCode: number }).statusCode : 500; return reply.status(statusCode).send({ error: "Internal Server Error" }); }); return app; }
