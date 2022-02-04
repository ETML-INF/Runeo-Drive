import React from "react";
import {AuthContainer} from "./Provider.component";
import {AuthComponent} from "./auth/Auth.component";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ListUsersComponent} from "./users/listUsers.component";
import {Icon} from "react-native-elements";
import {RunsComponent} from "./runs/Runs.component";
import {VehiclesComponent} from "./vehicles/Vehicles.components";
import {ListFastDialsComponent} from "./fastDials/FastDials.component";
import {NotificationsComponent} from "./notifications/Notifications.component";
import {Colors} from "./common/utils/Color.utils";

const Tab = createBottomTabNavigator();

export const RUNS_TAB = "Runs"

const ACTIVE_TAB_COLOR = Colors.BLUE;
const INACTIVE_TAB_COLOR = Colors.BLACK;

export function RouterComponent() {
    const authContainer = AuthContainer.useContainer();

    const tabBarIconGen = (name: string) => {
        return ({focused}: { focused: boolean }) => (<Icon
            type='font-awesome'
            name={name}
            color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
        />)
    };

    if (authContainer.authenticatedUser) {
        if (authContainer.authenticatedUser.role == "manager")
        {
            return (
                <Tab.Navigator initialRouteName={RUNS_TAB} tabBarOptions={{
                    activeTintColor: ACTIVE_TAB_COLOR,
                    inactiveTintColor: INACTIVE_TAB_COLOR,
                }}>
                    <Tab.Screen
                        name={RUNS_TAB}
                        options={{
                            tabBarIcon: tabBarIconGen('list'),
                        }}
                        component={RunsComponent}
                    />
                    <Tab.Screen
                        name="Utils"
                        options={{
                            tabBarIcon: tabBarIconGen('info-circle'),
                        }}
                        component={ListFastDialsComponent}
                    />
                </Tab.Navigator>
            )
        }
        else {
            return (
                <Tab.Navigator initialRouteName={RUNS_TAB} tabBarOptions={{
                    activeTintColor: ACTIVE_TAB_COLOR,
                    inactiveTintColor: INACTIVE_TAB_COLOR,
                }}>
                    <Tab.Screen
                        name={RUNS_TAB}
                        options={{
                            tabBarIcon: tabBarIconGen('list'),
                        }}
                        component={RunsComponent}
                    />
                    <Tab.Screen
                        name="Drivers"
                        options={{
                            tabBarIcon: tabBarIconGen('drivers-license-o'),
                        }}
                        component={ListUsersComponent}
                    />
                    <Tab.Screen
                        name="Vehicles"
                        options={{
                            tabBarIcon: tabBarIconGen('car'),
                        }}
                        component={VehiclesComponent}
                    />
                    <Tab.Screen
                        name="Notifications"
                        options={{
                            tabBarIcon: tabBarIconGen('bell'),
                        }}
                        component={NotificationsComponent}
                    />
                    <Tab.Screen
                        name="Utils"
                        options={{
                            tabBarIcon: tabBarIconGen('info-circle'),
                        }}
                        component={ListFastDialsComponent}
                    />
                </Tab.Navigator>
            )
        }
    }

    return (
        <AuthComponent/>
    )
}
