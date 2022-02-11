import Axios from "axios";
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, StyleSheet, Button } from "react-native";
import { ButtonComponent } from "../common/component/ButtonComponent";
import ConfirmState from "./Confirmstate.component";
import { AuthContainer } from "../Provider.component";

const RunnersEnrollment = (props: any) => {
    const {authenticatedUser} = AuthContainer.useContainer();
    let response = <View></View>;
    switch (authenticatedUser?.status) {
        case "inactive":
            response = <View><Text>On n'a pas besoin de toi, Merci.</Text></View>;
            break;
        case "requested":
            response = (
                <View>
                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Participer en tant que conducteur pour le Runeo de cette année ?</Text>
                    <View style={{ marginTop: 10 }}>
                        <ButtonComponent
                            title="Je participe"
                            onPress={() => setNewState(3)}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <ButtonComponent
                            title="Je ne participe pas"
                            onPress={() => setNewState(1)}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <ButtonComponent
                            title="Je ne veux plus jamais participer en tant que conducteur"
                            onPress={() => setNewState(8)}
                        />
                    </View>
                </View>
            )
            break;
        case "retired":
            response = <View><Text>Vous n'êtes plus sollicité pour runeo.</Text></View>
            break;
        case "confirmed":
            response = <ConfirmState refreshAuth={props.refreshAuth}/>;
            break;
        case "validated":
            response = <View><Text>En attente de la validation d'engagement de la part d'un administrateur.</Text></View>
            break;
        default:
            break;
    }
    async function setNewState(stateId: number) {
        console.log("Setting new state....")
        Axios.patch(`/users/${authenticatedUser?.id}/status`, { "status_id": stateId }).then((res) => {
            props.refreshAuth();
        }).catch((err) => { console.log("Erreur lors de la new state" + err.message) })
    }
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.textCenter}>
                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 30, marginBottom: 50 }}>Processus d'inscription</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                {response}
            </View>
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
export default RunnersEnrollment;
