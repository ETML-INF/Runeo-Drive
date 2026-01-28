import React, { useEffect } from "react";
import { AuthContainer } from "./Provider.component";
import { AuthComponent } from "./auth/Auth.component";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListUsersComponent } from "./users/listUsers.component";
import { Icon } from "react-native-elements";
import { RunsComponent } from "./runs/Runs.component";
import { VehiclesComponent } from "./vehicles/Vehicles.components";
import { ScheduleNavigatorComponent } from "./schedule/ScheduleNavigator.component";
import { Colors } from "./common/utils/Color.utils";
import { ListFastDialsComponent } from "./fastDials/FastDials.component";
import { Text, View, StyleSheet } from "react-native";
import { ButtonComponent } from "./common/component/ButtonComponent";

const Tab = createBottomTabNavigator();

export const RUNS_TAB = "Runs"

const ACTIVE_TAB_COLOR = Colors.BLUE;
const INACTIVE_TAB_COLOR = Colors.BLACK;

export function RouterComponent() {
    const authContainer = AuthContainer.useContainer();
    const tabBarIconGen = (name: string) => {
        return ({ focused }: { focused: boolean }) => (<Icon
            type='font-awesome'
            name={name}
            color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
        />)
    };

    // ugly hotfix to solve race condition on some devices
    useEffect( () => {
        if(!authContainer.authenticatedUser) {
            setTimeout(refreshAuth, 1000) 
        }
    } )

    function refreshAuth() {
        authContainer.refreshAuthenticated().catch((error) => { console.error(error); });
    }

    const onLogoutPress = () => {
        authContainer.logout().catch((error) => console.log(error))
    }

    if (authContainer.authenticatedUser) {
        switch (authContainer.authenticatedUser?.status.slug) {
            case "hired":
            case "taken":
            case "free":
            case "not-present":
                return (
                    <Tab.Navigator initialRouteName={RUNS_TAB} screenOptions={{
                        tabBarActiveTintColor: ACTIVE_TAB_COLOR,
                        tabBarInactiveTintColor: INACTIVE_TAB_COLOR,
                    }}>
                        <Tab.Screen
                            name={RUNS_TAB}
                            options={{
                                tabBarIcon: tabBarIconGen('list'),
                            }}
                            component={RunsComponent}
                        />
                        <Tab.Screen
                            name="Chauffeurs"
                            options={{
                                tabBarIcon: tabBarIconGen('drivers-license-o'),
                            }}
                            component={ListUsersComponent}
                        />
                        <Tab.Screen
                            name="Véhicules"
                            options={{
                                tabBarIcon: tabBarIconGen('car'),
                            }}
                            component={VehiclesComponent}
                        />
                        <Tab.Screen
                            name="Rapide"
                            options={{
                                tabBarIcon: tabBarIconGen('phone'),
                            }}
                            component={ListFastDialsComponent}
                        />
                        <Tab.Screen
                            name="Horaire"
                            options={{
                                tabBarIcon: tabBarIconGen('calendar'),
                            }}
                            component={ScheduleNavigatorComponent}
                        />
                    </Tab.Navigator>
                )
            default:
                return (
                    <View style={styles.error}>
                        <Text style={styles.error_message}>Problème!</Text>
                        <Text style={styles.error_message}>Ton compte n'est pas encore activé</Text>
                        <Text style={styles.discreet}>({authContainer.authenticatedUser?.status.slug})</Text>
                        <ButtonComponent title="Retour" onPress={onLogoutPress}/>
                    </View>
                )
        }
    }
    return (
        <AuthComponent />
    )
}

const styles = StyleSheet.create({
    error: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding:30
    },
    error_message: {
        fontSize: 35,
        textAlign: "center"
    },
    discreet: {
        fontSize: 12,
        color: "#dddddd",
        textAlign: "center"
    }
});