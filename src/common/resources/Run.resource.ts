import {DateTime} from "luxon";
import {List} from "immutable";
import {RunnerResource} from "./Runner.resource";
import {CommonResource} from "./Common.resource";

export enum RunStatus {
    GONE = "gone",
    FINISHED = "finished",
    NEEDS_FILLING = "needs_filling",
    DRAFTING = "drafting",
    ERROR = "error",
    READY = "ready",
    CANCELLED = "cancelled",
    UNPUBLISHED = "unpublished",
    ALMOSTREADY = "almostready"
}

export interface RunResource extends CommonResource {
    status: RunStatus,
    title: string,
    begin_at: DateTime,
    start_at: DateTime,
    updated_at: DateTime,
    acknowledged_at: DateTime,
    pax_tbc: boolean,
    time_tbc: boolean,
    end_at: DateTime,
    finished_at: DateTime,
    nb_passenger: number,
    runinfo: string,
    name_contact: string,
    num_contact: string,
    good_for_me: boolean,
    waypoints: List<Waypoint>,
    runners: List<RunnerResource>,
    artist_id: number
}

export interface Waypoint {
    nickname: string
}
