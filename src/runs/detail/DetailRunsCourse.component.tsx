import {RunResource} from "../../common/resources/Run.resource";
import {Text, View} from "react-native";
import {DURATION_FORMAT} from "../../common/utils/Date.utils";
import React, {Fragment} from "react";
import {CardComponentWithIcon} from "../../common/component/Card.component";
import {ImportantTextComponent} from "../../common/component/text/ImportantText.component";
import {MeetingTextComponent} from "../../common/component/text/MeetingText.component";
import {InlineTextComponent} from "../../common/component/text/InlineText.component";

export interface CourseDetailRunsComponentProps {
    currentRun: RunResource
}

export function DetailRunsCourseComponent({currentRun}: CourseDetailRunsComponentProps) {
    const runDuration = currentRun.finished_at.diff(currentRun.begin_at);

    return (
        <CardComponentWithIcon title={"Parcours"} icon={"map-marked-alt"}>
            <View>
                {currentRun.waypoints.map((waypoint, idx) => (
                    waypoint.meeting_time ?
                    <MeetingTextComponent key={idx}>{waypoint.nickname} - {waypoint.meeting_time}</MeetingTextComponent> :
                    <ImportantTextComponent key={idx}>{waypoint.nickname}</ImportantTextComponent>))}
            </View>
            {runDuration.isValid ? (
                <InlineTextComponent>
                    <Text>Durée estimée </Text>
                    <ImportantTextComponent>{runDuration.toFormat(DURATION_FORMAT)}</ImportantTextComponent>
                </InlineTextComponent>
            ) : <Fragment/>}

        </CardComponentWithIcon>
    )
}
