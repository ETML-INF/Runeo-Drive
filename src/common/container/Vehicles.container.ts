import { VehicleResource } from "../resources/Vehicle.resource";
import Axios from "axios";
import { List } from "immutable";
import { useCacheHelper } from "../utils/CacheHelper.utils";
import { DataContainerInterface } from "./DataContainer.interface";
import { CommentResource } from "../resources/Comment.resource";
import { DateTime } from "luxon";

export interface VehiclesContainer {
  postComment: (vehicle: VehicleResource, comment: string) => void;
}

export function useVehiclesContainer(): DataContainerInterface<VehicleResource> &
  VehiclesContainer {
  const cacheHelper = useCacheHelper<VehicleResource>(
    "VEHICLE",
    parseVehicleResource
  );

  const refresh = (): Promise<void> => {
    return getVehiclesFromAPi()
      .then((fetchedVehicles) => cacheHelper.insertItems(List(fetchedVehicles)))
      .catch((error) => error.text);
  };

  const postComment = (vehicle: VehicleResource, comment: string) =>
    postCommentOnVehiculeFromAPI(vehicle, comment).then((comment) => {
      const updatedVehicle = {
        ...vehicle,
        comments: vehicle.comments.push(comment),
      };

      return cacheHelper.insertItems(List([updatedVehicle]));
    });

  return {
    items: cacheHelper.items,
    readFromCache: cacheHelper.readFromCache,
    empty: cacheHelper.empty,
    refresh,
    postComment,
  };
}

function getVehiclesFromAPi(): Promise<VehicleResource[]> {
  console.log("Get Vehicles from API");
  return Axios.get("/cars")
    .then((res) => res.data)
    .catch(() => {});
}

function parseVehicleResource(vehiclesFromAPi: any): VehicleResource {
  return {
    ...vehiclesFromAPi,
    comments: List(vehiclesFromAPi.comments).map(parseCommentResource),
  };
}

function parseCommentResource(commentFromApi: any): CommentResource {
  return {
    ...commentFromApi,
    created_at: DateTime.fromISO(commentFromApi.created_at),
  };
}

function postCommentOnVehiculeFromAPI(
  vehicle: VehicleResource,
  comment: string
): Promise<CommentResource> {
  return Axios.post(`/cars/${vehicle.id}/comments`, {
    content: comment,
  }).then((res) => parseCommentResource(res.data));
}
