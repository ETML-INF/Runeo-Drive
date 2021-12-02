import {NotificationsContainer} from "../../Provider.component";
import {useRoute} from "@react-navigation/native";
import React, {Fragment, useEffect} from "react";
import {Text, View} from "react-native";
import {CardComponent} from "../../common/component/Card.component";
import {DateTime} from "luxon";
import {DATE_FORMAT} from "../../common/utils/Date.utils";

export function DetailNotificationComponent() {
    const notificationsContainer = NotificationsContainer.useContainer();

    const route = useRoute();
    const {notificationId} = route.params as { notificationId: string };

    const notification = notificationsContainer.items.find(item => item.id === notificationId) || null;

    useEffect(() => {
        if (notification && !notification.hasBeenRead) {
            notificationsContainer.updateNotification({
                ...notification,
                hasBeenRead: true
            })
        }
    }, [notification])

    if (!notification) {
        console.log("Could not find notification with id ", notificationId)
        return <Fragment/>
    }

    return (
        <View style={{margin: 10}}>
            <CardComponent title={DateTime.fromISO(notification.receivedAt).toFormat(DATE_FORMAT)}>
                <Text>{notification.body}</Text>
            </CardComponent>
        </View>
    )
}

