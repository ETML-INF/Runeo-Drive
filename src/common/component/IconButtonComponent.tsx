/**
 *  ETML
 *   De: Theo Bensaci
 *   Date: 08:34 01.02.2023
 *   Description: Button contenant un icon (compenent)
 */


import {Button} from "react-native-elements";
import {StyleProp, StyleSheet, Text, View ,TextStyle, TouchableOpacity, Image} from "react-native";
import React from "react";
import {Colors} from "../utils/Color.utils";

export interface IconButtonComponentValue {
    title: string,
    onPress: () => void,
    height?: number,
    width?:number,
    disabled?: boolean
    color?: string,
    addStyle?: Object,
    addTextStyle?:Object,
    icon?: Element
}

export function IconButtonComponent(props: IconButtonComponentValue) {

    return (
        <TouchableOpacity 
            disabled={props.disabled}
            style={[styles.button, props.addStyle, {
                minHeight:props.height,
                minWidth:props.width,
                backgroundColor:(props.color==undefined)?Colors.BLUE:props.color
            }]}
            onPress={props.onPress}>
                <View style={styles.imageInBnt}>
                    {props.icon}
                </View>
                <Text style={[styles.textInBnt, props.addTextStyle]}>{props.title}</Text>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    button: {
        margin:10,
        borderRadius: 15,

        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding:10,
        flexDirection: "row", 
        height:60,
        alignItems:"center",
        justifyContent: "space-between"
    },
    imageInBnt:{
        height: "100%",
        minWidth:"10%",
        resizeMode:"contain",
        flexDirection: "row", 
        justifyContent: "center",
        alignItems:"center"
    },
    textInBnt:{
        height: "100%",
        color: "#fff",
        textAlignVertical: 'center',
        fontWeight: 'bold',
    }
    
})
