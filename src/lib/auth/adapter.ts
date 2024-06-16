import { db } from "@/lib/db";
import { sessionTable, userTable } from "@/lib/db/schema";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export { adapter };
