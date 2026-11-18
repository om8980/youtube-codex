import "dotenv/config";
import { z } from "zod";
const environment = z.object({ NODE_ENV: z.enum(["development","test","production"]).default("development"), API_PORT: z.coerce.number().int().positive().default(4000), DATABASE_URL: z.string().url().default("postgresql://vidya:vidya_dev_password@localhost:5432/vidya") }).parse(process.env);
export { environment };
