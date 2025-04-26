import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {VehiclesContainer} from "../../Provider.component"
import {VehicleResource} from "../../common/resources/Vehicle.resource";
import {ListItem} from "react-native-elements";
import {gasLevelToColorRecord, getGasLevelText, statusColor} from "../../common/utils/Vehicle.utils"
import {ListCommonResourceComponent} from "../../common/component/ListCommonResource.component";
import {StatusCircleComponent} from "../../common/component/StatusCircle.component";
import {Colors} from "../../common/utils/Color.utils";
import { CommonResource } from "../../common/resources/Common.resource";

export interface ListVehiclesViewComponentProps {
    onItemPress: (vehicle: VehicleResource) => void,
    hideStatusColor?: boolean,
    filter?: (item: VehicleResource) => boolean
}

export function ListVehiclesViewComponent(props: ListVehiclesViewComponentProps) {
    const renderItem = (item: VehicleResource) => (
        <ListItem
            bottomDivider
            style={styles.listElement}
            onPress={() => props.onItemPress(item)}
        >
            <View style={styles.bigContainer}>
                <ListItem.Content>
                    <ListItem.Title>
                        <Text style={styles.nameText}>{item.name}</Text>
                    </ListItem.Title>
                </ListItem.Content>

                {!props.hideStatusColor ? (
                    <ListItem.Content style={{}}>
                        <StatusCircleComponent color={statusColor(item.status)}/>
                    </ListItem.Content>
                ) : null}

                <ListItem.Content style={styles.iconContainerContainer}>
                    <View style={styles.iconContainer}>
                        <Text style={[styles.iconText, {color: gasLevelToColorRecord[item.gas_level]}]}>
                            Essence: {getGasLevelText(item.gas_level)}
                        </Text>
                    </View>        
                </ListItem.Content>
            </View>
        </ListItem>
    )

    return (
        <SafeAreaView>
            <ListCommonResourceComponent
                filter={props.filter}
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
    },
    listElement: {
        padding: 0,
        resizeMode:"contain",
    },
    bigContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        height: 40
    },
    iconContainerContainer:{
        
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: "center",
        padding: 5,
        height: 72,
        width: '100%',
    },
    icon: {
        resizeMode:"contain",
        height: 40,
        width: 40
    },
    iconText: {
        color: Colors.STATUS_READY,
        width: 170,
        fontSize: 15,
        textAlign: "right",
        textAlignVertical: "center",
    }
})
