/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-05
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-15 09:56:39
 *   Description: Main page of the schedules fonctionnality
 */
import {SafeAreaView, StyleSheet, View, Text} from "react-native";
import { Avatar } from "react-native-elements";
import React, {useEffect, useState, Fragment} from "react";
import { Colors } from "../common/utils/Color.utils";
import { AuthContainer, NetworkContainer} from "../Provider.component";
import { ScheduleComponent } from "./Schedule.component";
import { useSchedulesContainer } from "../common/container/Schedules.container";
import { localDayOfWeek } from "../common/utils/Date.utils";
import { ScheduleResource } from "../common/resources/Schedule.resourse";
import { FlatList } from "react-native-gesture-handler";
import { ListCommonResourceComponent } from "../common/component/ListCommonResource.component";
import { participates } from "../common/utils/Run.utils";
import { RunResource } from "../common/resources/Run.resource";
import { showToastLong, toastType } from "../notifications/ToastNotification";
import { useUserRunsContainer } from "../common/container/UserRuns.container";
import { useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";

export function SchedulePageComponent() {
    let currentUser = AuthContainer.useContainer().authenticatedUser;
    let schedulesContainer = useSchedulesContainer();
    let userRunsContainer = useUserRunsContainer();
    let navigation = useNavigation();
    let {isInternetReachable} = NetworkContainer.useContainer();
    

    const [day, setDay] = useState(new Date());

    const [isLoading, setIsLoading] = useState<boolean>(true);
    //const [userRuns, setUserRuns] = useState<RunResource[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    /* useEffect(() => {
        load(afterLoad);
    }, []); */

    useEffect(() =>  {
        const subscribe = navigation.addListener("focus", (e) => {
            setIsLoading(true);
            load(afterLoad);
        })
    }, [navigation])

    const afterLoad = (error:string) :void => {
        if(error != "")
        {
            showToastLong(error, toastType.failed)
        }
        setIsLoading(false);
    }

    const load = (callback:Function) => {
        if(isInternetReachable)
        {
            Promise.all([
                schedulesContainer.refresh(),
                userRunsContainer.refresh()
                ]).then(()=>{
                    callback("");
                }).catch((e: AxiosError) => {
                    if(e.response)
                    {
                        switch(e.response?.status)
                        {
                            case 400:
                                callback("Nous n'avons pas pu charger vos horaires ou vos runs. Il est possible que si vous n'avez pas de groupe attribué, cette erreur apparaisse. (erreur 400)")
                                break;
                            default:
                                callback("Nous n'avons pas pu charger vos horaires ou vos runs. Contactez un administrateur pour en savoir plus. (erreur HTTP:" + e.response?.status + ")")
                                break;
                        }
                    }
                    else
                    {
                        callback("Les données n'ont pas pu être chargées pour le moment, en raison d'un incident technique ou d'une mauvaise connexion. Merci de réessayer plus tard. ")
                    }
                    
                })
        }
        else
        {
            callback("Internet n'est pas disponible. Merci de vérifier vos données mobiles ou de réessayer plus tard.")
        }
    }

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <View style={styles.dayBox}>
                    <Text style={styles.dayText}>{localDayOfWeek(day)}</Text>
                    <Text style={styles.dayNumber}>{day.getDate()}</Text>
                </View>
                <Avatar rounded size="medium" source={{ uri: currentUser?.image_profile}} onPress={() =>{navigation.navigate("params")}}/>
            </View>
            {isLoading ?
                <Text style={[styles.loader, {opacity: 1/*this.loadinAnim*/}]}>Chargement...</Text>
            : 
                <ScheduleComponent 
                    setCurrentDay={setDay}
                    schedules={schedulesContainer.items}
                    runs={userRunsContainer.items}
                    loading={isLoading}
                ></ScheduleComponent>
            }
            
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
    },
    loader:{
        top: 20,
        width: "100%",
        textAlign: "center",
    }
})