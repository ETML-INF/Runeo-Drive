import {RunResource} from "../../common/resources/Run.resource";
import {StyleSheet, Button, Text, TouchableOpacity, Linking, View} from "react-native";
import {CardComponentWithIcon} from "../../common/component/Card.component";
import { WayPointTextComponent } from "../../common/component/text/WayPointText.component";
import moment from "moment"
import {ButtonComponent} from "../../common/component/ButtonComponent";
import { NetworkContainer } from "../../Provider.component";

export interface CourseDetailRunsComponentProps {
    currentRun: RunResource
}

export function DetailRunsCourseComponent({currentRun}: CourseDetailRunsComponentProps) {
    const runDuration = currentRun.finished_at.diff(currentRun.begin_at);
    const {isInternetReachable} = NetworkContainer.useContainer();

    const showRunOnMap = () => {
        Linking.openURL(currentRun.google).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <CardComponentWithIcon title={"Parcours"} icon={"map-marked-alt"}>
            <View>
                {currentRun.waypoints.map((waypoint, idx) => (
                    <WayPointTextComponent 
                        key={idx} 
                        place={waypoint.nickname} 
                        time={moment(moment().format("YYYY-MM-DD ")+waypoint.meeting_time).format("H:mm")} 
                        isMeeting={waypoint.is_meeting == 1}
                    />))}
            </View>
            <View style={styles.container}>
                <ButtonComponent
                    title="Visualiser"
                    disabled={ !isInternetReachable }
                    color="#f194ff"
                    onPress={showRunOnMap}
                />

            </View>
        </CardComponentWithIcon>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
  });