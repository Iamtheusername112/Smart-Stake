CREATE TABLE "landing_pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"content" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"conversion_rate" numeric(5, 2) DEFAULT '0',
	"total_visits" integer DEFAULT 0,
	"total_conversions" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "landing_pages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "revenue_tracking" (
	"id" serial PRIMARY KEY NOT NULL,
	"lead_id" integer,
	"affiliate_program" varchar(100) NOT NULL,
	"conversion_type" varchar(50) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"commission" numeric(10, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD',
	"status" varchar(20) DEFAULT 'pending',
	"tracking_id" varchar(255),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "traffic_sources" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"platform" varchar(100),
	"cost_per_click" numeric(10, 4),
	"cost_per_conversion" numeric(10, 2),
	"total_spent" numeric(10, 2) DEFAULT '0',
	"total_clicks" integer DEFAULT 0,
	"total_conversions" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_segments" (
	"id" serial PRIMARY KEY NOT NULL,
	"lead_id" integer,
	"segment_name" varchar(100) NOT NULL,
	"segment_data" json,
	"assigned_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "revenue_tracking" ADD CONSTRAINT "revenue_tracking_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_segments" ADD CONSTRAINT "user_segments_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;