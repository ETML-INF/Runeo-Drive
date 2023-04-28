/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-03-29
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-04-28 11:27:18
 *   Description: This component was inspired by the ListRuns component with the big change that this one does not use the container system to display 
 *   its runs. It just load them once from the API and then no reload is possible without quitting the page and coming back. This makes more sense
 *   for this page since the users use it to access data once and not that frequently.
 */


import React, {useEffect, useState, Fragment} from "react";
import {RunResource} from "../../common/resources/Run.resource";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView, StyleSheet, FlatList, Text} from "react-native";
import {NetworkContainer, RunsContainer} from "../../Provider.component";
import { ListRunsItemComponent } from "./ListRunsItem.component";
import {useRunFromRouteParam} from "../../common/hook/Run.hook";

export function ListRunsFromArtistComponent() {
    const navigation = useNavigation();

    const currentRun = useRunFromRouteParam();
    const runContainer = RunsContainer.useContainer();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [items, setItems] = useState<RunResource[]>([]);
    const {isInternetReachable} = NetworkContainer.useContainer();

    const gotoRun = (run: RunResource) => navigation.push("detail", {run: run})

    const renderItem = ({item}: { item: RunResource }) => {
        return <ListRunsItemComponent onSelectRun={gotoRun} run={item}/>
    }

    if (!currentRun) {
        console.error("No run matching provided found for provided run id ")
        return <Fragment/>;
    }

    //if no internet then show error message.
    if (!isInternetReachable){
        return (
            <SafeAreaView style={styles.fill}>
                <Text style={styles.loading}>Vous n'avez pas de connexion à internet.</Text> 
                <Text style={styles.loading}>Vérifiez vos données mobiles ou</Text> 
                <Text style={styles.loading}>réessayez plus tard.</Text> 
            </SafeAreaView>
        )
    }


    useEffect(() => {
        //TODO: Add a .catch with timeout to manage connexion errors. 
        runContainer.getRunsFromSameArtist(currentRun).then((data) => {
            if (items.length == 0){
                data = data.sort((runA,runB) => {return (runA.begin_at.diff(runB.begin_at).toMillis() > 0) ? 1 : -1});
                setItems(data);
            } 
            setIsLoading(false)
        })
    });

    return (
        <SafeAreaView style={styles.fill}>
            { isLoading ? 
                <Text style={styles.loading}>Chargement...</Text> 
                :
                <FlatList
                    keyExtractor={((item: RunResource) => String(item.id))}
                    data={items}
                    renderItem={renderItem}
                    refreshing={isLoading}
                    style={{
                        height: "100%"
                    }}
                />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fill: {
        height: "100%",
        justifyContent: "center",
    },
    loading : {
        alignSelf : "center",
        fontSize: 18,
    }
});