import React from "react";
import {useNavigation} from "@react-navigation/native";
import {ListVehiclesViewComponent} from "./ListVehiclesView.component";
import {VehicleResource} from "../../common/resources/Vehicle.resource";

export function ListVehiclesComponent() {
    const navigation = useNavigation();

    return <ListVehiclesViewComponent
        onItemPress={(vehicle: VehicleResource) => {
            navigation.navigate("detail", {vehicleId: vehicle.id})
        }}
    />
}
