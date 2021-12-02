import {PropsWithChildren, useEffect, useMemo, useState} from "react";
// import {getDeviceToken, remoteMessageHandler, requestUserPermission} from "./common/utils/Notification.utils";
// import messaging, {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
import {Container} from "unstated-next";
import {AuthContainer} from "./common/container/Auth.container";
import {NetworkContainer} from "./common/container/Network.container";
import {NotificationContainer} from "./common/container/Notification.container";
import {isRootNavigationReady, navigateRoot, rootNavigationRef} from "./RootNavigator";
import {NotificationResource} from "./common/resources/Notification.resource";


//handle message received in background
// messaging().setBackgroundMessageHandler(remoteMessageHandler)

export interface NotificationHandlerComponentProps {
    authContainer: Container<AuthContainer>,
    networkContainer: Container<NetworkContainer>,
    notificationsContainer: Container<NotificationContainer>
}

//Component to be mounted in the app to handle FCM notification
export function NotificationHandlerComponent(props: PropsWithChildren<any> & NotificationHandlerComponentProps) {
    const {setNotificationDeviceId, authenticatedUser} = props.authContainer.useContainer();
    const {isInternetReachable} = props.networkContainer.useContainer();
    const {updateNotification} = props.notificationsContainer.useContainer();
    const [notificationIdToOpen, setNotificationIdToOpen] = useState<string | null>(null)

    // const canSendNotifications = useMemo(() => {
    //     if (!isInternetReachable) {
    //         return false
    //     }

    //     return requestUserPermission();
    // }, [isInternetReachable])

    // const handleMessageWhileAppRunning = (message: FirebaseMessagingTypes.RemoteMessage | null): Promise<NotificationResource | undefined> =>
    //     remoteMessageHandler(message)
    //         .then(notification => {
    //             if (notification) {
    //                 return updateNotification(notification).then(() => notification)
    //             }
    //         })

    // const handleMessageWhileAppRunningAndOpenNotificationDetail = (message: FirebaseMessagingTypes.RemoteMessage | null) =>
    //     handleMessageWhileAppRunning(message)
    //         .then(notification => {
    //             if (notification) {
    //                 setNotificationIdToOpen(notification.id as string)
    //             }
    //         })

    useEffect(() => {
        if (notificationIdToOpen && rootNavigationRef.current && isRootNavigationReady.current) {
            setNotificationIdToOpen(null)
            navigateRoot("Notifications", {
                screen: 'detail',
                initial: false,
                params: {notificationId: notificationIdToOpen},
            })
        }
    }, [notificationIdToOpen, isRootNavigationReady, rootNavigationRef])

    useEffect(() => {
        // check if the app as been resumed after notification clicked
        // messaging().onNotificationOpenedApp(handleMessageWhileAppRunningAndOpenNotificationDetail);

        // // check if the app as been launched after notification clicked
        // messaging().getInitialNotification().then(handleMessageWhileAppRunningAndOpenNotificationDetail);

        //handle message received in foreground
        // return messaging().onMessage(handleMessageWhileAppRunning)
    }, [])

    // useEffect(() => {
    //     if (authenticatedUser && !authenticatedUser.has_notification_token) {
    //         getDeviceToken().then(token => setNotificationDeviceId(token))
    //     }
    // }, [canSendNotifications, authenticatedUser])

    return props.children;
}
