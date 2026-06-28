import {DateTime} from "luxon";
import {List} from "immutable";
import {RunnerResource} from "./Runner.resource";
import {CommonResource} from "./Common.resource";

export enum RunStatus {
    GONE = "started",
    FINISHED = "completed",
    NEEDS_FILLING = "to_complete",
    DRAFTING = "drafting",
    ERROR = "error",
    READY = "ready",
    CANCELLED = "cancelled",
    UNPUBLISHED = "unpublished",
    ALMOSTREADY = "almost",
    PROBLEM = "problem"
}

export interface RunResource extends CommonResource {
    status: RunStatus,
    title: string,
    begin_at: DateTime,
    start_at: DateTime,
    updated_at: DateTime,
    acknowledged_at: DateTime,
    pax_tbc: number,
    end_at: DateTime,
    finished_at: DateTime,
    nb_passenger: number,
    runinfo: string,
    name_contact: string,
    num_contact: string,
    good_for_me: boolean,
    driver_can_apply: boolean,
    driver_can_pick_vehicle: boolean,
    google?: string,
    waypoints: List<Waypoint>,
    runners: List<RunnerResource>,
    artist_id: number
}

export interface Waypoint {
    nickname: string,
    is_meeting: number,
    passing_time: string,
}
