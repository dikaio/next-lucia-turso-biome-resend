import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { userTable } from "./user";

export const sessionTable = sqliteTable("session", {
	// TODO: Lucia modifies the id field and is not using uuid4()
	// for consistency, id would be ideal to have Lucia generate uuid4()
	id: text("id").default(sql`(uuid4())`).notNull().primaryKey(),
	userId: text("user_id")
		.references(() => userTable.id, { onDelete: "cascade" })
		.notNull(),
	expiresAt: integer("expires_at").notNull(),
});
