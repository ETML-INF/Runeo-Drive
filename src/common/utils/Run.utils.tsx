import {Icon} from "react-native-elements";
import React from "react";
import {RunResource, RunStatus} from "../resources/Run.resource";
import {Colors} from "./Color.utils";
import { UserResource } from "../resources/User.resource";
import { RunnerResource } from "../resources/Runner.resource";
import { DateTime } from "luxon";
import { View, StyleSheet } from "react-native";

const runStatusIconMapping: Record<string, string> = {
    [RunStatus.GONE]: 'shipping-fast',
    [RunStatus.FINISHED]: 'check-circle',
    [RunStatus.ERROR]: 'exclamation-circle',
    [RunStatus.READY]: 'thumbs-up',
    [RunStatus.NEEDS_FILLING]: 'question-circle',
    [RunStatus.ALMOSTREADY]: 'question-circle',
}

export function getRunStatusIcon(status: string) {
    let iconName = runStatusIconMapping[status] || 'question-circle';

    if (status == RunStatus.ALMOSTREADY) {
        return (
            <View style={styles.runicon}>
                <Icon type='font-awesome-5' size={15} name={iconName} color={Colors.BLUE}/>
                <Icon type='font-awesome-5' size={15} name='car' color={Colors.BLUE}/>
            </View>
        )
    } else if (status == RunStatus.NEEDS_FILLING) {
        return (
            <View style={styles.runicon}>
                <Icon type='font-awesome-5' size={15} name={iconName} color={Colors.BLUE}/>
                <Icon type='font-awesome-5' size={15} name='user' color={Colors.BLUE}/>
            </View>
        )
    } else {
        return (
            <View style={styles.runicon}>
                <Icon type='font-awesome-5' name={iconName} color={Colors.BLUE}/>
            </View>
        )
    }
}

// Helpers for the run detailed view

// Tells if the given user is allowed to select the vehicle for a certain runner (transport) within a run
export function canSelectVehicle (user: UserResource, runner: RunnerResource, run: RunResource) : boolean {
    return (runner.vehicle == null) && 
            (run.status != RunStatus.FINISHED) && 
            (runner.user != null) && 
            (runner.user.id == user.id) &&
            (runner.vehicle_category != null)
}

// Tells if the given user is allowed to change the selected vehicle for a certain runner (transport) within a run
export function canChangeVehicle (user: UserResource, runner: RunnerResource, run: RunResource) : boolean {
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
            (!participates(run, user))
}

// Tells if the run is still far in the future (thus can be quit by the driver)
export function isStillFarOut(run: RunResource) {
    return run.begin_at.diff(DateTime.local()).as("hour") > 4
}

// Tels if the user is one of the drivers involved in the run
export function participates (run: RunResource, user?: UserResource, ) {
    if (!user) return false
    return !!run.runners.find(runner => runner.user?.id === user?.id);
}

export function statusColor(run: RunResource) {
    switch (run.status) {
        case 'gone':
            return Colors.STATUS_GONE
        break
        case 'needs_filling':
        case 'almostready':
            return Colors.STATUS_NEED
            break
        case 'error':
            return Colors.STATUS_PROBLEM
        break
        case 'ready':
            return Colors.STATUS_READY
        break
        default:
            return Colors.GREY;
        }
}

const styles = StyleSheet.create({
    runicon: {
        width: 30
    },
});