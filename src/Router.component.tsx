import React, { useState } from "react";
import { AuthContainer, UsersContainer } from "./Provider.component";
import { AuthComponent } from "./auth/Auth.component";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListUsersComponent } from "./users/listUsers.component";
import { Icon } from "react-native-elements";
import { RunsComponent } from "./runs/Runs.component";
import { VehiclesComponent } from "./vehicles/Vehicles.components";
import { ListFastDialsComponent } from "./fastDials/FastDials.component";
import { NotificationsComponent } from "./notifications/Notifications.component";
import { Colors } from "./common/utils/Color.utils";
import RunnersEnrollment from "./Enrollment.component";
import Axios from "axios";

const Tab = createBottomTabNavigator();

export const RUNS_TAB = "Runs"

const ACTIVE_TAB_COLOR = Colors.BLUE;
const INACTIVE_TAB_COLOR = Colors.BLACK;

export function RouterComponent() {
    const [userState, setUserState] = useState("");
    const authContainer = AuthContainer.useContainer();

    const tabBarIconGen = (name: string) => {
        return ({ focused }: { focused: boolean }) => (<Icon
            type='font-awesome'
            name={name}
            color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
        />)
    };

    const getUserState = () => {
        return Axios.get("/me").then((res) => {
            return res.data.status
        })
    }
    if (authContainer.authenticatedUser) {
        getUserState().then((status) => {
            setUserState(status);
        })
        switch (userState) {
            case "hired":
            case "taken":
            case "free":
            case "not-present":
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
            default:
                return (<RunnersEnrollment userState={userState} setUserState={setUserState}/>)
        }
        
    }

    return (
        <AuthComponent />
    )
}
