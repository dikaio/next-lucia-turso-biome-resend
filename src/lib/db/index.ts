import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import "dotenv/config";
import dotenv from "dotenv";
import * as schema from "../db/schema";

dotenv.config({
	path: ".env.local",
});

const client = createClient({
	url: process.env.DATABASE_URL ?? "",
	authToken: process.env.DATABASE_AUTH_TOKEN ?? "",
});

const db = drizzle(client, { schema: schema });

export { db };
