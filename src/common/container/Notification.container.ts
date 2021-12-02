import {DataContainerInterface} from "./DataContainer.interface";
import {NotificationResource} from "../resources/Notification.resource";
import {useCacheHelper} from "../utils/CacheHelper.utils";
import {NOTIFICATION_CACHE_PREFIX} from "../utils/Notification.utils";

export interface NotificationContainer {
    updateNotification: (notification: NotificationResource) => Promise<void>
}

export function useNotificationsContainer(): DataContainerInterface<NotificationResource> & NotificationContainer {
    const cacheHelper = useCacheHelper<NotificationResource>(NOTIFICATION_CACHE_PREFIX, (rawNotif: any) => rawNotif);

    const updateNotification = (notification: NotificationResource) => cacheHelper.insertItem(notification)

    return {
        items: cacheHelper.items,
        readFromCache: cacheHelper.readFromCache,
        refresh: cacheHelper.readFromCache,
        empty: cacheHelper.empty,
        updateNotification
    }
}
