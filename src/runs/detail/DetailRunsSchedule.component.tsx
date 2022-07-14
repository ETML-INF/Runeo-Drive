import React from "react";
import {Text, View, StyleSheet} from "react-native"
import {RunResource} from "../../common/resources/Run.resource";
import {dateWithLocalDay} from "../../common/utils/Date.utils";
import {CardComponentWithIcon} from "../../common/component/Card.component";

export interface DetailRunsScheduleComponent {
    currentRun: RunResource
}

export function DetailRunsScheduleComponent({currentRun}: DetailRunsScheduleComponent) {
    return (
        <View>
            <Text style={styles.title}>Run #{ currentRun.id } du { dateWithLocalDay(currentRun.begin_at)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        textAlign: "center"
    },
})
