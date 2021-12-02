import {RunsContainer} from "../../Provider.component";
import {useRoute} from "@react-navigation/native";
import {RunDetailParams} from "../../runs/Runs.component";
import {RunResource} from "../resources/Run.resource";

export function useRunFromRouteParam(): RunResource | null {
    const runsContainer = RunsContainer.useContainer();

    const route = useRoute();
    const {runId} = route.params as RunDetailParams;

    return runsContainer.items.find(run => run.id === runId) || null;
}
