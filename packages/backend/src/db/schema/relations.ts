import { defineRelations } from "drizzle-orm";
import { guests } from "./guests";
import { queue_entries } from "./queue_entries";
import { queue_events } from "./queue_events";
import { stations } from "./stations";

const relations = defineRelations({guests, queue_entries, queue_events, stations}, (r)=>({
    queue_entries: {
        guest: r.one.guests({
            from: r.queue_entries.guest_id,
            to: r.guests.guest_id
        }),
        assigned_station: r.one.stations({
            from: r.queue_entries.assigned_station_id,
            to: r.stations.station_id,
            optional:true
        })
    },
    queue_events: {
        station: r.one.stations({
            from: r.queue_events.station_id,
            to: r.stations.station_id,
            optional:true
        }),
        queue_entry: r.one.queue_entries({
            from: r.queue_events.queue_id,
            to: r.queue_entries.queue_id
        })
    }
}))