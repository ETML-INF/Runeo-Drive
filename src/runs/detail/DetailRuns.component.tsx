import {ScrollView} from "react-native";
import React, {Fragment} from "react";
import {DetailRunsScheduleComponent} from "./DetailRunsSchedule.component";
import {DetailRunsCourseComponent} from "./DetailRunsCourse.component";
import {DetailRunsInfoComponent} from "./DetailRunsInfo.component";
import {DetailRunsRunnersComponent} from "./DetailRunsRunners.component";
import {DetailRunsContactBtn} from "./DetailRunsContactBtn.component";
import {DetailRunsStatusControlBtn} from "./DetailRunsStatusControlBtn";
import {useRunFromRouteParam} from "../../common/hook/Run.hook";

export function DetailRunsComponent() {
    const currentRun = useRunFromRouteParam();

    if (!currentRun) {
        console.error("No run matching provided found for provided run id ")
        return <Fragment/>;
    }

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <DetailRunsStatusControlBtn currentRun={currentRun}/>

            <DetailRunsContactBtn currentRun={currentRun}/>

            <DetailRunsScheduleComponent currentRun={currentRun}/>

            <DetailRunsCourseComponent currentRun={currentRun}/>

            <DetailRunsInfoComponent currentRun={currentRun}/>

            <DetailRunsRunnersComponent currentRun={currentRun}/>
        </ScrollView>
    )
}
