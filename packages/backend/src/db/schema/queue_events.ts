import { integer, pgEnum, pgTable, timestamp } from "drizzle-orm/pg-core";
import { queue_entries } from "./queue_entries";
import { stations } from "./stations";

export const eventTypeEnum = pgEnum("eventTypes", [""])

export const queue_events = pgTable('queue_events', {
    event_id: integer().primaryKey().generatedAlwaysAsIdentity(),
    queue_id: integer().references(() => queue_entries.queue_id).notNull(),
    station_id: integer().references(() => stations.station_id),
    event_type: eventTypeEnum(),
    event_timestamp: timestamp().notNull()
})