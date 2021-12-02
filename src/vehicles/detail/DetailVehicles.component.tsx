import {ScrollView} from "react-native";
import React, {Fragment} from "react";
import {useRoute} from "@react-navigation/native";
import {VehiclesContainer} from "../../Provider.component";
import {PlateDetailVehiclesComponent} from "./PlateDetailVehicles.component";
import {GasLevelDetailVehiclesComponent} from "./GasLevelDetailVehicles.component";
import {CommentDetailVehiclesComponent} from "./CommentDetailVehicles.component";
import {CreateCommentDetailVehicles} from "./CreateCommentDetailVehicles.component";

export interface VehicleDetailParams {
    vehicleId: number
}

export function DetailVehiclesComponent() {

    const vehiclesContainer = VehiclesContainer.useContainer();

    const route = useRoute();
    const {vehicleId} = route.params as VehicleDetailParams;

    const currentVehicle = vehiclesContainer.items.find(vehicle => vehicle.id === vehicleId);

    if (!currentVehicle) {
        console.error("No wehicle matcthing provided vehicle id " + vehicleId)
        return <Fragment/>;
    }

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <PlateDetailVehiclesComponent currentVehicle={currentVehicle}/>

            <GasLevelDetailVehiclesComponent currentVehicle={currentVehicle}/>

            <CreateCommentDetailVehicles currentVehicle={currentVehicle}/>

            <CommentDetailVehiclesComponent currentVehicle={currentVehicle}/>

        </ScrollView>
    )
}
