import React, {useMemo, useEffect, useState, Fragment} from "react";
import {RunResource, RunStatus} from "../../common/resources/Run.resource";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView, StyleSheet, FlatList} from "react-native";
import {AuthContainer, NetworkContainer, RunsContainer} from "../../Provider.component";
import {Map} from "immutable";
import {useRefreshAllDataContainers} from "../../common/hook/Loader.hook";
import Toast from 'react-native-root-toast';
import { toastType, showToast } from "../../notifications/ToastNotification";
import { ListRunsItemComponent } from "./ListRunsItem.component";
import { ListCommonResourceComponent } from "../../common/component/ListCommonResource.component";
import {participates} from "../../common/utils/Run.utils"
import {useRunFromRouteParam} from "../../common/hook/Run.hook";

export function ListRunsFromArtistComponent() {
    const navigation = useNavigation();

    const currentRun = useRunFromRouteParam();
    const runContainer = RunsContainer.useContainer();

    const [activatedFilter, setActivatedFilter] = useState<Map<string, boolean>>(Map());
    const {authenticatedUser} = AuthContainer.useContainer();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [items, setItems] = useState<RunResource[]>([]);
    const {isInternetReachable} = NetworkContainer.useContainer();

    const gotoRun = (run: RunResource) => navigation.navigate("detail", {run: run})

    const renderItem = ({item}: { item: RunResource }) => {
        return <ListRunsItemComponent onSelectRun={gotoRun} run={item}/>
    }

    if (!currentRun) {
        console.error("No run matching provided found for provided run id ")
        return <Fragment/>;
    }


    useEffect(() => {
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
            <FlatList
                keyExtractor={((item: RunResource) => String(item.id))}
                data={items}
                renderItem={renderItem}
                refreshing={isLoading}
                style={{
                    height: "100%"
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fill: {
        height: "100%"
    }
});