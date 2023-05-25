import {SafeAreaView, StyleSheet, View, Text, NativeSyntheticEvent, NativeScrollEvent, Animated} from "react-native";
import React, {Dispatch, SetStateAction, useEffect, useState, useRef} from "react";
import { Colors } from "../common/utils/Color.utils";
import moment, { Moment } from "moment";
import { ScrollView } from "react-native-gesture-handler";
import { ScheduleHour } from "./ScheduleHour.component";
import { ScheduleScheduleComponent } from "./ScheduleSchedule.component";
import { ScheduleResource } from "../common/resources/Schedule.resourse";
import { RunResource } from "../common/resources/Run.resource";
import { List } from "immutable";
import { ScheduleRunComponent } from "./ScheduleRun.component";
import { DateTime } from "luxon";
import { UserResource } from "../common/resources/User.resource";
import { Avatar } from "react-native-elements";
import { GroupResource } from "../common/resources/Group.resource";
import { Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

interface ProfilePageProps{
    user: UserResource,
    group: GroupResource,
}

export function ProfilePageComponent(props: ProfilePageProps){

    let route = useRoute();

    let user = route.params.user;

    return (
        <View style={styles.view}>
            <Avatar></Avatar>
            <Text>{user.name}</Text>
            <Text>{user.role}</Text>
            <Text>{user.status}</Text>
            <Text>{"Groupe "/*  + group.name */}</Text>
            <Text>{user.firstname + " " + user.lastname}</Text>
            <Text>{user.email}</Text>
            <Text>{user.phone_number}</Text>
            <Icon
                type='font-awesome'
                name={'cog'}
                size={35}
                onPress={() =>{navigation.navigate("params")}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view:{
        flexDirection: "column",
    },
    text:{
        position: "relative",
        top: -25,
        left: 5,
        fontSize: 16,
    }
});