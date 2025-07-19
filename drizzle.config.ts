import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts", // Path to your schema file
  out: "./drizzle",         // Where Drizzle will output generated files
  dialect: "sqlite",
  dbCredentials: {
    // Path to your SQLite database file
    // You can change this to whatever .db file you're using
    url: "./dev-db",
  },
});
