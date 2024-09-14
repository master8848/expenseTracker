/**
 * Creates the tables in the database if they don't exist
 *
 * @param versionExecuted The version of the migrations that have been executed
 * @returns The version of the migrations that have been executed
 */
export async function createTables(versionExecuted: string): Promise<string> {
  //   if (versionExecuted != Migrations.latest && isOnline())
  //     db.execute(Migrations.v1);
  return Migrations.latest;
}

const Migrations = {
  latest: "v1",
  v1: `CREATE TABLE IF NOT EXISTS "expense" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" numeric NOT NULL,
	"description" text,
	"date" date DEFAULT now() NOT NULL,
	"category" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "income" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" numeric NOT NULL,
	"description" text,
	"date" date DEFAULT now() NOT NULL,
	"category" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "loans" (
	"id" numeric PRIMARY KEY DEFAULT generated by default as identity NOT NULL,
	"to" text NOT NULL,
	"amount" double precision NOT NULL,
	"description" text,
	"return_date" date NOT NULL,
	"contact" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL
);
`,
};
