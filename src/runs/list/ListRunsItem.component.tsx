import {getRunStatusIcon, statusColor} from "../../common/utils/Run.utils";
import {ListItem} from "react-native-elements";
import {dateWithLocalDay, TIME_FORMAT} from "../../common/utils/Date.utils";
import React from "react";
import {RunResource} from "../../common/resources/Run.resource";
import {Colors} from "../../common/utils/Color.utils";
import { participates } from "../../common/utils/Run.utils";
import {lastUpdatedRun} from "../../common/utils/LastUpdatedRun.utils";
import {AuthContainer} from "../../Provider.component";
import { View, StyleSheet } from "react-native";

export type ListRunsItemComponentProps = {
    run: RunResource,
    onSelectRun: (run: RunResource) => void
}

//use a react PureComponent to limit number of render when used in animated flat list
export function ListRunsItemComponent ({onSelectRun, run} : ListRunsItemComponentProps) {
    
    const {authenticatedUser} = AuthContainer.useContainer();
    
    return (
        <ListItem bottomDivider onPress={() => onSelectRun(run)} containerStyle={ participates(run, authenticatedUser) ? (lastUpdatedRun(run, authenticatedUser?.id) ? styles.isnew : styles.ismine ) : false}>
            <View style={{ backgroundColor: statusColor(run), padding: 15, borderRadius: 10}}>{getRunStatusIcon(run.status)}</View>
            <ListItem.Content>
                <ListItem.Title style={{fontFamily: 'Montserrat-Medium'}}>{`${run.title.toUpperCase()}`}</ListItem.Title>
                <ListItem.Subtitle style={{color: Colors.GREY, fontFamily: 'Montserrat-Regular'}}>
                    { dateWithLocalDay(run.begin_at)} à {run.begin_at.toFormat(TIME_FORMAT)}
                </ListItem.Subtitle>
            </ListItem.Content>

            <ListItem.Chevron color="grey"/>
        </ListItem>
    )
    
}

const styles = StyleSheet.create({
    ismine: {
        backgroundColor: Colors.ME,
    },
    isnew: {
        backgroundColor: Colors.HAS_CHANGED
    },
    statusgone: {
        backgroundColor: Colors.STATUS_GONE
    },
    statusready: {
        backgroundColor: Colors.STATUS_READY
    },
    statusneeds_filling: {
        backgroundColor: Colors.STATUS_NEED
    },
    statusalmostready: {
        backgroundColor: Colors.STATUS_NEED
    },
    statuserror: {
        backgroundColor: Colors.STATUS_PROBLEM
    },
})
