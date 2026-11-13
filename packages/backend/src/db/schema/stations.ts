import { pgTable, integer, text, boolean } from "drizzle-orm/pg-core"

export const stations = pgTable('stations', {
    station_id: integer().primaryKey().generatedAlwaysAsIdentity(),
    station_name: text().notNull(),
    is_available: boolean().notNull(),
    is_active: boolean().notNull()
})