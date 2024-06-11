CREATE TABLE `session` (
	`id` text PRIMARY KEY DEFAULT (uuid4()) NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY DEFAULT (uuid4()) NOT NULL,
	`hashed_password` text NOT NULL,
	`role` text DEFAULT 'GUEST' NOT NULL,
	`first_name` text(40),
	`last_name` text(40),
	`email` text NOT NULL,
	`phone` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_phone_unique` ON `user` (`phone`);