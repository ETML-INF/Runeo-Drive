import {StyleSheet, Text} from "react-native";
import React, {PropsWithChildren} from "react";
import {Colors} from "../../utils/Color.utils";

export function MeetingTextComponent(props: PropsWithChildren<any>) {
    return (<Text style={styles.meetingText}>{props.children}</Text>)
}

const styles = StyleSheet.create({
    meetingText: {
        fontWeight: "bold",
        backgroundColor: Colors.LIGHT_BLUE,
        borderRadius: 25,
        padding: 5,
    },
});
