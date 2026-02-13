import {CommonResource} from "../resources/Common.resource";
import {List} from "immutable";

export interface DataContainerInterface<T extends CommonResource> {
    items: List<T>,
    userGroup: string,
    readFromCache: () => Promise<void>,
    refresh: () => Promise<void>,
    empty: () => void
}
