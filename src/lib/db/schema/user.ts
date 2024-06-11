import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userTable = sqliteTable("user", {
	// TODO: Lucia modifies the id field and is not using uuid4()
	// for consistency, id would be ideal to have Lucia generate uuid4()
	id: text("id").default(sql`(uuid4())`).notNull().primaryKey(),
	hashedPassword: text("hashed_password").notNull(),
	role: text("role", { enum: ["GUEST", "CUSTOMER", "ADMIN", "SUPERADMIN"] })
		.default("GUEST")
		.notNull(),
	firstName: text("first_name", { length: 40 }),
	lastName: text("last_name", { length: 40 }),
	email: text("email").notNull().unique(),
	phone: text("phone").unique(),
	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const insertUserSchema = createInsertSchema(userTable, {
	id: z.string().uuid(),
	role: z.enum(["GUEST", "CUSTOMER", "ADMIN", "SUPERADMIN"]).default("GUEST"),
	firstName: z
		.string()
		.min(1)
		.max(40)
		.regex(/^[a-zA-Z-']+$/)
		.trim()
		.optional(),
	lastName: z
		.string()
		.min(1)
		.max(40)
		.regex(/^[a-zA-Z-']+$/)
		.trim()
		.optional(),
	email: z.string().email().toLowerCase().trim(),
	phone: z
		.string()
		.regex(/^\+[1-9]\d{1,14}$/) // E.164 format
		.trim()
		.optional(),
	createdAt: z.string().datetime().optional(),
	updateAt: z.string().datetime().optional(),
});
