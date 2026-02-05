/**
 *   Author: Alban Segalen
 *   Create Time: 2026-02-04
 *   Modified by: Alban Segalen
 *   Modified time: 2026-02-05 15:30:32
 *   Description: A dropdown picker that allow the user to choose which schedules will be displayed
 */

import { View, StyleSheet } from "react-native"
import { ScheduleResource } from "../common/resources/Schedule.resourse";
import { List } from "immutable";
import { ScheduleGroupPicker } from "./ScheduleGroupPicker.component";
import { useState } from "react";
import { Button } from "react-native-elements";

export interface ScheduleDropdownPickerProps {
    schedules: List<ScheduleResource>,
    onFilter: Function
}

export function ScheduleDropdownPicker(props: ScheduleDropdownPickerProps) {
    const orderedGroups = PrepareSchedules(props) //Get the list of groups

    const [groupsToDisplay, setGroupsToDisplay] = useState(orderedGroups); //Hold the array of groups to display
    const [isDisplayed, setIsDisplayed] = useState(false) //Wether the dropdown is collapsed

    //Remove a group from the groupsToDisplay list and return it to the parent component
    function HideGroupSchedules(name: string) {
        setGroupsToDisplay(prev => {
            const updatedGroups = prev.filter(group => group !== name);
            props.onFilter(updatedGroups); // Call the prop function after updating state
            return updatedGroups;
        });
    }

    //Add a group from the groupsToDisplay list and return it to the parent component
    function ShowGroupSchedules(name: string) {
        setGroupsToDisplay(prev => {
            const updatedGroups = [...prev, name].sort();
            props.onFilter(updatedGroups); // Call the prop function after updating state
            return updatedGroups;
        });
    }

    return (
        <View>
            <Button onPress={() => setIsDisplayed(!isDisplayed)} title={!isDisplayed ? "Groupes" : "Cacher"}></Button>
            {orderedGroups.map((item) => (
                //We hide it instead of removing it so you keep the info of which switch is activated
                <View style={isDisplayed ? styles.shown : styles.hidden} key={item.toString()}>
                    <ScheduleGroupPicker group={item.toString()} onShowGroup={ShowGroupSchedules} onHideGroup={HideGroupSchedules}></ScheduleGroupPicker>
                </View>
            ))}
        </View>
    )
}

//Group, order and clean a schedule list. Return an array of groupe name
function PrepareSchedules(props: ScheduleDropdownPickerProps): Array<String> {
    //We group the schedules by groups
    const groupedSchedules = props.schedules.groupBy(s => s.group.name)

    //.groupBy return a List of Map, so we clean the object to get an object with each group as a key
    //and an array of schedule as a value
    const cleanObject = JSON.parse(JSON.stringify(groupedSchedules))

    //We order the keys alphabetically so it looks good in the dropdown
    const orderedGroups = Object.keys(cleanObject).sort() // Sort the keys alphabetically

    return orderedGroups
}

const styles = StyleSheet.create({
    hidden: {
        display: "none"
    },
    shown: {
        display: "flex"
    }
})