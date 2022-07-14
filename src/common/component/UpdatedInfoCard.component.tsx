import React, {PropsWithChildren} from "react";
import {StyleSheet, StyleProp, Text, TextStyle, View, Button} from "react-native";
import {Colors} from "../utils/Color.utils";
import {Icon} from "react-native-elements";
import { ButtonComponent } from "./ButtonComponent";
import {RunsContainer} from "../../Provider.component";
import { forSlideRight } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/HeaderStyleInterpolators";


export interface UpdatedInfoCardComponentProps {
    title: string
    icon: string
    btnDisabled: boolean
    btnTitle: string
    btnOnPress:() => void
    btnTitleStyle?: StyleProp<TextStyle>
}

export function CardContainerComponent(props: PropsWithChildren<any>) {
    return (
        <View style={styles.card}>
            {props.children}
        </View>
    )
}

export function UpdatedInfoCardComponent(props: PropsWithChildren<any> & UpdatedInfoCardComponentProps) {

    const {acknowledgeRun} = RunsContainer.useContainer();
    return (
        <CardContainerComponent>
            <View style={styles.textWithIcon}>
                <Icon
                    style={styles.icon}
                    type='font-awesome-5'
                    name={`${props.icon}`}
                    size={18}
                    color={Colors.GREEN}
                />
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <ButtonComponent
                    title="C'est noté !"
                    color="#f194ff"
                    onPress={() => acknowledgeRun(props.run.id)}
                />
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
        paddingTop: 15,
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: Colors.GREEN,
        fontFamily: 'Montserrat-Medium',
        fontWeight: "bold",
    },
    textWithIcon: {
        flexDirection: "row",
    },
    icon: {
        marginRight: 7,
        marginLeft: 5,
        marginBottom: 5,
        paddingTop: 15,
    },
    btn: {
        flexDirection: "row",
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    }
});
