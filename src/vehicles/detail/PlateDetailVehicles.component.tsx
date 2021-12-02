import {VehicleResource} from "../../common/resources/Vehicle.resource";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {CardComponent} from "../../common/component/Card.component";
import {InlineTextComponent} from "../../common/component/text/InlineText.component";

export interface PlateDetailVehiclesComponentProps {
    currentVehicle: VehicleResource
}

export function PlateDetailVehiclesComponent({currentVehicle}: PlateDetailVehiclesComponentProps) {
    return (
        <View>
            <CardComponent title={"PLAQUES"}>
                <InlineTextComponent>
                    <Text style={styles.textContent}>{currentVehicle.plate_number}</Text>
                </InlineTextComponent>
            </CardComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    textContent: {
        fontFamily: 'Montserrat-Regular',
    }
});
