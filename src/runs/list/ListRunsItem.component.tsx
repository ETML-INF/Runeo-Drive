import {getRunStatusIcon} from "../../common/utils/Run.utils";
import {ListItem} from "react-native-elements";
import {DATE_FORMAT} from "../../common/utils/Date.utils";
import React from "react";
import {RunResource} from "../../common/resources/Run.resource";
import {Colors} from "../../common/utils/Color.utils";
import {lastUpdatedRun} from "../../common/utils/LastUpdatedRun.utils";
import {AuthContainer} from "../../Provider.component";

export type ListRunsItemComponentProps = {
    run: RunResource,
    onSelectRun: (run: RunResource) => void
}

//use a react PureComponent to limit number of render when used in animated flat list
export function ListRunsItemComponent ({onSelectRun, run} : ListRunsItemComponentProps) {
    
    const {authenticatedUser} = AuthContainer.useContainer();
    
    return (
        <ListItem bottomDivider onPress={() => onSelectRun(run)} containerStyle={ lastUpdatedRun(run, authenticatedUser?.id) ? {backgroundColor: Colors.GREEN} : false}>
            {getRunStatusIcon(run.status)}
            <ListItem.Content>
                <ListItem.Title style={{fontFamily: 'Montserrat-Medium'}}>{`${run.title.toUpperCase()}`}</ListItem.Title>
                <ListItem.Subtitle style={{color: Colors.GREY, fontFamily: 'Montserrat-Regular'}}>{
                    run
                        .begin_at
                        .toFormat(DATE_FORMAT)
                }</ListItem.Subtitle>
            </ListItem.Content>

            <ListItem.Chevron color="grey"/>
        </ListItem>
    )
    
}
