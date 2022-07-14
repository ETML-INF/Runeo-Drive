import {StyleSheet, Text, View} from "react-native";
import React, {PropsWithChildren} from "react";
import {Colors} from "../../utils/Color.utils";
import { colors } from "react-native-elements";

export function MeetingTextComponent(props: PropsWithChildren<any>) {
    return (
        <View style={styles.meeting}>
            <Text>{props.place}</Text>
            <Text>{props.time}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    meeting: {
        fontWeight: "bold",
        borderRadius: 5,
        borderColor: "#008000",
        borderWidth: 3,
        padding: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
});
