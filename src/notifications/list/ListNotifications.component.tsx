import React from "react";
import {SafeAreaView} from "react-native";
import {ListCommonResourceComponent} from "../../common/component/ListCommonResource.component";
import {NotificationsContainer} from "../../Provider.component";
import {ListItem} from "react-native-elements";
import {NotificationResource} from "../../common/resources/Notification.resource";
import {useNavigation} from "@react-navigation/native";
import {DateTime} from "luxon";
import {DATE_FORMAT} from "../../common/utils/Date.utils";
import {Colors} from "../../common/utils/Color.utils";
import {StatusCircleComponent} from "../../common/component/StatusCircle.component";

export function ListNotificationsComponent() {
    const navigation = useNavigation();

    const renderItem = (item: NotificationResource) => (
        <ListItem
            bottomDivider
            onPress={() => navigation.navigate("detail", {notificationId: item.id})}
        >
            <ListItem.Content style={{flex: 2}}>
                <ListItem.Title style={item.hasBeenRead ? {fontFamily: 'Montserrat-Regular'} : {fontFamily: "Montserrat-Medium"}}>
                    {item.title}
                </ListItem.Title>
                <ListItem.Subtitle style={{color: Colors.GREY, fontFamily: 'Montserrat-Regular'}}>
                    {DateTime.fromISO(item.receivedAt).toFormat(DATE_FORMAT)}
                </ListItem.Subtitle>
            </ListItem.Content>

            <ListItem.Content style={{flexDirection: "row"}}>
                <StatusCircleComponent color={Colors.LIGHT_BLUE}/>
            </ListItem.Content>

            <ListItem.Chevron/>
        </ListItem>
    )

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <ListCommonResourceComponent
                sort={(itemA: NotificationResource, itemB: NotificationResource) => {
                    return DateTime.fromISO(itemA.receivedAt) > DateTime.fromISO(itemB.receivedAt) ? 1 : -1
                }}
                dataContainer={NotificationsContainer}
                renderItem={renderItem}/>
        </SafeAreaView>
    )
}
