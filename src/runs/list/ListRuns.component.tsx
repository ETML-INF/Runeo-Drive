import React, {useMemo, useState} from "react";
import {RunResource, RunStatus} from "../../common/resources/Run.resource";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView, StyleSheet} from "react-native";
import {AuthContainer, NetworkContainer, RunsContainer} from "../../Provider.component";
import {Map} from "immutable"
import {useRefreshAllDataContainers} from "../../common/hook/Loader.hook";
import Toast from 'react-native-root-toast';
import { toastType, showToast } from "../../notifications/ToastNotification";
import { ListRunsItemComponent } from "./ListRunsItem.component";
import { ListCommonResourceComponent } from "../../common/component/ListCommonResource.component";

export function ListRunsComponent() {
    const navigation = useNavigation();
    const [activatedFilter, setActivatedFilter] = useState<Map<string, boolean>>(Map());
    const {authenticatedUser} = AuthContainer.useContainer();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const runContainer = RunsContainer.useContainer();
    const refreshAllDataContainers = useRefreshAllDataContainers();
    const {isInternetReachable} = NetworkContainer.useContainer();

    const refreshRuns = async () => {
        let timeout = new Promise(function(resolve, reject){
            setTimeout(function() { 
                reject('Time out!'); 
            }, 15000);
        }).catch(()=>{});
        try {
            setIsLoading(true)
            await Promise.race([refreshAllDataContainers,timeout]);
            setIsLoading(false)
        } catch (e) {
            showToast(e, toastType.failed);
            setIsLoading(false)
        }
    }

    const gotoRun = (run: RunResource) => navigation.navigate("detail", {runId: run.id})

    const renderItem = (item:any) => (
        <ListRunsItemComponent onSelectRun={gotoRun} run={item}/>
    )

    return (
        <SafeAreaView style={styles.fill}>
            <ListCommonResourceComponent
                    dataContainer={RunsContainer}
                    renderItem={renderItem}
                    sort={(runA,runB) => runA.begin_at < runB.begin_at}
                    />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fill: {
        height: "100%"
    }
});