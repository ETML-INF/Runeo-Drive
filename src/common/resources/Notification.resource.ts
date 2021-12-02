import {CommonResource} from "./Common.resource";

export interface NotificationResource extends CommonResource {
    title?: string,
    body?: string,
    hasBeenRead: boolean,
    receivedAt: string
}
