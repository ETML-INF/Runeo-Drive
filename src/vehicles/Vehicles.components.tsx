import {ListVehiclesComponent} from "./list/ListVehicles.component";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {DetailVehiclesComponent} from "./detail/DetailVehicles.component";
import {VehiclesContainer} from "../Provider.component";
import {getStatusName} from "../common/utils/Vehicle.utils"


const Stack = createStackNavigator();

export interface VehicleDetailParams {
    vehicleId: number
}

export function VehiclesComponent() {
    const VehicleContainer = VehiclesContainer.useContainer();

    return (
        <Stack.Navigator initialRouteName={"list"}>
            <Stack.Screen name={"list"} component={ListVehiclesComponent} options={{headerShown: false}}/>
            <Stack.Screen
                name={"detail"}
                component={DetailVehiclesComponent}
                options={(route) => {
                    const {vehicleId} = route.route.params as VehicleDetailParams;

                    const vehicle = VehicleContainer.items.find(vehicle => vehicle.id == vehicleId)
                    return {
                        title: `${vehicle?.name.toUpperCase()} - ${getStatusName(vehicle?.status || "")}`,
                    }
                }}
            />
        </Stack.Navigator>
    )
}
