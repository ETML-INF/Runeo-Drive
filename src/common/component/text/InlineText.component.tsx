import React, {PropsWithChildren} from "react";
import {StyleSheet, View} from "react-native";

export function InlineTextComponent(props: PropsWithChildren<any>) {
    return (
        <View style={styles.inlineTextWrapper}>
            {props.children}
        </View>
    )
}


const styles = StyleSheet.create({
    inlineTextWrapper: {
        display: "flex",
        flexDirection: "row"
    }
});

