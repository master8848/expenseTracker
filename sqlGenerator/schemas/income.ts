import { sql } from "drizzle-orm";
import {
  date,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("income", {
  id: serial("id").primaryKey(),

  amount: numeric("amount").notNull(),
  description: text("description"),
  date: date("date").defaultNow().notNull(),
  category: text("category"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => sql`now()`),
});
