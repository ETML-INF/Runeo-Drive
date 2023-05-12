/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-10
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-12 15:07:42
 *   Description: represents one users's run on on the main schedule, with the particularity that it adapts 
 *      to the place available. 
 */
import {StyleSheet, View, Text} from "react-native";
import React, {} from "react";
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
        <View style={[styles.container,{top: props.y, height: props.height, backgroundColor: Colors.STATUS_NEED }]}>
            <View>
                <Text style={styles.id}>{'#' + props.run.id}</Text>
            </View>
            <View>
                <Text>{props.run.title}</Text>
            </View>
        </View>
    )
}

function isMultiple(run: RunResource){
    return run.runners.count() > 1
}

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        width: "80%",
        left: "16%",
        borderRadius: 15,
    },
    id:{
        fontSize: 20,
        fontWeight: "bold",
    },
    leftContainer:{

    }
})