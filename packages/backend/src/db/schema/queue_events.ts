import { integer, pgEnum, pgTable, timestamp } from "drizzle-orm/pg-core";
import { queue_entries } from "./queue_entries";
import { stations } from "./stations";

export const eventTypeEnum = pgEnum("eventTypes", [
    "guest_checked_in", 
    "guest_assigned", 
    "guest_called", 
    "service_started", 
    "guest_completed", 
    "guest_skipped", 
    "station_marked_down", 
    "station_restored", 
    "assignment_transferred"
])

export const queue_events = pgTable('queue_events', {
    event_id: integer().primaryKey().generatedAlwaysAsIdentity(),
    queue_id: integer().references(() => queue_entries.queue_id),
    station_id: integer().references(() => stations.station_id),
    event_type: eventTypeEnum().notNull(),
    event_timestamp: timestamp({withTimezone: true}).defaultNow().notNull()
})