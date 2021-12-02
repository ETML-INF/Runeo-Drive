import {StyleSheet, Text} from "react-native";
import React, {PropsWithChildren} from "react";

export function ImportantTextComponent(props: PropsWithChildren<any>) {
    return (<Text style={styles.importantText}>{props.children}</Text>)
}

const styles = StyleSheet.create({
    importantText: {
        fontWeight: "bold"
    },
});
