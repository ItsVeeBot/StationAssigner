CREATE TYPE "statuses" AS ENUM('available', 'busy', 'down');--> statement-breakpoint
CREATE TYPE "eventTypes" AS ENUM('');--> statement-breakpoint
CREATE TABLE "guests" (
	"guest_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "guests_guest_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"display_name" text NOT NULL,
	"phone_number" text,
	"sms_consent" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "queue_entries" (
	"queue_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "queue_entries_queue_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"queue_number" integer NOT NULL,
	"arrival_time" timestamp NOT NULL,
	"status" "statuses" NOT NULL,
	"guest_id" integer NOT NULL,
	"assigned_station_id" integer
);
--> statement-breakpoint
CREATE TABLE "queue_events" (
	"event_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "queue_events_event_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"queue_id" integer NOT NULL,
	"station_id" integer,
	"event_type" "eventTypes",
	"event_timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stations" (
	"station_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "stations_station_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"station_name" text NOT NULL,
	"is_available" boolean NOT NULL,
	"is_active" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "queue_entries" ADD CONSTRAINT "queue_entries_guest_id_guests_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guests"("guest_id");--> statement-breakpoint
ALTER TABLE "queue_entries" ADD CONSTRAINT "queue_entries_assigned_station_id_stations_station_id_fkey" FOREIGN KEY ("assigned_station_id") REFERENCES "stations"("station_id");--> statement-breakpoint
ALTER TABLE "queue_events" ADD CONSTRAINT "queue_events_queue_id_queue_entries_queue_id_fkey" FOREIGN KEY ("queue_id") REFERENCES "queue_entries"("queue_id");--> statement-breakpoint
ALTER TABLE "queue_events" ADD CONSTRAINT "queue_events_station_id_stations_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("station_id");