import {Icon} from "react-native-elements";
import React from "react";
import {RunStatus} from "../resources/Run.resource";
import {Colors} from "./Color.utils";

const runStatusIconMapping: Record<string, string> = {
    [RunStatus.GONE]: 'shipping-fast',
    [RunStatus.FINISHED]: 'check-circle',
    [RunStatus.READY]: 'thumbs-up',
    [RunStatus.CANCELLED]: 'times-circle',
    [RunStatus.ALMOSTREADY]: 'hourglass-half',
    [RunStatus.NEEDS_FILLING]: 'user-plus'
}

export function getRunStatusIcon(status: string) {
    let iconName = runStatusIconMapping[status] || 'question-circle';

    return <Icon type='font-awesome-5' name={iconName} color={Colors.BLUE}/>
}
