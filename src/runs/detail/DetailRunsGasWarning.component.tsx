/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-02-02
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-02-08 08:40:28
 *   Description: Ajoute un avertissement en cas de manque d'essence d'un ou de plusieurs des véhicules
 */

import {RunResource} from "../../common/resources/Run.resource";
import {StyleSheet, Text, View} from "react-native";
import React, {Fragment} from "react";
import {CardComponentWithIcon} from "../../common/component/Card.component";
import {InlineTextComponent} from "../../common/component/text/InlineText.component";
import {ImportantTextComponent} from "../../common/component/text/ImportantText.component";
import {Colors} from "../../common/utils/Color.utils";
import { participates } from "../../common/utils/Run.utils";
import { AuthContainer } from "../../Provider.component";
import { DetailRunsContactBtn } from "./DetailRunsContactBtn.component";
import { List } from "immutable";
import {VehicleResource} from "../../common/resources/Vehicle.resource";
import {Icon} from "react-native-elements";


export interface GasWarningDetailRunsComponentProps {
    currentRun: RunResource;
}

export function DetailRunsGasWarningComponent({currentRun}: GasWarningDetailRunsComponentProps) {

    const {authenticatedUser} = AuthContainer.useContainer();

    let emptyVehicles = Array<JSX.Element>();

    currentRun.runners.forEach(runner => {
        if(runner.vehicle != null)
        {
            if(runner.vehicle.gas_level < 1)
            {
                emptyVehicles.push(<InlineTextComponent>
                                        <ImportantTextComponent>Le véhicule {runner.vehicle.name} a besoin de carburant.</ImportantTextComponent>
                                    </InlineTextComponent>)
            }
        }
        
    });

    if(emptyVehicles.length > 0)
    {
        return (
            <View style={styles.card}>
                <View style={styles.icon}>
                    <Icon
                        style={styles.icon}
                        type='font-awesome-5'
                        name={"exclamation-triangle"}
                        size={60}
                        color={Colors.STATUS_PROBLEM}
                    />
                </View>
                <View style={styles.left}>
                    <Text style={styles.title}>Attention à l'essence</Text>
                    {emptyVehicles}
                </View>
            </View>);
            /*<CardComponentWithIcon title={"Attention à l'essence"} icon={"exclamation-triangle"} color={Colors.STATUS_PROBLEM}>
                {emptyVehicles}
        </CardComponentWithIcon>*/
    }
    else
    {
        return(null);
    }
}

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 7,
        marginRight: 7,

        padding: 15,
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "red",
        borderWidth: 7,
        backgroundColor: Colors.WHITE,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

        flexDirection: "row",
    },
    title: {
        color: Colors.STATUS_PROBLEM,
        paddingBottom: 5,
        fontFamily: 'Montserrat-Medium',
        fontWeight: "bold",
        fontSize: 20,
    },
    textWithIcon: {
        flexDirection: "row",
    },
    icon: {
        marginRight: 5,
        marginBottom: 5,

    },
    left: {
        flexDirection: "column",
        display: "flex",
    }
});