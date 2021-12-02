import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {TokenAuthComponent} from "./TokenAuth.component";
import {QrAuthComponent} from "./QrAuth.component";

export function AuthComponent() {
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.textCenter}>
                <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 30, marginBottom: 50}}>Runeo Drive</Text>
            </View>


            <TokenAuthComponent/>
            <View style={styles.textCenter}>
                <Text style={{fontFamily: 'Montserrat-ExtraBold', marginTop: 30, fontSize: 15}}>OU</Text>
            </View>
            <QrAuthComponent/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        margin: 30
    },
    textCenter: {
        flexDirection: "row",
        justifyContent: "center",
    }
});
