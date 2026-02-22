ALTER TABLE "organizations" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "logo_key_storage" text;