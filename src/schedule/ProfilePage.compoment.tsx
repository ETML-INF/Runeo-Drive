/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-25
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-31 09:12:54
 *   Description: Page de profil. Cette page affiche toutes les informations disponibles de l'utilisateur. 
 *   Elle doit être appelée en renseignant dans les paramètres de navigation un utilisateur et son groupe.
 *   For the moment, the status is commented because it wasn't updated at all anywhere. In order to implement it, uncomment lines in this file and find a way to update it more frequenty.
 */


import {StyleSheet, View, Text} from "react-native";
import React, {} from "react";
import { Colors } from "../common/utils/Color.utils";
import { UserResource } from "../common/resources/User.resource";
import { Avatar } from "react-native-elements";
import { GroupResource } from "../common/resources/Group.resource";
import { Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import Axios from "axios";
import { getUserStatus, userStatusColor, getUserRole } from "../common/utils/User.utils";
import { StatusCircleComponent } from "../common/component/StatusCircle.component";

interface ProfilePageProps{
    user: UserResource,
    group: GroupResource | undefined,
}

export function ProfilePageComponent(){

    let navigation = useNavigation();
    let params = useRoute().params as ProfilePageProps;

    if(params == undefined || params.user == undefined)
    {
        return <View style={styles.mainView}><Text>Aucun utilisateur spécifié à la page. Merci de contacter un administrateur si ce problème apparait.</Text></View>
    }

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
                    uri != "" && <Avatar containerStyle={[styles.avatar, {borderColor: Colors.BLACK/* statusColor */}]} rounded size={200} source={{ uri: uri}}/>
                }
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.role}>{getUserRole(user.role)}</Text>
                {/* <View style={styles.statusView}>
                    <StatusCircleComponent color={statusColor}></StatusCircleComponent>
                    <Text style={[styles.statusText, {color: statusColor}]}>{getUserStatus(user.status).toUpperCase()}</Text>
                </View> */}
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
        // put to five when implementing the status
        borderWidth: 3,
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