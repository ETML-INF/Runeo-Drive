/**
 *   Author: Alban Segalen
 *   Create Time: 2026-02-04
 *   Modified by: Alban Segalen
 *   Modified time: 2026-02-05 15:19:03
 *   Description: The picker that represent a group
 */

import { Text, Switch, View, StyleSheet } from "react-native"
import { useState } from "react";

export interface ScheduleGroupPickerProps {
    group: string,
    onShowGroup: Function,
    onHideGroup: Function
}

export function ScheduleGroupPicker(props: ScheduleGroupPickerProps) {
    const [isDisplayed, setIsDisplayed] = useState(false)

    const toggleSwitch = () => {
        //Invoke the show and hide function - isDisplayed is the previous value, because useState triggers a re-render
        !isDisplayed ? props.onShowGroup(props.group) : props.onHideGroup(props.group)
        setIsDisplayed(isDisplayed => !isDisplayed)
    }

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