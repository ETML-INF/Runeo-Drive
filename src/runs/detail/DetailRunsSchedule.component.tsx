import {Text} from "react-native";
import React from "react";
import {RunResource} from "../../common/resources/Run.resource";
import {DATE_FORMAT} from "../../common/utils/Date.utils";
import {CardComponentWithIcon} from "../../common/component/Card.component";
import {InlineTextComponent} from "../../common/component/text/InlineText.component";
import {ImportantTextComponent} from "../../common/component/text/ImportantText.component";

export interface DetailRunsScheduleComponent {
    currentRun: RunResource
}

export function DetailRunsScheduleComponent({currentRun}: DetailRunsScheduleComponent) {
    return (
        <CardComponentWithIcon title={"Horaires"} icon={"clock"} >
            <InlineTextComponent>
                <Text>Prévu </Text>
                <ImportantTextComponent>{currentRun.begin_at.toFormat(DATE_FORMAT)}</ImportantTextComponent>
            </InlineTextComponent>
        </CardComponentWithIcon>
    )
}


