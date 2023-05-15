/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-08
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-15 13:25:33
 *   Description: Navigation for the schedule page
 */

import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import { SchedulePageComponent } from "./SchedulePage.component";
import {ParamsComponent} from "./params/Params.component"
import { DetailRunsComponent } from "../runs/detail/DetailRuns.component";

const Stack = createStackNavigator();

export function ScheduleNavigatorComponent() {
    return (
        <Stack.Navigator initialRouteName={"schedule"}>
            <Stack.Screen name={"schedule"} component={SchedulePageComponent} options={{headerShown: false}}/>
            <Stack.Screen name={"profile"} component={SchedulePageComponent} options={{title: "Mon profil"}}/>
            <Stack.Screen name={"params"} component={ParamsComponent} options={{title: "Paramètres / crédits"}}/>
            <Stack.Screen
                name={"detail"}
                component={DetailRunsComponent}
                options={(route) => {return  {title: route.route.params.run.title.toUpperCase()}}}
            />
        </Stack.Navigator> 
    )
}
