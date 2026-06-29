import {RunResource, RunStatus} from "../../common/resources/Run.resource";
import {Button} from "react-native-elements";
import React, {useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import {DateTime} from "luxon";
import {Alert} from "react-native";
import {AuthContainer, RunsContainer} from "../../Provider.component";
import {useNavigation} from "@react-navigation/native";
import {Colors} from "../../common/utils/Color.utils";
import { isStillFarOut, participates } from "../../common/utils/Run.utils";

export interface StatusRunControllerBtnDetailRunComponentProps {
    currentRun: RunResource
}

export function DetailRunsStatusControlBtn({currentRun}: StatusRunControllerBtnDetailRunComponentProps) {
    const navigation = useNavigation();
    const {authenticatedUser} = AuthContainer.useContainer()
    const {startRun, stopRun} = RunsContainer.useContainer();

    if (currentRun.status === RunStatus.PROBLEM) {
        return (
            <View style={styles.problem}>
                <Text>Le status de ce run pose problème!</Text>
                <Text>Merci d'aller voir au bureau ce qu'il en est</Text>
            </View>
        )
    }

    if (participates(currentRun, authenticatedUser) && !isStillFarOut(currentRun) && currentRun.status === RunStatus.READY) {
        return (
            <View>
                <Button
                    buttonStyle={styles.startButton}
                    title={ "COMMENCER LE RUN"}
                    onPress={() => startRun(currentRun)}
                />
            </View>
        );
    }

    if (participates(currentRun, authenticatedUser) && currentRun.status == RunStatus.GONE) {
        return (
            <View>
                <Button
                    title="TERMINER LE RUN"
                    buttonStyle={styles.endButton}
                    onPress={() =>
                        stopRun(currentRun)
                            .then(() => navigation.goBack())
                            .catch(() => Alert.alert("Erreur", "Le run n'a pas pu être terminé."))
                    }
                />
            </View>
        );
    }

    return null


}

const styles = StyleSheet.create({
    startButton: {
        backgroundColor: Colors.LIGHT_BLUE,
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 25,
    },
    endButton: {
        backgroundColor: Colors.ORANGE,
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 25,
    },
    problem: {
        alignItems: "center",
        backgroundColor: "#ffaa00"
    }
})
