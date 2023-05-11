/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-05
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-11 13:42:02
 *   Description: Main page of the schedules fonctionnality
 */
import {SafeAreaView, StyleSheet, View, Text} from "react-native";
import { Avatar } from "react-native-elements";
import React, {useEffect, useState, Fragment} from "react";
import { Colors } from "../common/utils/Color.utils";
import { AuthContainer} from "../Provider.component";
import { ScheduleComponent } from "./Schedule.component";
import { useSchedulesContainer } from "../common/container/Schedules.container";
import { localDayOfWeek } from "../common/utils/Date.utils";
import { ScheduleResource } from "../common/resources/Schedule.resourse";
import { FlatList } from "react-native-gesture-handler";
import { ListCommonResourceComponent } from "../common/component/ListCommonResource.component";
import { participates } from "../common/utils/Run.utils";
import { RunResource } from "../common/resources/Run.resource";
import { useUserRunsContainer } from "../common/container/UserRuns.container";

export function SchedulePageComponent() {
    let currentUser = AuthContainer.useContainer().authenticatedUser;
    let schedulesContainer = useSchedulesContainer();
    let userRunsContainer = useUserRunsContainer();
    

    const [day, setDay] = useState(new Date(2023, 5, 8));

    const [isLoading, setIsLoading] = useState<boolean>(true);
    //const [userRuns, setUserRuns] = useState<RunResource[]>([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        load();
    })

    const load = async () => {
        try {
            Promise.all([
            schedulesContainer.refresh(),
            userRunsContainer.refresh()
            ]).then(()=>{
                setIsLoading(false);
            })
        }
        catch(e){
            setErrorMessage(e.message);
        }
    }

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <View style={styles.dayBox}>
                    <Text style={styles.dayText}>{localDayOfWeek(day)}</Text>
                    <Text style={styles.dayNumber}>{day.getDate()}</Text>
                </View>
                <Avatar rounded size="medium" source={{ uri: currentUser?.image_profile}} />
            </View>
            <ScheduleComponent 
                setCurrentDay={setDay} 
                startDate={new Date(2023, 1, 20)} 
                endDate={new Date(2023, 1, 24)}
                schedules={schedulesContainer.items}
                runs={userRunsContainer.items}
                loading={isLoading}
            ></ScheduleComponent>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        display: "flex",
        height: "100%",
        
    },
    header: {
        height: "8%",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        paddingHorizontal: 15,

        //backgroundColor: Colors.BLACK,
        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        borderBottomColor: Colors.GREY,
        borderBottomWidth: 1,
    },
    dayBox: {
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",

        
        width: "25%",
    },
    dayText: {
        fontSize: 18,
        margin: 0
    },
    dayNumber:{
        fontSize: 25
    }
})