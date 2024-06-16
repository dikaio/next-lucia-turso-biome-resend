import { userTable } from "@/lib/db/schema/user";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const SignUpSchema = z
	.object({
		email: z.string().email().toLowerCase().trim(),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

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
