import {ScrollView} from "react-native";
import React, {Fragment} from "react";
import {DetailRunsScheduleComponent} from "./DetailRunsSchedule.component";
import {DetailRunsCourseComponent} from "./DetailRunsCourse.component";
import {DetailRunsInfoComponent} from "./DetailRunsInfo.component";
import {DetailRunsRunnersComponent} from "./DetailRunsRunners.component";
import {DetailRunsContactBtn} from "./DetailRunsContactBtn.component";
import {DetailRunsStatusControlBtn} from "./DetailRunsStatusControlBtn";
import {DetailRunsAcknowledgeUpdateComponent} from "./DetailRunsAcknowledgeUpdate.component";
import {useRunFromRouteParam} from "../../common/hook/Run.hook";
import {lastUpdatedRun} from "../../common/utils/LastUpdatedRun.utils";
import {AuthContainer} from "../../Provider.component";

export function DetailRunsComponent() {
    const currentRun = useRunFromRouteParam();
    const {authenticatedUser} = AuthContainer.useContainer();

    if (!currentRun) {
        console.error("No run matching provided found for provided run id ")
        return <Fragment/>;
    }
    
    return (
        <ScrollView style={{backgroundColor: 'white'}}>                         
            {lastUpdatedRun(currentRun, authenticatedUser?.id) ? <DetailRunsAcknowledgeUpdateComponent currentRun={currentRun}/> : false }

            <DetailRunsStatusControlBtn currentRun={currentRun}/>

            <DetailRunsContactBtn currentRun={currentRun}/>

            <DetailRunsScheduleComponent currentRun={currentRun}/>

            <DetailRunsCourseComponent currentRun={currentRun}/>

            <DetailRunsInfoComponent currentRun={currentRun}/>

            <DetailRunsRunnersComponent currentRun={currentRun}/>
        </ScrollView>
    )
}
