/**
 * @ Author: Clément Sartoni
 * @ Create Time: 2023-05-08
 * @ Modified by: Alban Segalen
 * @ Modified time: 2026-02-09 11:08:25
 * @ Description: Container used to get the schedules of the user from the API
 */

import { ScheduleResource } from "../resources/Schedule.resourse";
import Axios from "axios";
import { List } from "immutable";
import { useCacheHelper } from "../utils/CacheHelper.utils";
import { DataContainerInterface } from "./DataContainer.interface";
import { AuthContainer } from "../../Provider.component";

let userGroup: string = "";

export function useSchedulesContainer(): DataContainerInterface<ScheduleResource> {
  const cacheHelper = useCacheHelper<ScheduleResource>(
    "SCHEDULE",
    parseSchedule
  );

  const userId = AuthContainer.useContainer().authenticatedUser?.id

  const refresh = (): Promise<void> =>
    getSchedulesFromApi(userId)
      .then((fetchedSchedules) => {
        if (fetchedSchedules.length > 0) {
          return cacheHelper.insertItems(List(fetchedSchedules))
        }
      }).catch((error) => {
        throw error;
      });

  return {
    items: cacheHelper.items,
    userGroup: userGroup,
    readFromCache: cacheHelper.readFromCache,
    refresh,
    empty: cacheHelper.empty,
  };
}


async function getSchedulesFromApi(userId: number): Promise<ScheduleResource[]> {
  //Array that contains the schedule of all groups
  const allSchedules: ScheduleResource[] = [];

  //Get the all the groups
  const groupsRes = await Axios.get("/groups", { timeout: 10000 });

  //Return an empty array if there isn't the list of groups
  const groupList = groupsRes.data?.data ?? [];

  //let userGroup;

  //Get the user group
  for (const group of groupList) {
    const hasGroup = group.members.some(m => m.id === userId)
    
    if (hasGroup) {
      userGroup = group.name
      break;
    }
  }

  //As of 30.01.2026, it isn't possible to get the schedule of a group:
  //You can only get the schedule of an user
  //To get the schedule of all groups, we simply get the schedule of the first member of the group
  //It can only show the groups that have at least one user

  //We create an array of promises
  const schedulePromises = groupList
    .filter((g: any) => g?.id && Array.isArray(g.members) && g.members.length > 0)
    .map((g: any) => {
      const memberId = g.members[0].id;

      //We get the schedule of the first member of the group
      return Axios.get(`/users/${memberId}/schedules`, { timeout: 10000 })
        .then((res) => {
          //res.data is an array of schedule
          return (res.data ?? []).map(parseSchedule);
        })
        .catch((err) => {
          console.error(`Failed to load schedules for member ${memberId}:`, err);
          return [] as ScheduleResource[]; // don't fail whole operation for one group
        });
    });

  //We wait for all the promises to resolve and merge all the group schedule into one
  const schedulesArrays = await Promise.all(schedulePromises);
  for (const arr of schedulesArrays) {
    allSchedules.push(...arr);
  }

  return allSchedules;
  }

  function parseSchedule(rawSchedule: any): ScheduleResource {
    return {
      id: rawSchedule.id,
      start_time: new Date(rawSchedule.start_time),
      end_time: new Date(rawSchedule.end_time),
      group: {
        id: rawSchedule.group.id,
        color: rawSchedule.group.color,
        name: rawSchedule.group.name,
      }
    }
  }