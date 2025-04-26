/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-10
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-10 10:56:29
 *   Description: represents one Hour of the schedule component. 
 */
import {StyleSheet, View, Text} from "react-native";
import React, {} from "react";

interface ScheduleHourProps {
    hour: string,
    scale: number
}

export function ScheduleHour(props: ScheduleHourProps){
    return(
        <View style={[styles.hourContainer, {height: 2 * props.scale}]}>
            <Text style={styles.hourText}>{props.hour}</Text>
            <View style={styles.hourLinesContainer}>
                <View style={styles.hourLine}></View>
                <View style={styles.halfHourLine}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    hourContainer:{
        flexDirection: "row",
        width: "100%", 
    },
    hourLinesContainer:{
        height: "100%",
        width: "85%",
    },
    hourText:{
        fontSize: 14,
        width: "15%",
        height: "100%",
        
        textAlign: "center",
        textAlignVertical: "center",

        borderRightWidth: 1,
        borderRightColor: '#D9D9D9'
    },
    hourLine:{
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
        height: "50%",
        width: "100%",
    },
    halfHourLine:{
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
        height: "50%",
        width: "100%",
    },
});