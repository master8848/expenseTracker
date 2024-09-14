import { sql } from "drizzle-orm";
import {
  date,
  doublePrecision,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const loans = pgTable("loans", {
  id: serial("id").primaryKey().notNull(),
  to: text("to").notNull(),
  amount: doublePrecision("amount").notNull(),
  description: text("description"),
  returnDate: date("return_date").notNull(),
  contact: text("contact"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  modifiedAt: timestamp("modified_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => sql`now()`),
});
