import {getRunStatusIcon} from "../../common/utils/Run.utils";
import {ListItem} from "react-native-elements";
import {DATE_FORMAT} from "../../common/utils/Date.utils";
import React from "react";
import {RunResource} from "../../common/resources/Run.resource";
import {Colors} from "../../common/utils/Color.utils";

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
        
        //A placer dans une fonction
        var ONE_HOUR = 60 * 60 * 1000;
        var now = new Date();
        console.log((now.getTime() - run.updated_at) < ONE_HOUR);
        
        

        return (
            <ListItem bottomDivider onPress={() => onSelectRun(run)} containerStyle={ (now.getTime() - run.updated_at) < ONE_HOUR ? {backgroundColor:"#a3d1f9"} : false  }>
                {getRunStatusIcon(run.status)}
                <ListItem.Content>
                    <ListItem.Title style={{fontFamily: 'Montserrat-Medium'}}>{`${run.title.toUpperCase()} ${run.waypoints.get(0)?.nickname}`}</ListItem.Title>
                    <ListItem.Subtitle style={{color: Colors.GREY, fontFamily: 'Montserrat-Regular'}}>{
                        run
                            .begin_at
                            .toFormat(DATE_FORMAT)
                    }</ListItem.Subtitle>
                </ListItem.Content>

                <ListItem.Chevron/>
            </ListItem>
        )
    }
    
}
