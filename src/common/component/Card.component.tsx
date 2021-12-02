import React, {PropsWithChildren} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Colors} from "../utils/Color.utils";
import {Icon} from "react-native-elements";


export interface CardComponentProps {
    title: string
    icon: string
}

export function CardContainerComponent(props: PropsWithChildren<any>) {
    return (
        <View style={styles.card}>
            {props.children}
        </View>
    )
}

export function CardComponent(props: PropsWithChildren<any> & CardComponentProps) {
    return (
        <CardContainerComponent>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </CardContainerComponent>
    )
}

export function CardComponentWithIcon(props: PropsWithChildren<any> & CardComponentProps) {
    return (
        <CardContainerComponent>
            <View style={styles.textWithIcon}>
                <Icon
                    style={styles.icon}
                    type='font-awesome-5'
                    name={`${props.icon}`}
                    size={18}
                    color='#055BA6'
                />
                <Text style={styles.title}>
                    {props.title}
                </Text>
            </View>
            {props.children}
        </CardContainerComponent>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 7,
        marginRight: 7,

        padding: 15,
        borderRadius: 10,
        backgroundColor: Colors.WHITE,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    title: {
        color: Colors.BLUE,
        paddingBottom: 5,
        fontFamily: 'Montserrat-Medium',
    },
    textWithIcon: {
        flexDirection: "row",
    },
    icon: {
        marginRight: 5,
        marginBottom: 5,

    }
});
