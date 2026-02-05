CREATE TABLE "card_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"background_image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flowers" (
	"id" serial PRIMARY KEY NOT NULL,
	"flower_type" varchar(50) NOT NULL,
	"color_variant" varchar(50) NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shared_cards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_id" serial NOT NULL,
	"selected_flower_ids" jsonb NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shared_cards" ADD CONSTRAINT "shared_cards_template_id_card_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."card_templates"("id") ON DELETE no action ON UPDATE no action;