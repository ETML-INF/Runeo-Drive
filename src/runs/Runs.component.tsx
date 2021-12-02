import {ListRunsComponent} from "./list/ListRuns.component";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {DetailRunsComponent} from "./detail/DetailRuns.component";
import {RunsContainer} from "../Provider.component";
import {RunsSelectVehicleComponent} from "./RunsSelectVehicle.component";
import {RunsEndComponent} from "./RunsEnd.component";

const Stack = createStackNavigator();

export interface RunDetailParams {
    runId: number
}

export function RunsComponent() {
    const RunContainer = RunsContainer.useContainer();

    const generateStackOptionWithRunTitle = (route: { route: RouteProp<any, string> }) => {
        const {runId} = route.route.params as RunDetailParams;

        const run = RunContainer.items.find(run => run.id == runId)

        return {
            title: run?.title.toUpperCase(),
        }
    }

    return (
        <Stack.Navigator initialRouteName={"list"}>
            <Stack.Screen name={"list"} component={ListRunsComponent} options={{headerShown: false}}/>
            <Stack.Screen
                name={"detail"}
                component={DetailRunsComponent}
                options={generateStackOptionWithRunTitle}
            />
            <Stack.Screen name={"select_vehicle"}
                          component={RunsSelectVehicleComponent}
                          options={{title: "Choisissez un véhicule", headerBackTitle: "Annuler"}}/>
            <Stack.Screen name={"end_run"}
                          component={RunsEndComponent}
                          options={(route) => {
                              return {
                                  ...generateStackOptionWithRunTitle(route),
                                  headerBackTitle: "Annuler"
                              }
                          }}/>
        </Stack.Navigator>
    )
}
