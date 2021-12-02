import {View} from "react-native";
import React from "react";

export interface StatusCircleComponentProps {
    color: string
}

export function StatusCircleComponent(props: StatusCircleComponentProps) {
    return (
        <View style={{borderRadius: 25, backgroundColor: props.color, height: 20, width: 20}}/>
    )
}
