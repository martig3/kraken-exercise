CREATE TABLE `files` (
	`path` text PRIMARY KEY NOT NULL,
	`coverage` integer NOT NULL,
	`repo_id` text(36) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `repo_id` ON `files` (`repo_id`);--> statement-breakpoint
CREATE TABLE `repos` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`url` text NOT NULL
);
