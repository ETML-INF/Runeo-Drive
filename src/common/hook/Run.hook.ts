import {RunsContainer} from "../../Provider.component";
import {useRoute} from "@react-navigation/native";
import {RunDetailParams} from "../../runs/Runs.component";
import {RunResource} from "../resources/Run.resource";

export function useRunFromRouteParam(): RunResource | null {
    const runsContainer = RunsContainer.useContainer();

    const route = useRoute();
    const params = route.params as RunDetailParams;

    if(params.run == null)
    {
        return runsContainer.items.find(run => run.id === params.runId) || null;
    }
    else
    {
        return params.run;
    } 
}
