import {RunResource} from "../../common/resources/Run.resource";
import {StyleSheet, Text, View} from "react-native";
import {DURATION_FORMAT} from "../../common/utils/Date.utils";
import React, {Fragment} from "react";
import {CardComponentWithIcon} from "../../common/component/Card.component";
import {ImportantTextComponent} from "../../common/component/text/ImportantText.component";
import { WayPointTextComponent } from "../../common/component/text/WayPointText.component";
import {InlineTextComponent} from "../../common/component/text/InlineText.component";
import moment from "moment"

export interface CourseDetailRunsComponentProps {
    currentRun: RunResource
}

export function DetailRunsCourseComponent({currentRun}: CourseDetailRunsComponentProps) {
    const runDuration = currentRun.finished_at.diff(currentRun.begin_at);

    return (
        <CardComponentWithIcon title={"Parcours"} icon={"map-marked-alt"}>
            <View>
                {currentRun.waypoints.map((waypoint, idx) => (
                    <WayPointTextComponent 
                        key={idx} 
                        place={waypoint.nickname} 
                        time={moment(moment().format("YYYY-MM-DD ")+waypoint.meeting_time).format("H:mm")} 
                        isMeeting={waypoint.is_meeting == 1}
                    />))}
            </View>
        </CardComponentWithIcon>
    )
}
