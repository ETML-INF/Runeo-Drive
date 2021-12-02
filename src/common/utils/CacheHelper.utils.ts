import {useState} from "react";
import {List} from "immutable";
import {getCache} from "./Cache.utils";
import {listToMap} from "./List.utils";
import {CommonResource} from "../resources/Common.resource";

export function useCacheHelper<T extends CommonResource>(prefix: string, deserializeFunction: (object: any) => T) {
    const [items, setItemsState] = useState<List<T>>(List());
    const cache = getCache<T>(prefix);

    const readFromCache = async () => {
        const itemsFromCache = await cache.getAll();
        setItemsState(itemsFromCache.map(deserializeFunction))
    }

    // add data to cache
    const insertItems = async (rawItems: List<any>) => {
        await cache.addAll(listToMap(rawItems.map(deserializeFunction)))
        await readFromCache()
    }

    const insertItem = (rawItem: any) => {
        return insertItems(List([rawItem]));
    }

    // delete all previous data adding new
    const setItems = async (rawItem: List<any>) => {
        await cache.removeAll();
        await cache.addAll(listToMap(rawItem.map(deserializeFunction)))
        await readFromCache();
    }

    const empty = () => {
        setItemsState(List())
    }

    return {
        items,
        readFromCache,
        setItems,
        insertItems,
        insertItem,
        empty
    }
}
