import {RunResource, RunStatus} from "../../common/resources/Run.resource";
import {Button} from "react-native-elements";
import React, {useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import {DateTime} from "luxon";
import {AuthContainer, RunsContainer} from "../../Provider.component";
import {useNavigation} from "@react-navigation/native";
import {RunDetailParams} from "../Runs.component";
import {Colors} from "../../common/utils/Color.utils";
import { isStillFarOut, participates } from "../../common/utils/Run.utils";
import { RunsEndPopUpComponent } from "../RunsEndPopUpFuil.component";

export interface StatusRunControllerBtnDetailRunComponentProps {
    currentRun: RunResource
}

export function DetailRunsStatusControlBtn({currentRun}: StatusRunControllerBtnDetailRunComponentProps) {
    const [toggleEndRunPopup, setToggleEndRunPopup] = useState(false);
    const navigation = useNavigation();
    const {authenticatedUser} = AuthContainer.useContainer()
    const {startRun} = RunsContainer.useContainer();

    if (currentRun.status === RunStatus.ERROR) {
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
                <RunsEndPopUpComponent isVisable={toggleEndRunPopup} onPopUpClose={()=>{setToggleEndRunPopup(false)}}/>
                <Button
                    title="TERMINER LE RUN"
                    buttonStyle={styles.endButton}
                    onPress={() => {
                        const params: RunDetailParams = {
                            runId: currentRun.id
                        }
                        setToggleEndRunPopup(true);
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
    },
    problem: {
        alignItems: "center",
        backgroundColor: "#ffaa00"
    }
})
