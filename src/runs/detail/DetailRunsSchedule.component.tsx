import React from "react";
import {Text, View, StyleSheet} from "react-native"
import {RunResource} from "../../common/resources/Run.resource";
import {DATE_ONLY_FORMAT} from "../../common/utils/Date.utils";
import {CardComponentWithIcon} from "../../common/component/Card.component";

export interface DetailRunsScheduleComponent {
    currentRun: RunResource
}

export function DetailRunsScheduleComponent({currentRun}: DetailRunsScheduleComponent) {
    return (
        <View>
            <Text style={styles.title}>Run #{ currentRun.id } du { currentRun.begin_at.toFormat(DATE_ONLY_FORMAT)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        textAlign: "center"
    },
})
