/**
 *   Author: Alban Segalen
 *   Create Time: 2026-02-04
 *   Modified by: Alban Segalen
 *   Modified time: 2026-02-04 08:24:04
 *   Description: A dropdown picker that allow the user to choose which schedules will be displayed
 */

import { Text, Switch, View, StyleSheet, ScrollView } from "react-native"
import { ScheduleResource } from "../common/resources/Schedule.resourse";
import { List } from "immutable";
import { ScheduleGroupPicker } from "./ScheduleGroupPicker.component";
import { useState, useReducer } from "react";

export interface ScheduleDropdownPickerProps {
    schedules: List<ScheduleResource>,
    onFilter: Function
}

export function ScheduleDropdownPicker(props: ScheduleDropdownPickerProps) {
    const orderedGroups = PrepareSchedules(props)

    const [groupsToDisplay, setGroupsToDisplay] = useState(orderedGroups)

    function HideGroupSchedules(name: string) {
        //Remove the key from the object
        setGroupsToDisplay(Object.keys(groupsToDisplay).filter(key => key != name).reduce((acc, key) => {
            acc[key] = groupsToDisplay[key];
            return acc;
        }, {}))
    }

    function ShowGroupSchedules(name: string) {
        console.log("asdfadfIUFHf " + JSON.stringify(groupsToDisplay))
        groupsToDisplay.push(name)
        groupsToDisplay.sort()
        setGroupsToDisplay(groupsToDisplay)
    }

    console.log("@#@#@#@#@_--_: " + JSON.stringify(groupsToDisplay))
    console.log("@#@DFOSIDJf__D: " + JSON.stringify(orderedGroups))
    props.onFilter(JSON.stringify(groupsToDisplay));

    return (
        <ScrollView>
            {orderedGroups.map((item) => (
                <ScheduleGroupPicker group={item} onShowGroup={ShowGroupSchedules} onHideGroup={HideGroupSchedules}></ScheduleGroupPicker>
            ))}
        </ScrollView>
    )
}

//Group, order and clean a schedule list
function PrepareSchedules(props: ScheduleDropdownPickerProps) {
    //We group the schedules by groups
    const groupedSchedules = props.schedules.groupBy(s => s.group.name)

    //.groupBy return a List of Map, so we clean the object to get an object with each group as a key
    //and an array of schedule as a value
    const cleanObject = JSON.parse(JSON.stringify(groupedSchedules))

    //We order the keys alphabetically so it looks good in the dropdown
    const orderedGroups = Object.keys(cleanObject).sort() // Sort the keys alphabetically

    console.log("XYZ: " + JSON.stringify(Object.keys(cleanObject).sort()))

    return orderedGroups

}
