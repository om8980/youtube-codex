import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import { buildApp } from "./app.js";
const app = buildApp();
after(async () => app.close());
describe("GET /health", () => { it("reports service health", async () => { const response = await app.inject({ method: "GET", url: "/health" }); assert.equal(response.statusCode, 200); assert.equal(response.json().status, "ok"); }); });
