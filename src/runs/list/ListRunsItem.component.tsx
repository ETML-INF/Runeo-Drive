import {getRunStatusIcon, statusColor} from "../../common/utils/Run.utils";
import {ListItem} from "react-native-elements";
import {dateWithLocalDay, TIME_FORMAT} from "../../common/utils/Date.utils";
import React from "react";
import {RunResource} from "../../common/resources/Run.resource";
import {Colors} from "../../common/utils/Color.utils";
import { View } from "react-native";

export type ListRunsItemComponentProps = {
    run: RunResource,
    onSelectRun: (run: RunResource) => void
}

//use a react PureComponent to limit number of render when used in animated flat list
export function ListRunsItemComponent ({onSelectRun, run} : ListRunsItemComponentProps) {

    return (
        <ListItem bottomDivider onPress={() => onSelectRun(run)}>
            <View key="icon" style={{ backgroundColor: statusColor(run), padding: 15, borderRadius: 10}}>{getRunStatusIcon(run.status)}</View>
            <ListItem.Content key="content">
                <ListItem.Title style={{fontFamily: 'Montserrat-Medium'}}>{`${run.title.toUpperCase()}`}</ListItem.Title>
                <ListItem.Subtitle style={{color: Colors.GREY, fontFamily: 'Montserrat-Regular'}}>
                    { run.begin_at?.isValid ? `${dateWithLocalDay(run.begin_at)} à ${run.begin_at.toFormat(TIME_FORMAT)}` : 'Date non définie' }
                </ListItem.Subtitle>
            </ListItem.Content>

            <ListItem.Chevron key="chevron" color="grey"/>
        </ListItem>
    )

}
