CREATE TABLE IF NOT EXISTS "expense" (
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
	"id" serial PRIMARY KEY  NOT NULL,
	"to" text NOT NULL,
	"amount" double precision NOT NULL,
	"description" text,
	"return_date" date NOT NULL,
	"contact" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL
);