import React, {useMemo, useState} from "react";
import {RunResource, RunStatus} from "../../common/resources/Run.resource";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native";
import {AuthContainer, NetworkContainer, RunsContainer} from "../../Provider.component";
import {Map} from "immutable"
import {ListRunsViewComponent} from "./ListRunsView.component";
import {useRefreshAllDataContainers} from "../../common/hook/Loader.hook";
import Toast from 'react-native-root-toast';
import { toastType, showToast } from "../../notifications/ToastNotification";

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

    const data = useMemo(() => {
        return runContainer.items
            .sortBy(run => run.begin_at)
            .toArray();
    }, [runContainer.items, activatedFilter])

    return (
        <SafeAreaView>
            
            <ListRunsViewComponent
                data={data}
                onSelectRun={(run) => navigation.navigate("detail", {runId: run.id})}
                refreshing={isLoading}
                onRefresh={isInternetReachable ? refreshRuns : null}
                role={authenticatedUser.role}
            />
        </SafeAreaView>
    )
}
