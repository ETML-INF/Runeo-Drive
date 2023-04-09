import React from "react";
import {StyleSheet, Image, Text, View, StyleProp, ViewStyle} from "react-native";
import {Colors} from "../utils/Color.utils";
import { ImportantTextComponent } from "./text/ImportantText.component";
import { InlineTextComponent } from "./text/InlineText.component";

export interface InfoComponentProps {
    style?: StyleProp<ViewStyle>,
}

export function InfoComponent(props: InfoComponentProps) {
    return (
        <View style={props.style}>
            <View style={styles.centerContent}>
                <Image
                    style={styles.image}
                    source={require('../../../assets/icon.png')}
                />
            </View>
            <View  style={styles.credits}>
                <Text style={styles.creditsTitle}>Crédits</Text>
                <InlineTextComponent>
                    <Text>Application réalisée par les développeur du </Text>
                    <ImportantTextComponent>CPNV.</ImportantTextComponent> 
                </InlineTextComponent>
                <InlineTextComponent>
                    <ImportantTextComponent>Ansermoz </ImportantTextComponent> 
                    <Text>Gwenael, </Text>
                    <ImportantTextComponent>Berdoz </ImportantTextComponent> 
                    <Text>Noe, </Text>
                </InlineTextComponent>
                <InlineTextComponent>
                    <ImportantTextComponent>Butticaz </ImportantTextComponent> 
                    <Text>Yvann, </Text>
                    <ImportantTextComponent>Pereira </ImportantTextComponent> 
                    <Text>Gabriel, </Text>
                </InlineTextComponent>
                <InlineTextComponent>

                    <ImportantTextComponent>Santos Oliveira </ImportantTextComponent> 
                    <Text>Andi, </Text>
                    <ImportantTextComponent>Schouwey </ImportantTextComponent> 
                    <Text>Zaïd</Text>
                </InlineTextComponent>
            </View>
            <Text style={styles.version}>Version actuelle 2023.1</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    credits: {
        flex: 1,
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    },
    creditsTitle: {
        color: Colors.BLUE,
        paddingBottom: 5,
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    version: {
        textAlign: 'right',
    },
})

