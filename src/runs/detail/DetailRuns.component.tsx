import {ScrollView, Text} from "react-native";
import React, {Fragment} from "react";
import {DetailRunsScheduleComponent} from "./DetailRunsSchedule.component";
import {DetailRunsCourseComponent} from "./DetailRunsCourse.component";
import {DetailRunsInfoComponent} from "./DetailRunsInfo.component";
import {DetailRunsRunnersComponent} from "./DetailRunsRunners.component";
import {DetailRunsContactBtn} from "./DetailRunsContactBtn.component";
import {DetailRunsStatusControlBtn} from "./DetailRunsStatusControlBtn";
import {DetailRunsAcknowledgeUpdateComponent} from "./DetailRunsAcknowledgeUpdate.component";
import { DetailRunsOtherFromArtistComponent } from "./DetailRunsOtherFromArtist.component";
import {DetailRunsCommentComponent} from "./DetailRunsComment.component";
import {DetailRunsGasWarningComponent} from "./DetailRunsGasWarning.component"
import {useRunFromRouteParam} from "../../common/hook/Run.hook";
import {lastUpdatedRun} from "../../common/utils/LastUpdatedRun.utils";
import {AuthContainer} from "../../Provider.component";
import { useNavigation } from "@react-navigation/native";

export function DetailRunsComponent() {
    const currentRun = useRunFromRouteParam();
    const {authenticatedUser} = AuthContainer.useContainer();
    const navigation = useNavigation();

    if (!currentRun) {
        console.error("No run matching provided found for provided run id ")
        return <Fragment/>;
    }

    //In order to not display the interaction buttons 
    //TODO: not optimal system, if the main page's name changes this line will need to be changed.
    const navFromList = navigation.getState().routeNames[0] == 'list';

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            {lastUpdatedRun(currentRun, authenticatedUser?.id) ? <DetailRunsAcknowledgeUpdateComponent currentRun={currentRun}/> : false }

            {navFromList && <DetailRunsStatusControlBtn currentRun={currentRun}/>}

            <DetailRunsGasWarningComponent currentRun={currentRun}/>

            <DetailRunsScheduleComponent currentRun={currentRun}/>

            <DetailRunsCourseComponent currentRun={currentRun}/>

            <DetailRunsInfoComponent currentRun={currentRun}/>

            <DetailRunsRunnersComponent currentRun={currentRun}/>

            {navFromList && <DetailRunsOtherFromArtistComponent currentRun={currentRun}/>}

            {navFromList && <DetailRunsCommentComponent currentRun={currentRun}/>}

        </ScrollView>
    )
}
