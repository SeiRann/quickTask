import { sql } from "drizzle-orm";
import { int, sqliteTable, text, check } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("scheduled_tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  task_text: text().notNull(),
  task_status: text().notNull(),
  task_type: text().notNull(),
  task_deadline: text(),
  task_hour: int(),
  task_minute: int(),
  subtasks: text(),
}, (table) => {
  return {
    statusCheck: check(
      "status_check",
      sql`${table.task_status} = 'completed' OR
           ${table.task_status} = 'uncompleted' OR
           ${table.task_status} = 'late' OR
           ${table.task_status} = 'failed'`
    ),
    typeCheck: check(
      "type_check",
      sql`${table.task_type} = 'daily' OR
           ${table.task_type} = 'deadline'`
    )
  };
});
