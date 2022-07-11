import {Button} from "react-native-elements";
import {StyleProp, StyleSheet, TextStyle} from "react-native";
import React from "react";
import {Colors} from "../utils/Color.utils";

export interface ButtonComponentProps {
    title: string,
    onPress: () => void,
    disabled?: boolean
    color?: string,
    titleStyle?: StyleProp<TextStyle>
}

export function ButtonComponent(props: ButtonComponentProps) {
    let btnStyle = styles.button;

    if (props.color) {
        
        // btnStyle.backgroundColor = props.color
        // console.log(btnStyle)
    }

    return (
        <Button
            disabled={props.disabled}
            buttonStyle={btnStyle}
            titleStyle={props.titleStyle}
            title={props.title}
            onPress={props.onPress}/>

    )
}


const styles = StyleSheet.create({
    button: {
        height: 35,
        backgroundColor: Colors.BLUE,
        borderRadius: 25,

        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        paddingVertical:2
    },
})
