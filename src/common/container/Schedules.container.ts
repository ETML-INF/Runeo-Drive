/**
 * @ Author: Clément Sartoni
 * @ Create Time: 2023-05-08
 * @ Modified by: Clément Sartoni
 * @ Modified time: 2023-05-08 10:03:06
 * @ Description: Container used to get the schedules of the user from the API
 */


import { ScheduleResource } from "../resources/Schedule.resourse";
import Axios from "axios";
import { List } from "immutable";
import { useCacheHelper } from "../utils/CacheHelper.utils";
import { DataContainerInterface } from "./DataContainer.interface";
import { AuthContainer } from "../../Provider.component";

export function useSchedulesContainer(): DataContainerInterface<ScheduleResource> {
    const cacheHelper = useCacheHelper<ScheduleResource>(
        "SCHEDULE", 
        parseSchedule
    );

    const userId = AuthContainer.useContainer().authenticatedUser?.id

    const refresh = (): Promise<void> =>
    getSchedulesFromApi(userId)
      .then((fetchedSchedules) => cacheHelper.insertItems(List(fetchedSchedules)))
      .catch((error) => {
        throw error;
      });

  return {
    items: cacheHelper.items,
    readFromCache: cacheHelper.readFromCache,
    refresh,
    empty: cacheHelper.empty,
  };
}

function getSchedulesFromApi(userId:number): Promise<ScheduleResource[]> {
    return Axios.get("/users/" + userId.toString() + "/schedules", {timeout: 10000})
    .then((res) => res.data.map(parseSchedule))
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
  /* }
  else
  {
    return new Promise(function(resolve, reject) {
      resolve(new Array<ScheduleResource>())
    });
  } */
}

function parseSchedule(rawSchedule: any): ScheduleResource {
    return {
        id: rawSchedule.id,
        start_time: new Date(rawSchedule.start_time),
        end_time: new Date(rawSchedule.end_time),
    }
}