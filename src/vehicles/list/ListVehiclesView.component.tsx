import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {VehiclesContainer} from "../../Provider.component"
import {VehicleResource} from "../../common/resources/Vehicle.resource";
import {ListItem} from "react-native-elements";
import {gasLevelToIcon, getGasLevelText, statusColor} from "../../common/utils/Vehicle.utils"
import {ListCommonResourceComponent} from "../../common/component/ListCommonResource.component";
import {StatusCircleComponent} from "../../common/component/StatusCircle.component";
import {Colors} from "../../common/utils/Color.utils";

export interface ListVehiclesViewComponentProps {
    onItemPress: (vehicle: VehicleResource) => void,
    hideStatusColor?: boolean
}

export function ListVehiclesViewComponent(props: ListVehiclesViewComponentProps) {
    const renderItem = (item: VehicleResource) => (
        <ListItem
            bottomDivider
            onPress={() => props.onItemPress(item)}
        >
            <ListItem.Content>
                <ListItem.Title>
                    <Text style={styles.nameText}>{item.name}</Text>
                </ListItem.Title>
            </ListItem.Content>

            <ListItem.Content style={{flexDirection: "row"}}>
                <View>
                    {gasLevelToIcon(item.gas_level)}
                    <Text style={{color: Colors.BLUE}}>{getGasLevelText(item.gas_level)}</Text>
                </View>
            </ListItem.Content>

            {!props.hideStatusColor ? (
                <ListItem.Content style={{flexDirection: "row"}}>
                    <StatusCircleComponent color={statusColor(item.status)}/>
                </ListItem.Content>
            ) : null}

            <ListItem.Chevron/>
        </ListItem>
    )

    return (
        <SafeAreaView>
            <ListCommonResourceComponent
                sort={(vehicleA: VehicleResource, vehicleB: VehicleResource) => {
                    return vehicleA.name > vehicleB.name ? 1 : -1
                }}
                dataContainer={VehiclesContainer}
                renderItem={renderItem}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    nameText: {
        fontFamily: 'Montserrat-Medium',
    }
})
