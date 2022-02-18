import {RunResource} from "../../common/resources/Run.resource";
import {StyleSheet, Text} from "react-native";
import React, {Fragment} from "react";
import {UpdatedInfoCardComponent} from "../../common/component/UpdatedInfoCard.component";
import {InlineTextComponent} from "../../common/component/text/InlineText.component";
import {ImportantTextComponent} from "../../common/component/text/ImportantText.component";
import {Colors} from "../../common/utils/Color.utils";

export interface RunDetailsComponentProps {
    currentRun: RunResource
}

export function DetailRunsAcknowledgeUpdateComponent({currentRun}: RunDetailsComponentProps) {
    return (
        <UpdatedInfoCardComponent icon={"exclamation"} style={{ color: Colors.GREEN + '!important'}} title="Le run a été modifié" runId={currentRun.id}>
        </UpdatedInfoCardComponent>
    )
}

const styles = StyleSheet.create({
    textContact: {
        fontFamily: 'Montserrat-Regular',
    },

    newTitle: {
        fontFamily: 'Montserrat-Regular',
        marginTop: 10,
        marginBottom: 10
    },

    textRegular: {
        color: Colors.GREY,
        fontFamily: 'Montserrat-Regular',
    },
});
