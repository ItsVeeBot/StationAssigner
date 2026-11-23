import { integer, pgEnum, pgTable, timestamp } from "drizzle-orm/pg-core";
import { queue_entries } from "./queue_entries";
import { stations } from "./stations";

export const assignment_status = pgEnum('assignment_statuses', ["active", "completed", "transferred", "cancelled"])

export const queue_assignments = pgTable('queue_assignments', {
    assignment_id: integer().primaryKey().generatedAlwaysAsIdentity(),
    queue_id: integer().references(()=>queue_entries.queue_id),
    station_id: integer().references(()=>stations.station_id),
    assigned_at: timestamp({withTimezone:true}),
    started_at: timestamp({withTimezone:true}),
    ended_at: timestamp({withTimezone:true})
})