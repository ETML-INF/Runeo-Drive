import React from "react";
import {RunResource} from "../../common/resources/Run.resource";
import {DATE_ONLY_FORMAT} from "../../common/utils/Date.utils";
import {CardComponentWithIcon} from "../../common/component/Card.component";

export interface DetailRunsScheduleComponent {
    currentRun: RunResource
}

export function DetailRunsScheduleComponent({currentRun}: DetailRunsScheduleComponent) {
    return (
        <CardComponentWithIcon title={"Date " + currentRun.begin_at.toFormat(DATE_ONLY_FORMAT)} icon={"calendar"} >
        </CardComponentWithIcon>
    )
}
