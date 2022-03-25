import React, {useMemo, useState} from "react";
import {RunResource, RunStatus} from "../../common/resources/Run.resource";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native";
import {AuthContainer, NetworkContainer, RunsContainer} from "../../Provider.component";
import {Map} from "immutable"
import {ListRunsViewComponent} from "./ListRunsView.component";
import {ListRunsFilterEnum} from "./ListRunsFilter.enum";
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
        });
        try {
            setIsLoading(true)
            await Promise.race([refreshAllDataContainers,timeout]);
            showToast("✓",toastType.succes);
            setIsLoading(false)
        } catch (e) {
            showToast(e, toastType.failed);
            setIsLoading(false)
        }
    }
    const updateFilterStatus = (filterName: string) => {
        const currentStatus = activatedFilter.get(filterName, false);

        setActivatedFilter(activatedFilter.set(filterName, !currentStatus))
    }

    const filterRuns = (run: RunResource): boolean => {
        const isMyRunsFilterEnable = activatedFilter.get(ListRunsFilterEnum.MY_RUNS, false)
        const isOpenFilterEnable = activatedFilter.get(ListRunsFilterEnum.OPEN, false)
        const isRunningFilterEnable = activatedFilter.get(ListRunsFilterEnum.RUNNING, false)
        const isDoneFilterEnable = activatedFilter.get(ListRunsFilterEnum.DONE, false)

        let isMatching = true;

        //if no filter is enable show all runs
        if (activatedFilter.filter(value => value).size === 0) {
            return isMatching
        }

        //MY_RUNS = authenticated user is driving a car
        if (isMyRunsFilterEnable && isMatching) {

            //the runner object the authenticated user is driving
            const authenticatedUserRunner = run.runners.find(runner => runner.user?.id === authenticatedUser?.id)

            if (!authenticatedUserRunner)
                isMatching = false;
        }

        //OPEN = the run need more drive, run status is NEEDS_FILLING
        if (isOpenFilterEnable && isMatching && run.status !== RunStatus.NEEDS_FILLING) {
            isMatching = false;
        }

        //RUNNING = the run has started, run status is GONE
        if (isRunningFilterEnable && isMatching && run.status !== RunStatus.GONE) {
            isMatching = false;
        }

        //DONE = the run is finish, run status is FINISHED
        if (isDoneFilterEnable && isMatching && run.status !== RunStatus.FINISHED) {
            isMatching = false;
        }

        return isMatching;
    }

    const data = useMemo(() => {
        return runContainer.items
            .filter(filterRuns)
            .sortBy(run => run.title)
            .toArray();
    }, [runContainer.items, activatedFilter])

    return (
        <SafeAreaView>
            
            <ListRunsViewComponent
                data={data}
                onSelectRun={(run) => navigation.navigate("detail", {runId: run.id})}
                activatedFilter={activatedFilter}
                updateFilterStatus={updateFilterStatus}
                refreshing={isLoading}
                onRefresh={isInternetReachable ? refreshRuns : null}
                role={authenticatedUser.role}
            />
        </SafeAreaView>
    )
}
