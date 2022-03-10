import Axios from "axios";
import React from "react";
import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import ConfirmState from "./Confirmstate.component";
import { AuthContainer } from "../Provider.component";
import RequestedState from "./Requestedstate.component";
import {ScrollView} from "react-native";

const RunnersEnrollment = (props: any) => {
    const {authenticatedUser} = AuthContainer.useContainer();
    let response = <View></View>;

    switch (authenticatedUser?.status) {
        case "inactive":
            response = <View><Text>Vous n'êtes pas sollicité pour le moment.</Text></View>;
            break;
        case "requested":
            response = <RequestedState setNewState={setNewState}/>
            break;
        case "retired":
            response = <View><Text>Vous n'êtes plus sollicité pour runeo.</Text></View>
            break;
        case "confirmed":
            response = <ConfirmState setNewState={setNewState}/>;
            break;
        case "validated":
            response = <View><Text>En attente de la validation d'engagement de la part d'un administrateur.</Text></View>
            break;
        default:
            console.log(authenticatedUser?.status);
            break;
    }
    async function setNewState(stateId: number) {
        Axios.patch(`/users/${authenticatedUser?.id}/status`, { "status_id": stateId }).then((res) => {
            props.refreshAuth();
        }).catch((err) => { 
            throw err.message;
         })
    }
    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView>
                <View style={styles.textCenter}>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 30, marginBottom: 50 }}>Processus d'inscription</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    {response}
                </View>
            </ScrollView>
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
