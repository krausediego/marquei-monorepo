ALTER TABLE "users" ALTER COLUMN "phone_number" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone_number_verified" boolean;