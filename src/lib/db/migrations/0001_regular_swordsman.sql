ALTER TABLE `user` RENAME COLUMN `username` TO `email`;--> statement-breakpoint
DROP INDEX IF EXISTS `user_username_unique`;--> statement-breakpoint
ALTER TABLE `user` ADD `role` text DEFAULT 'GUEST' NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `firstName` text(40) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `lastName` text(40) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `phone` text NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_phone_unique` ON `user` (`phone`);