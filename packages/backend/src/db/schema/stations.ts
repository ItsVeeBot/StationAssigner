import { pgTable, integer, text, boolean, pgEnum } from "drizzle-orm/pg-core"

export const statusEnum = pgEnum("station_statuses", ["available", "busy", "down"])

export const stations = pgTable('stations', {
    station_id: integer().primaryKey().generatedAlwaysAsIdentity(),
    station_name: text().notNull(),
    status: statusEnum().notNull(),
    is_enabled: boolean().default(true).notNull()
})