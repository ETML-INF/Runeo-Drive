import {SafeAreaView, StyleSheet, View, Text, NativeSyntheticEvent, NativeScrollEvent, Animated, InteractionManager} from "react-native";
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
import Axios from "axios";
import { getUserStatus, userStatusColor, getUserRole } from "../common/utils/User.utils";
import { StatusCircleComponent } from "../common/component/StatusCircle.component";
import { rootNavigationRef } from "../RootNavigator";

interface ProfilePageProps{
    user: UserResource,
    group: GroupResource | undefined,
}

export function ProfilePageComponent(){

    let navigation = useNavigation();
    let params = useRoute().params as ProfilePageProps;

    let user = params.user;
    let group = params.group;

    let baseURL = Axios.defaults. baseURL;

    let uri = "";

    if(baseURL)
    {
        uri = user.image_profile;
    }

    let statusColor = userStatusColor(user.status);

    return (
        <View style={styles.mainView}>
            <View style={styles.viewTop}>
                {
                    uri != "" && <Avatar containerStyle={[styles.avatar, {borderColor: statusColor}]} rounded size={200} source={{ uri: uri}}/>
                }
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.role}>{getUserRole(user.role)}</Text>
                <View style={styles.statusView}>
                    <StatusCircleComponent color={statusColor}></StatusCircleComponent>
                    <Text style={[styles.statusText, {color: statusColor}]}>{getUserStatus(user.status).toUpperCase()}</Text>
                </View>
            </View>
            <View style={styles.viewBottom}>
                {
                    group != undefined && <Text style={[styles.group, {backgroundColor: "#" + group.color}]}>{"Groupe " + group.name }</Text>
                }
                <Text>{user.firstname + " " + user.lastname}</Text>
                <Text>{user.email}</Text>
                <Text>{user.phone_number}</Text>
            </View>
            
            
            <Icon
                type='font-awesome'
                name={'cog'}
                size={45}
                containerStyle={styles.params}
                onPress={() =>{navigation.navigate("params")}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainView:{
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        backgroundColor: Colors.WHITE,
    },
    viewTop:{
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "60%",
    },
    viewBottom:{
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "35%",
    },
    avatar:{
        borderWidth: 5,
    },
    name:{
        fontSize: 24,
    },
    role:{
        fontSize:15,
    },
    statusView:{
        flexDirection: "row",
        alignItems: "center",
    },
    statusText:{
        fontSize: 18,
        fontWeight: "700",
        marginHorizontal: 7,
    },
    group:{
        color: Colors.WHITE,
        padding: 5,
        fontSize: 20
    },
    params:{
        position: "absolute",
        top: 20,
        right: 20,
    }
});