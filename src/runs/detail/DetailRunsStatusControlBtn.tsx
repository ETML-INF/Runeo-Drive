import {RunResource, RunStatus} from "../../common/resources/Run.resource";
import {Button} from "react-native-elements";
import React, {useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import {DateTime} from "luxon";
import {Alert} from "react-native";
import {RunsContainer} from "../../Provider.component";
import {useNavigation} from "@react-navigation/native";
import {Colors} from "../../common/utils/Color.utils";
import { isStillFarOut } from "../../common/utils/Run.utils";

export interface StatusRunControllerBtnDetailRunComponentProps {
    currentRun: RunResource
}

export function DetailRunsStatusControlBtn({currentRun}: StatusRunControllerBtnDetailRunComponentProps) {
    const navigation = useNavigation();
    const {startRun, stopRun} = RunsContainer.useContainer();

    if (currentRun.status === RunStatus.PROBLEM) {
        return (
            <View style={styles.problem}>
                <Text>Le status de ce run pose problème!</Text>
                <Text>Merci d'aller voir au bureau ce qu'il en est</Text>
            </View>
        )
    }

    if (currentRun.is_mine && !isStillFarOut(currentRun) && currentRun.status === RunStatus.READY) {
        return (
            <View>
                <Button
                    buttonStyle={styles.startButton}
                    title={ "COMMENCER LE RUN"}
                    onPress={() =>
                        startRun(currentRun)
                            .catch((err) => Alert.alert("Erreur", `Le run n'a pas pu être démarré.\n${err.message}`))
                    }
                />
            </View>
        );
    }

    if (currentRun.is_mine && currentRun.status == RunStatus.GONE) {
        return (
            <View>
                <Button
                    title="TERMINER LE RUN"
                    buttonStyle={styles.endButton}
                    onPress={() =>
                        stopRun(currentRun)
                            .then(() => navigation.goBack())
                            .catch((err) => Alert.alert("Erreur", `Le run n'a pas pu être terminé.\n${err.message}`))
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
