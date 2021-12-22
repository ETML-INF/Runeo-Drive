import {getRunStatusIcon} from "../../common/utils/Run.utils";
import {ListItem} from "react-native-elements";
import {DATE_FORMAT} from "../../common/utils/Date.utils";
import React from "react";
import {RunResource} from "../../common/resources/Run.resource";
import {Colors} from "../../common/utils/Color.utils";
import {LastUpdatedRun} from "../../common/utils/LastUpdatedRun.utils";

export interface ListRunsItemComponentProps {
    run: RunResource,
    onSelectRun: (run: RunResource) => void
}

//use a react PureComponent to limit number of render when used in animated flat list
export class ListRunsItemComponent extends React.PureComponent<ListRunsItemComponentProps> {
    constructor(props: ListRunsItemComponentProps) {
        super(props);
    }

    render() {
        const {onSelectRun, run} = this.props;
        
        return (
            <ListItem bottomDivider onPress={() => onSelectRun(run)} containerStyle={ LastUpdatedRun(run) ? {backgroundColor:"#00ff4336"} : false }>
                {getRunStatusIcon(run.status)}
                <ListItem.Content>
                    <ListItem.Title style={{fontFamily: 'Montserrat-Medium'}}>{`${run.title.toUpperCase()} ${run.waypoints.get(0)?.nickname}`}</ListItem.Title>
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
    
}
