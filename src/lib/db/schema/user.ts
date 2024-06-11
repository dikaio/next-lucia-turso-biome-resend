import { sql } from "drizzle-orm";
import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userTable = sqliteTable(
	"user",
	{
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
		updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	},
	(table) => {
		return {
			emailIdx: uniqueIndex("email_idx").on(table.email),
		};
	},
);

export const insertUserSchema = createInsertSchema(userTable, {
	id: z.string().uuid(),
	hashedPassword: z.string(),
	role: z.enum(["GUEST", "CUSTOMER", "ADMIN", "SUPERADMIN"]).default("GUEST"),
	firstName: z
		.string()
		.min(1)
		.max(40)
		.regex(/^[\p{L} \p{M}'-]+$/u)
		.trim()
		.optional(),
	lastName: z
		.string()
		.min(1)
		.max(40)
		.regex(/^[\p{L} \p{M}'-]+$/u)
		.trim()
		.optional(),
	email: z.string().email().toLowerCase().trim(),
	phone: z
		.string()
		.regex(/^\+[1-9]\d{7,14}$/) // E.164 format
		.trim()
		.optional(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});
