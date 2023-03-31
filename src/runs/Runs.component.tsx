/**
 * @ Author: Some student of the CPNV
 * @ Create Time: The past
 * @ Modified by: Clément Sartoni
 * @ Modified time: 2023-03-30 
 * @ Description: modified a bit this system to implement the "get runs from same artists" functionnality. 
 *   Had to add a route and modify the "RunDetailsParams" to add the possibility to pass a run directly.
 */
import {ListRunsComponent} from "./list/ListRuns.component";
import { ListRunsFromArtistComponent } from "./list/ListRunsFromArtist.component";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {DetailRunsComponent} from "./detail/DetailRuns.component";
import {RunsContainer} from "../Provider.component";
import {RunsSelectVehicleComponent} from "./RunsSelectVehicle.component";
import {RunsEndComponent} from "./RunsEnd.component";
import { CommentRunsComponent } from "./detail/comment/CommentRuns.component";
import { RunResource } from "../common/resources/Run.resource";

const Stack = createStackNavigator();

export interface RunDetailParams {
    runId: number, 
    run: RunResource | null 
}

export function RunsComponent() {
    const RunContainer = RunsContainer.useContainer();

    const generateStackOptionWithRunTitle = (route: { route: RouteProp<any, string> }) => {
        const params = route.route.params as RunDetailParams;

        if(params.run == null)
        {
            const run = RunContainer.items.find(run => run.id == params.runId)

            return {
                title: run?.title.toUpperCase(),
            }
        }
        else
        {
            return {
                title : params.run.title.toUpperCase(),
            }
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
            <Stack.Screen name={"listFromArtist"}
                          component={ListRunsFromArtistComponent}
                          options={{title : "Autres runs de l'artiste"}}/>            
            <Stack.Screen name={"end_run"}
                          component={RunsEndComponent}
                          options={(route) => {
                              return {
                                  ...generateStackOptionWithRunTitle(route),
                                  headerBackTitle: "Annuler"
                              }
                          }}/>
            <Stack.Screen
                name={"comment"}
                component={CommentRunsComponent}
                options={(route) => {
                    const {runId} = route.route.params as RunDetailParams;
                    const run = RunContainer.items.find(run => run.id == runId);
                    return {
                        title: `${run?.title.toUpperCase()} - Journal`,
                    }
                }}
            />
        </Stack.Navigator>
    )
}
