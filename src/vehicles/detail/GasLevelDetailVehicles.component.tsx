import {VehicleResource} from "../../common/resources/Vehicle.resource";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {CardComponent} from "../../common/component/Card.component";
import {InlineTextComponent} from "../../common/component/text/InlineText.component";
import {getGasLevelText} from "../../common/utils/Vehicle.utils";


export interface gasLevelDetailVehiclesComponentProps {
    currentVehicle: VehicleResource
}

export function GasLevelDetailVehiclesComponent({currentVehicle}: gasLevelDetailVehiclesComponentProps) {
    return (
        <View>
            <CardComponent title={"NIVEAU D'ESSENCE"}>
                <InlineTextComponent>
                    <Text style={styles.textContent}>Niveau d'essence: </Text><Text
                    style={styles.boldContent}>{getGasLevelText(currentVehicle.gas_level)}</Text>
                </InlineTextComponent>
            </CardComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    textContent: {
        fontFamily: 'Montserrat-Regular',
    },

    boldContent: {
        fontFamily: 'Montserrat-SemiBold',
    }
});
