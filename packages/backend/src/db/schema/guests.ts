import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core"

export const guests = pgTable('guests', {
    guest_id: integer().primaryKey().generatedAlwaysAsIdentity(),
    display_name: text().notNull(),
    phone_number: text(),
    sms_consent: boolean().notNull()
})