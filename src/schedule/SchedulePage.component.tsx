/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-05
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-25 16:30:42
 *   Description: Main page of the schedules fonctionnality
 */
import {SafeAreaView, StyleSheet, View, Text} from "react-native";
import { Icon } from "react-native-elements";
import React, {useEffect, useState} from "react";
import { Colors } from "../common/utils/Color.utils";
import { AuthContainer, NetworkContainer} from "../Provider.component";
import { ScheduleComponent } from "./Schedule.component";
import { useSchedulesContainer } from "../common/container/Schedules.container";
import { localDayOfWeek } from "../common/utils/Date.utils";
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

    const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        load((error : string) => {
            if(error != "")
            {
                showToastLong(error, toastType.failed)
            }
            setIsFirstLoading(false);
        });
    }, []);

    useEffect(() =>  {
        const unsubscribe = navigation.addListener("focus", (e) => {
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

    const gotoRun = (run: RunResource) => navigation.navigate("detail", {run: run})

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <View style={styles.dayBox}>
                    <Text style={styles.dayText}>{localDayOfWeek(day)}</Text>
                    <Text style={styles.dayNumber}>{day.getDate()}</Text>
                </View>
                <View style={styles.iconsBox}>
                    <Icon
                        type='font-awesome'
                        name={'refresh'}
                        size={35}
                        onPress={() =>{
                            setIsLoading(true);
                            load(afterLoad);
                        }}
                    />
                    <Icon
                        type='font-awesome'
                        name={'cog'}
                        size={35}
                        onPress={() =>{navigation.navigate("profile", {user: currentUser})}}
                    />
                </View>
                {/* Profile Picture:  <Avatar rounded size="medium" source={{ uri: currentUser?.image_profile}} onPress={() =>{navigation.navigate("params")}}/> */}
            </View>
            {isFirstLoading ?
                <Text style={styles.loader}>Chargement...</Text>
            : 
                <ScheduleComponent 
                    setCurrentDay={setDay}
                    schedules={schedulesContainer.items}
                    runs={userRunsContainer.items}
                    loading={isLoading}
                    onRunPress={gotoRun}
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
    iconsBox:{
        flexDirection: "row",
        width: '25%',
        justifyContent: "space-between",
    },
    loader:{
        top: 20,
        width: "100%",
        textAlign: "center",
        height: "100%",
    }
})