import {List, Map} from "immutable";
import {CommonResource} from "../resources/Common.resource";

export function listToMap<T extends CommonResource>(list: List<T>): Map<string, T> {
    let map = Map<string, T>()

    list.forEach(value => map = map.set(String(value.id), value))

    return map;
}
