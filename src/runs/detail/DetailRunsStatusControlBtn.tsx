import {RunResource, RunStatus} from "../../common/resources/Run.resource";
import {Button} from "react-native-elements";
import React from "react";
import {StyleSheet, View} from "react-native";
import {DateTime} from "luxon";
import {AuthContainer, RunsContainer} from "../../Provider.component";
import {useNavigation} from "@react-navigation/native";
import {RunDetailParams} from "../Runs.component";
import {Colors} from "../../common/utils/Color.utils";

export interface StatusRunControllerBtnDetailRunComponentProps {
    currentRun: RunResource
}

export function DetailRunsStatusControlBtn({currentRun}: StatusRunControllerBtnDetailRunComponentProps) {
    const navigation = useNavigation();
    const {authenticatedUser} = AuthContainer.useContainer()
    const {startRun} = RunsContainer.useContainer();

    // Define if run starts in more than 4 hours
    const runBeginLater = currentRun.begin_at.diff(DateTime.local()).as("hour") > 4
    const isAuthenticatedUserMemberOfRun = !!currentRun.runners.find(runner => runner.user?.id === authenticatedUser?.id);

    if (isAuthenticatedUserMemberOfRun && currentRun.status === RunStatus.READY) {
        return (
            <View>
                <Button
                    disabled={runBeginLater}
                    buttonStyle={styles.startButton}
                    title="COMMENCER LE RUN"
                    onPress={() => startRun(currentRun)}
                />
            </View>
        );
    }

    if (isAuthenticatedUserMemberOfRun && currentRun.status == RunStatus.GONE) {
        return (
            <View>
                <Button
                    title="TERMINER LE RUN"
                    buttonStyle={styles.endButton}
                    onPress={() => {
                        const params: RunDetailParams = {
                            runId: currentRun.id
                        }

                        navigation.navigate("end_run", params)
                    }}
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
    }
})
