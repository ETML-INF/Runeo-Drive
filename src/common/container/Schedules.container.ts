/**
 * @ Author: Clément Sartoni
 * @ Create Time: 2023-05-08
 * @ Modified by: Alban Segalen
 * @ Modified time: 2026-02-09 11:08:25
 * @ Description: Container used to get the schedules of the user from the API
 */

import { ScheduleResource } from "../resources/Schedule.resource";
import Axios from "axios";
import { List } from "immutable";
import { useCacheHelper } from "../utils/CacheHelper.utils";
import { DataContainerInterface } from "./DataContainer.interface";
import { AuthContainer } from "../../Provider.component";

let userGroup: string = "";

export function useSchedulesContainer(): DataContainerInterface<ScheduleResource> {
  const cacheHelper = useCacheHelper<ScheduleResource>("SCHEDULE", parseSchedule);

  const userId = AuthContainer.useContainer().authenticatedUser?.id;

  const refresh = (): Promise<void> =>
    getSchedulesFromApi(userId)
      .then((fetchedSchedules) => {
        if (fetchedSchedules.length > 0) {
          return cacheHelper.insertItems(List(fetchedSchedules));
        }
      })
      .catch((error) => {
        throw error;
      });

  return {
    items: cacheHelper.items,
    userGroup: userGroup,
    readFromCache: cacheHelper.readFromCache,
    refresh,
    empty: cacheHelper.empty
  };
}

async function getSchedulesFromApi(userId: number): Promise<ScheduleResource[]> {
  //Get all schedules and the current user's own schedule in parallel
  const [allSchedulesRes, userScheduleRes] = await Promise.all([
    Axios.get("/schedule", { timeout: 10000 }),
    Axios.get(`/users/${userId}/schedule`, { timeout: 10000 }).catch(() => ({ data: [] })),
  ]);

  //Determine the user's group from their own schedule
  const userSchedules: any[] = userScheduleRes.data ?? [];
  if (userSchedules.length > 0 && userSchedules[0]?.group?.name) {
    userGroup = userSchedules[0].group.name;
  }

  const rawSchedules: any[] = allSchedulesRes.data ?? [];
  return rawSchedules.map(parseSchedule);
}

function parseSchedule(rawSchedule: any): ScheduleResource {
  return {
    id: rawSchedule.id ?? rawSchedule.group?.name + "_" + rawSchedule.start_date,
    start_date: new Date(rawSchedule.start_date),
    end_date: new Date(rawSchedule.end_date),
    group: {
      id: rawSchedule.group?.id ?? rawSchedule.group?.name,
      color: rawSchedule.group?.color,
      name: rawSchedule.group?.name
    }
  };
}
