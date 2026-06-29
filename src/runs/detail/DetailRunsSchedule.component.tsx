import React from "react";
import {Text, View, StyleSheet} from "react-native"
import {RunResource} from "../../common/resources/Run.resource";
import {dateWithLocalDay} from "../../common/utils/Date.utils";
import {CardComponentWithIcon} from "../../common/component/Card.component";
import {statusColor, statusLabel} from "../../common/utils/Run.utils";

export interface DetailRunsScheduleComponent {
    currentRun: RunResource
}

export function DetailRunsScheduleComponent({currentRun}: DetailRunsScheduleComponent) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Run #{ currentRun.id } du { dateWithLocalDay(currentRun.begin_at)}</Text>
            <View style={[styles.badge, {backgroundColor: statusColor(currentRun)}]}>
                <Text style={styles.badgeText}>{statusLabel(currentRun)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 4,
    },
    title: {
        fontSize: 18,
        textAlign: "center"
    },
    badge: {
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    badgeText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },
})
