/**
 *   Author: Alban Segalen
 *   Create Time: 2026-02-04
 *   Modified by: Alban Segalen
 *   Modified time: 2026-02-04 10:54:55
 *   Description: The picker that represent a group
 */

import { Text, Switch, View, StyleSheet, ScrollView } from "react-native"
import { useState } from "react";

export interface ScheduleGroupPickerProps {
    group: string,
    onShowGroup: Function,
    onHideGroup: Function
}

export function ScheduleGroupPicker(props: ScheduleGroupPickerProps) {
    const [isDisplayed, setIsDisplayed] = useState(true)
    const toggleSwitch = () => {
        //Invoke the show and hide function - isDisplayed is the previous value, because useState triggers a re-render
        !isDisplayed ? props.onShowGroup(props.group) : props.onHideGroup(props.group)
        setIsDisplayed(isDisplayed => !isDisplayed)
    }

    console.log("ASDF: "+ props.group)

    return (
        <View style={styles.line} key={props.group}>
            <Switch onValueChange={toggleSwitch} value={isDisplayed}></Switch>
            <Text>{props.group}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    line: {
        display: "flex",
        flexDirection: "row",
    }
})