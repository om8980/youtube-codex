import { buildApp } from "./app.js";
import { environment } from "./config.js";
const app = buildApp();
app.listen({ port: environment.API_PORT, host: "0.0.0.0" }).catch((error) => { app.log.error(error); process.exit(1); });
