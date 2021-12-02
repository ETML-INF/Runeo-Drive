import {RunResource} from "../resources/Run.resource";
import {List} from "immutable";
import Axios from "axios";
import {DateTime} from "luxon";
import {useCacheHelper} from "../utils/CacheHelper.utils";
import {DataContainerInterface} from "./DataContainer.interface";
import {RunnerResource} from "../resources/Runner.resource";

export interface RunsContainer extends DataContainerInterface<RunResource> {
    updateVehicle: (runnerId: number, carId: number) => Promise<void>,
    startRun: (run: RunResource) => Promise<void>,
    stopRun: (run: RunResource, gasLevel: number) => Promise<void>,
    takeRun: (run: RunResource, runner: RunnerResource) => Promise<void>
}

export function useRunsContainer(): RunsContainer {
    const cacheHelper = useCacheHelper<RunResource>("RUN", parseRunResource);

    const refresh = (): Promise<void> => {
        const mostRecentlyChangedRun = cacheHelper.items
            .sortBy(run => run.updated_at)
            .last<RunResource | undefined>();

        return getRunsFromApi(mostRecentlyChangedRun?.updated_at)
            .then(fetchedRuns => cacheHelper.insertItems(List(fetchedRuns)))
    }

    const updateVehicle = (runnerId: number, carId: number): Promise<void> =>
        updateRunnerCarApi(runnerId, carId).then(cacheHelper.insertItem)

    const startRun = (run: RunResource): Promise<void> =>
        startRunApi(run).then(cacheHelper.insertItem)

    const stopRun = (run: RunResource, gasLevel: number): Promise<void> =>
        stopRunApi(run, gasLevel).then(cacheHelper.insertItem)

    const takeRun = (run: RunResource, runner: RunnerResource) =>
        takeRunApi(run, runner).then(cacheHelper.insertItem)

    return {
        items: cacheHelper.items,
        readFromCache: cacheHelper.readFromCache,
        refresh,
        updateVehicle,
        startRun,
        stopRun,
        takeRun,
        empty: cacheHelper.empty
    }
}

function takeRunApi(run: RunResource, runner: RunnerResource): Promise<RunResource> {
    return Axios.patch(`/runners/${runner.id}/driver`, {
        updated_at: run.updated_at.toString()
    }).then(res => parseRunResource(res.data))
}

function startRunApi(run: RunResource): Promise<RunResource> {
    return Axios.patch(`/runs/${run.id}/start`)
        .then(res => parseRunResource(res.data))
}

function stopRunApi(run: RunResource, gasLevel: number): Promise<RunResource> {
    return Axios.patch(`/runs/${run.id}/stop`, {
        gas_level: gasLevel
    }).then(res => parseRunResource(res.data))
}

function updateRunnerCarApi(runnerId: number, carId: number): Promise<RunResource> {
    return Axios.patch(`/runners/${runnerId}/car`, {
        car_id: carId
    }).then(res => parseRunResource(res.data))
}

function getRunsFromApi(onlyFromTime?: DateTime): Promise<RunResource[]> {
    const params: any = {};

    if (onlyFromTime) {
        params.onlyFromTime = onlyFromTime.toString()
    }

    return Axios.get("/runs", {params}).then(res => res.data.map(parseRunResource))
}

function parseRunResource(runFromApi: any): RunResource {
    return {
        ...runFromApi,
        begin_at: DateTime.fromISO(runFromApi.begin_at),
        end_at: DateTime.fromISO(runFromApi.end_at),
        finished_at: DateTime.fromISO(runFromApi.finished_at),
        start_at: DateTime.fromISO(runFromApi.start_at),
        updated_at: DateTime.fromISO(runFromApi.updated_at),
        waypoints: List(runFromApi.waypoints),
        runners: List(runFromApi.runners)
    }
}
