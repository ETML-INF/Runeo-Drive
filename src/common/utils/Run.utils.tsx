import {Icon} from "react-native-elements";
import React from "react";
import {RunResource, RunStatus} from "../resources/Run.resource";
import {Colors} from "./Color.utils";
import { UserResource } from "../resources/User.resource";
import { RunnerResource } from "../resources/Runner.resource";
import { DateTime } from "luxon";

const runStatusIconMapping: Record<string, string> = {
    [RunStatus.GONE]: 'shipping-fast',
    [RunStatus.FINISHED]: 'check-circle',
    [RunStatus.ERROR]: 'exclamation-circle',
    [RunStatus.READY]: 'thumbs-up',
    [RunStatus.ALMOSTREADY]: 'ambulance',
    [RunStatus.NEEDS_FILLING]: 'user-plus'
}

export function getRunStatusIcon(status: string) {
    let iconName = runStatusIconMapping[status] || 'question-circle';

    return <Icon type='font-awesome-5' name={iconName} color={Colors.BLUE}/>
}

// Helpers for the run detailed view

// Tells if the given user is allowed to select the vehicle for a certain runner (transport) within a run
export function canSelectVehicle (user: UserResource, runner: RunnerResource, run: RunResource) : boolean {
    return (runner.vehicle != null) && 
            (run.status != RunStatus.FINISHED) && 
            (runner.user != null) && 
            (runner.user.id == user.id) &&
            (runner.vehicle_category != null)
}

// Tells if the given user can participate to the run
export function canTake (user: UserResource, runner: RunnerResource, run: RunResource) : boolean {
    return (runner.user == null) && 
            (run.status != RunStatus.FINISHED) &&
            (!participates(user,run))
}

// Tells if the run is still far in the future (thus can be quit by the driver)
export function isStillFarOut(run: RunResource) {
    return run.begin_at.diff(DateTime.local()).as("hour") > 4
}

// Tels if the user is one of the drivers involved in the run
export function participates (user: UserResource, run: RunResource) {
    return !!run.runners.find(runner => runner.user?.id === user.id);
}
