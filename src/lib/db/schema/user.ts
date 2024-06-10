import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	// TODO: Lucia modifies the id field and is not using uuid4()
	// for consistency, id would be ideal to have Lucia generate uuid4()
	id: text("id").default(sql`(uuid4())`).notNull().primaryKey(),
	username: text("username").notNull().unique(),
	hashedPassword: text("hashed_password").notNull(),
});
