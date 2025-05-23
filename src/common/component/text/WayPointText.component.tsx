import {StyleSheet, Text, View} from "react-native";
import React, {PropsWithChildren} from "react";
import {Colors} from "../../utils/Color.utils";
import { colors } from "react-native-elements";

interface WayPointTextComponentProps{
    place: string,
    time: string,
    isMeeting: boolean,
}

export function WayPointTextComponent(props: WayPointTextComponentProps) {
    return (
        <View style={[styles.basicWayPoint, props.isMeeting ? styles.meeting : {}]}>
            <Text>{props.place}</Text>
            <Text>{props.time}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    meeting: {
        borderRadius: 8,
        backgroundColor: "#00C000",
    },
    basicWayPoint: {
        fontWeight: "bold",
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
