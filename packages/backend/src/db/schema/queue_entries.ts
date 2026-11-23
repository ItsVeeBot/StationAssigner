import { integer, pgEnum, pgTable, timestamp } from "drizzle-orm/pg-core";
import { guests } from "./guests";
import { stations } from "./stations";

export const statusEnum = pgEnum("entry_statuses", ["waiting", "called", "in_service", "completed", "skipped", "cancelled"])

export const queue_entries = pgTable('queue_entries', {
    queue_id: integer().primaryKey().generatedAlwaysAsIdentity(),
    queue_number: integer().notNull(),
    arrival_time: timestamp({withTimezone:true}).defaultNow().notNull(),
    status: statusEnum().notNull(),
    guest_id: integer().references(() => guests.guest_id).notNull(),
    assigned_station_id: integer().references(() => stations.station_id)
})