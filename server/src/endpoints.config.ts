import {z} from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    JWT_SECRET: z.string(),
    MONGO_URL: z.string(),
    GOOGLE_API_KEY: z.string(),
    QDRANT_API_KEY: z.string(),
    QDRANT_URL: z.string(),
});
const env = envSchema.parse(process.env);


export default env;