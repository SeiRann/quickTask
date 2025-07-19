PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_scheduled_tasks` (
	`id` text,
	`task_text` text NOT NULL,
	`task_status` text NOT NULL,
	`task_type` text NOT NULL,
	`task_deadline` text,
	`task_hour` integer,
	`task_minute` integer,
	`subtasks` text,
	CONSTRAINT "status_check" CHECK("__new_scheduled_tasks"."task_status" = 'completed' OR
           "__new_scheduled_tasks"."task_status" = 'uncompleted' OR
           "__new_scheduled_tasks"."task_status" = 'late' OR
           "__new_scheduled_tasks"."task_status" = 'failed'),
	CONSTRAINT "type_check" CHECK("__new_scheduled_tasks"."task_type" = 'daily' OR
           "__new_scheduled_tasks"."task_type" = 'deadline')
);
--> statement-breakpoint
INSERT INTO `__new_scheduled_tasks`("id", "task_text", "task_status", "task_type", "task_deadline", "task_hour", "task_minute", "subtasks") SELECT "id", "task_text", "task_status", "task_type", "task_deadline", "task_hour", "task_minute", "subtasks" FROM `scheduled_tasks`;--> statement-breakpoint
DROP TABLE `scheduled_tasks`;--> statement-breakpoint
ALTER TABLE `__new_scheduled_tasks` RENAME TO `scheduled_tasks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;