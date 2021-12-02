import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {NotificationResource} from "../resources/Notification.resource";
import {getCache} from "./Cache.utils";
// import {DateTime} from "luxon";

export const NOTIFICATION_CACHE_PREFIX = "NOTIFICATION"

// export async function requestUserPermission(): Promise<boolean> {
//     // const authStatus = await messaging().requestPermission();
//     // const enabled =
//     //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     // return enabled;
// }

// export async function getDeviceToken(): Promise<string> {
    // return messaging().getToken()
// }

// export async function remoteMessageHandler(message: FirebaseMessagingTypes.RemoteMessage | null): Promise<NotificationResource | undefined> {
//     if (!message) {
//         return
//     }

//     const notification = parseRemoteMessage(message);

//     if (!notification) {
//         return
//     }

//     const notificationCache = getCache<NotificationResource>(NOTIFICATION_CACHE_PREFIX);
//     return notificationCache.add(String(notification.id), notification).then(() => notification)
// }

// export function parseRemoteMessage(message: FirebaseMessagingTypes.RemoteMessage): NotificationResource | undefined {
//     if (message.notification) {
//         return {
//             id: message.messageId || "",
//             title: message.notification.title,
//             body: message.notification.body,
//             hasBeenRead: false,
//             receivedAt: DateTime.local().toISO()
//         }
//     }
// }
