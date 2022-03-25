import {Alert, SafeAreaView, StyleSheet, View} from "react-native";
import React from "react";
import {AuthContainer} from "../Provider.component"
import {ButtonComponent} from "../common/component/ButtonComponent";
import { InfoComponent } from "../common/component/InfoComponent";

export function ParamsComponent() {
    const authContainer = AuthContainer.useContainer();

    const onLogoutPress = () => {
        Alert.alert(
            'Déconnexion',
            'Voulez-vous vraiment vous déconnecter ?',
            [
                {
                    text: 'Annuler'
                },
                {
                    text: 'Oui',
                    onPress: () => authContainer.logout()
                }
            ]
        )
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <InfoComponent style={styles.container}/>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <ButtonComponent titleStyle={styles.buttonTitle} title="Déconnexion" onPress={onLogoutPress}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
    },
    container: {
        flex: 1,
        padding: 10,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
    },
    buttonWrapper: {
        flex: 1,
        padding: 5
    },
    buttonTitle: {
        marginVertical: 5,
    }
})
