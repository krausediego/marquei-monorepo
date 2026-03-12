CREATE TYPE "public"."invitation_type" AS ENUM('pending', 'accepted', 'expired', 'rejected');--> statement-breakpoint
ALTER TABLE "invitations" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."invitation_type";--> statement-breakpoint
ALTER TABLE "invitations" ALTER COLUMN "status" SET DATA TYPE "public"."invitation_type" USING "status"::"public"."invitation_type";--> statement-breakpoint