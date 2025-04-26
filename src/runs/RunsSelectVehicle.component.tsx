import React, {useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import {VehicleResource} from "../common/resources/Vehicle.resource";
import {ListVehiclesViewComponent} from "../vehicles/list/ListVehiclesView.component";
import {RunsContainer} from "../Provider.component";
import {RunDetailParams} from "./Runs.component";
import {Alert, View} from "react-native";

export interface RunsSelectVehicleParams {
    runnerId: number,
    type: string
}

export function RunsSelectVehicleComponent() {
    //const [toggleVehicleSelectionPopup, setToggleVehicleSelectionPopup] = useState(false);
    //const [PopupVehicle, setPopupVehicle] = useState(null);
    const {updateVehicle} = RunsContainer.useContainer();
    const navigation = useNavigation();
    const route = useRoute();
    const {runnerId, type} = route.params as RunsSelectVehicleParams;

    return( 
        <ListVehiclesViewComponent
            filter={(vehicle: VehicleResource) => vehicle.type.type === type}
            hideStatusColor={true}
            onItemPress={(vehicle: VehicleResource) =>{
                updateVehicle(runnerId, vehicle.id)
                    .then(() => {
                        navigation.goBack()
                    })
                    .catch(() => {
                        Alert.alert("Erreur", "Le véhicule n'a pas pu être sélectionné")
                    })
                }
            }
        />
    )
}
