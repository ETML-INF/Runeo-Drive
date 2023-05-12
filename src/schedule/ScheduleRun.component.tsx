/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-10
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-12 16:01:49
 *   Description: represents one users's run on on the main schedule, with the particularity that it adapts 
 *      to the place available. 
 */
import {StyleSheet, View, Text} from "react-native";
import React, { DOMElement } from "react";
import { Colors } from "../common/utils/Color.utils";
import { RunResource } from "../common/resources/Run.resource";
import { statusColor } from "../common/utils/Run.utils";

interface ScheduleRunProps {
    y: number, 
    height: number, 
    run: RunResource,
}

export function ScheduleRunComponent(props: ScheduleRunProps){
    return (
        <View style={[styles.container,{top: props.y, height: props.height, backgroundColor: statusColor(props.run) }]}>
            <View style={styles.leftContainer}>
                <Text style={styles.id}>{'#' + props.run.id}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Text numberOfLines={props.height/20} style={styles.title}>{props.run.title.toUpperCase()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        width: "80%",
        left: "16%",
        borderRadius: 15,
        flexDirection: 'row',
    },
    id:{
        fontSize: 22,
        fontWeight: "bold",

        marginLeft: 10,

        color: Colors.WHITE,
    },
    title:{
        marginVertical: 3,
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
    leftContainer:{
        width: "18%",
    },
    rightContainer:{
        width:"80%",
    }
})