import { UserResource } from "../resources/User.resource";
import Axios from "axios";
import { List } from "immutable";
import { useCacheHelper } from "../utils/CacheHelper.utils";
import { DataContainerInterface } from "./DataContainer.interface";

export function useUsersContainer(): DataContainerInterface<UserResource> {
  const cacheHelper = useCacheHelper<UserResource>(
    "USER",
    (rawUser: any) => rawUser
  );

  const refresh = (): Promise<void> =>
    getUsersFromAPi()
      .then((fetchedUsers) => cacheHelper.insertItems(List(fetchedUsers)))
      .catch(() => {});

  return {
    items: cacheHelper.items,
    readFromCache: cacheHelper.readFromCache,
    refresh,
    empty: cacheHelper.empty,
  };
}

function getUsersFromAPi(): Promise<UserResource[]> {
  return Axios.get<UserResource[]>("/users")
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
}
