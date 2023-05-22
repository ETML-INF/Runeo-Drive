/**
 * @ Author: Clément Sartoni
 * @ Create Time: 2023-05-08
 * @ Modified by: Clément Sartoni
 * @ Modified time: 2023-05-08 14:05:48
 * @ Description: Container containing all the runs of the user, separated from the others because used only 
 *                in the schedule page and because they can be in the past, while the others cant.
 */



import { RunResource } from "../resources/Run.resource";
import { List } from "immutable";
import Axios from "axios";
import { DateTime } from "luxon";
import { useCacheHelper } from "../utils/CacheHelper.utils";
import { DataContainerInterface } from "./DataContainer.interface";

export function useUserRunsContainer() : DataContainerInterface<RunResource> {
    const cacheHelper = useCacheHelper<RunResource>(
        "USERRUNS", 
        parseRunResource
    );

    const refresh = (): Promise<void> =>
    getUserRunsApi()
      .then((fetchedRuns) => {
        if(fetchedRuns.length > 0)
        {
          return cacheHelper.insertItems(List(fetchedRuns))
        }
        else
        {
          return;
        }
      }).catch((error) => {
        console.log(error + "blblü");
        throw error;
      });

  return {
    items: cacheHelper.items,
    readFromCache: cacheHelper.readFromCache,
    refresh,
    empty: cacheHelper.empty,
  };
}

function getUserRunsApi(): Promise<RunResource[]> {
    return Axios.get("/me/runs", {timeout: 10000})
      .then((res) => {
          return res.data.map(parseRunResource);
      }).catch((error) => { return error});
  }

function parseRunResource(runFromApi: any): RunResource {
    return {
      ...runFromApi,
      begin_at: DateTime.fromISO(runFromApi.begin_at),
      end_at: DateTime.fromISO(runFromApi.end_at),
      finished_at: DateTime.fromISO(runFromApi.finished_at),
      start_at: DateTime.fromISO(runFromApi.start_at),
      updated_at: DateTime.fromISO(runFromApi.updated_at),
      acknowledged_at: DateTime.fromISO(runFromApi.acknowledged_at),
      waypoints: List(runFromApi.waypoints),
      runners: List(runFromApi.runners)
    };
  }