import AsyncStorage from "@react-native-async-storage/async-storage";
import {List, Map} from "immutable";
import {CommonResource} from "../resources/Common.resource";

const CACHE_PREFIX = "CACHE";

export function getCache<T extends CommonResource>(prefix: string) {
    const add = async (key: string, value: T) => {
        const fullKey = generateKey(key)
        await AsyncStorage.setItem(fullKey, JSON.stringify(value))
    }

    const addAll = async (items: Map<string, T>) => {
        const serializedItems = items
            .toArray()
            .map((value) => [
                generateKey(value[0]),
                JSON.stringify(value[1])
            ])


        await AsyncStorage.multiSet(serializedItems)
    }

    const remove = async (key: string) => {
        await AsyncStorage.removeItem(generateKey(key))
    }

    const removeAll = async (): Promise<void> => {
        const keyWithPrefix = await getAllKeyWithPrefix(prefix)
        await AsyncStorage.multiRemove(keyWithPrefix)
    }

    const getAll = async (): Promise<List<T>> => {
        const keyWithPrefix = await getAllKeyWithPrefix(prefix)
        const keyValues = await AsyncStorage.multiGet(keyWithPrefix);
        return List(keyValues.filter(keyValue => !!keyValue[1]).map(keyValue => JSON.parse(keyValue[1] as string)))
    }

    const generateKey = (key: string): string => {
        return `${CACHE_PREFIX}_${prefix}_${key}`
    }

    const getAllKeyWithPrefix = async (prefix: string): Promise<string[]> => {
        const keys = await AsyncStorage.getAllKeys();

        return keys.filter(key => key.startsWith(`${CACHE_PREFIX}_${prefix}_`));
    }

    return {
        add,
        addAll,
        remove,
        removeAll,
        getAll
    }
}

export async function clearCaches(): Promise<void> {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys.filter(key => key.startsWith(CACHE_PREFIX + "_")))
}
