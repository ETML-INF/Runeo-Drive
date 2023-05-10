/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-10
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-10 11:30:11
 *   Description: represents one users's schedule on on the main schedule, hence the funny name
 */
import {StyleSheet, View, Text} from "react-native";
import React, {} from "react";
import { Colors } from "../common/utils/Color.utils";

interface ScheduleScheduleProps {
    y: number, 
    height: number, 
    text: string
}

export function ScheduleScheduleComponent(props: ScheduleScheduleProps){
    return (
        <View style={[styles.view,{top: props.y, height: props.height}]}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )
}

// this functions allows to add the alpha specification at the end of an hex color string by converting 
// a developper friendly number between 0 and 1 to the hex equivalent. It has been coded by user956584
// on StackOverflow : https://stackoverflow.com/questions/19799777/how-to-add-transparency-information-to-a-hex-color-code
function addAlpha(color : string, opacity: number) {
    // coerce values so ti is between 0 and 1.
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}

const styles = StyleSheet.create({
    view:{
        position: "absolute",
        width: "85%",
        left: "14.6%",

        backgroundColor: addAlpha(Colors.STATUS_READY, 0.13),

        borderLeftColor: Colors.STATUS_READY,
        borderLeftWidth: 3,
    },
    text:{
        position: "relative",
        top: -25,
        left: 5,
        fontSize: 16,
        color: Colors.STATUS_READY,
    }
});