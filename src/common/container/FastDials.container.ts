import {FastDialResource} from "../resources/FastDial.resource";
import {List} from "immutable";
import Axios from "axios";
import {useCacheHelper} from "../utils/CacheHelper.utils";
import {DataContainerInterface} from "./DataContainer.interface";

export function useFastDialsContainer(): DataContainerInterface<FastDialResource> {
    const cacheHelper = useCacheHelper<FastDialResource>("FASTDIAL", (rawFastDial: any) => rawFastDial);

    const refresh = (): Promise<void> => getFastDialsFromApi()
        .then(fetchedFastDials => cacheHelper.setItems(List(fetchedFastDials)))

    return {
        items: cacheHelper.items,
        readFromCache: cacheHelper.readFromCache,
        refresh,
        empty: cacheHelper.empty
    }
}

function getFastDialsFromApi(): Promise<FastDialResource[]> {
    return Axios.get("/fastDial").then(res => res.data)
}
