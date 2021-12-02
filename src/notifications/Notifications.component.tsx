import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {ListNotificationsComponent} from "./list/ListNotifications.component";
import {DetailNotificationComponent} from "./detail/DetailNotifications.component";
import {RouteProp} from "@react-navigation/native";
import {NotificationsContainer} from "../Provider.component";

const Stack = createStackNavigator();

export function NotificationsComponent() {
    const notificationContainer = NotificationsContainer.useContainer();

    return (
        <Stack.Navigator initialRouteName={"list"}>
            <Stack.Screen name={"list"} component={ListNotificationsComponent} options={{headerShown: false}}/>
            <Stack.Screen
                name={"detail"}
                component={DetailNotificationComponent}
                options={(route: { route: RouteProp<any, string> }) => {
                    const {notificationId} = route.route.params as { notificationId: string };

                    const notification = notificationContainer.items.find(notification => notification.id == notificationId)

                    return {
                        title: notification?.title,
                    }
                }}
            />
        </Stack.Navigator>
    )
}
