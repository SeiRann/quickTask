CREATE TABLE `scheduled_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`task_text` text NOT NULL,
	`task_status` text NOT NULL,
	`task_type` text NOT NULL,
	`task_deadline` text,
	`task_hour` integer,
	`task_minute` integer,
	`subtasks` text,
	CONSTRAINT "status_check" CHECK("scheduled_tasks"."task_status" = 'completed' OR
           "scheduled_tasks"."task_status" = 'uncompleted' OR
           "scheduled_tasks"."task_status" = 'late' OR
           "scheduled_tasks"."task_status" = 'failed'),
	CONSTRAINT "type_check" CHECK("scheduled_tasks"."task_type" = 'daily' OR
           "scheduled_tasks"."task_type" = 'deadline')
);
