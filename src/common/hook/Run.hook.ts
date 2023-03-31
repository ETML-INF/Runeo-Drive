/**
 * @ Author: Some student of the CPNV
 * @ Create Time: The past
 * @ Modified by: Clément Sartoni
 * @ Modified time: 2023-03-30 
 * @ Description: modified a bit this system to allow passing directly a run to display in the route parameters. 
 *   This was necessary to bypass the containers system when dealing with not fixed API link 
 *   (requiring the id of an artist to get multiple runs)
 */

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
