import {RunResource, RunStatus} from "../../common/resources/Run.resource";
import React, {Fragment} from "react";
import {CardComponentWithIcon, CardContainerComponent} from "../../common/component/Card.component";
import {Alert, StyleSheet, Text, View} from "react-native";
import {Icon, Button} from "react-native-elements";
import {AuthContainer, NetworkContainer, RunsContainer} from "../../Provider.component";
import {getGasLevelText} from "../../common/utils/Vehicle.utils";
import { canSelectVehicle, canTake, canChangeVehicle } from "../../common/utils/Run.utils";
import {useNavigation} from "@react-navigation/native";
import {RunsSelectVehicleParams} from "../RunsSelectVehicle.component";
import {ButtonComponent} from "../../common/component/ButtonComponent";
import {Colors} from "../../common/utils/Color.utils";
import {callPhoneNumber} from "../../common/utils/Phone.utils";

export interface RunnersDetailRunsComponentProps {
    currentRun: RunResource
}

export function DetailRunsRunnersComponent({currentRun}: RunnersDetailRunsComponentProps) {
    const {authenticatedUser} = AuthContainer.useContainer()
    const {isInternetReachable} = NetworkContainer.useContainer();
    const {takeRun} = RunsContainer.useContainer();
    const navigation = useNavigation();

    const isFinished = currentRun.status == RunStatus.FINISHED

    const selectVehicle = (runnerId: number, type: string) => {
        const params: RunsSelectVehicleParams = {runnerId, type}
        navigation.navigate("select_vehicle", params)
    }

    return (
        <CardComponentWithIcon title={"Runners"} icon={"tachometer-alt"}>
            <Text style={{color: Colors.GREY, fontFamily: 'Montserrat-Regular'}}>Chauffeurs et Véhicules :</Text>
            {
                currentRun.runners.map(runner => {
                    let vehicleCategory = runner.vehicle_category;

                    if (runner.vehicle) {
                        vehicleCategory = runner.vehicle.type;
                    }

                    return (
                        <CardContainerComponent key={runner.id}>
                            <View>
                                <View style={styles.runnerContent}>
                                    {runner.user ? (
                                        <View>
                                            {runner.user.id == authenticatedUser.id ? (<Text style={styles.runnerIsMe}>Moi</Text>) : (<Text style={styles.runnerTitle}>{runner.user.name}</Text>)}
                                        </View>
                                    ) : null}

                                    <View style={styles.vehicleView}>
                                        {runner.vehicle_category ? (
                                            <View style={styles.vehicleType}>
                                                <Icon type='font-awesome-5' name={'car'} size={18}/>
                                                <Text style={styles.textRegular}> {vehicleCategory?.type} </Text>
                                            </View>
                                        ) : null}

                                        {runner.vehicle ? (
                                            <Fragment>
                                                <Text style={styles.vehicleName}> {runner.vehicle?.name} </Text>
                                                <View style={styles.gasView}>
                                                    <Text style={styles.textRegular}>{getGasLevelText(runner.vehicle.gas_level)}</Text>
                                                    <Icon type='material-community' name={'fuel'} size={18}/>
                                                </View>
                                            </Fragment>
                                        ) : null}

                                        { canSelectVehicle (authenticatedUser,runner, currentRun) ? (
                                            <ButtonComponent
                                                title="Choisir un véhicule"
                                                disabled={ !isInternetReachable }
                                                color="#f194ff"
                                                onPress={() => selectVehicle(runner.id, runner.vehicle_category?.type as string)}
                                            />
                                        ) : null}
                                    </View>

                                    { canTake (authenticatedUser,runner, currentRun) ? (
                                        <ButtonComponent
                                            title={"Je prends"}
                                            disabled={ !isInternetReachable }
                                            onPress={() => takeRun(currentRun, runner)
                                                .then(() => Alert.alert("Confirmation", "Vous faites maintenant partie du Run."))
                                                .catch(() => Alert.alert("Erreur", "Erreur lors de la prise du Run."))
                                            }/>
                                    ) : null}

                                    { canChangeVehicle(authenticatedUser,runner, currentRun) ? (
                                        <View>
                                            <ButtonComponent
                                                title="Changer de véhicule"
                                                color="#f194ff"
                                                onPress={() => selectVehicle(runner.id, runner.vehicle_category?.type as string)}/>
                                        </View>
                                    ) : null}
                                </View>
                            </View>

                        </CardContainerComponent>
                    )
                })
            }
        </CardComponentWithIcon>
    )
}

const styles = StyleSheet.create({
    textRegular: {
      fontFamily: 'Montserrat-Regular',
    },

    runnerContent: {
        display: "flex",
        flex: 6,
    },

    runnerTitle: {
        fontFamily: 'Montserrat-Regular',
        marginBottom: 5,
        padding: 2,
        textAlign: "center"
    },

    runnerIsMe: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: "bold",
        backgroundColor: "#98d898",
        marginBottom: 5,
        padding: 2,
        textAlign: "center",
        borderRadius: 8
    },

    vehicleView: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 5,
    },

    vehicleType: {
        flexDirection: "row",
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },

    vehicleName: {
        flex: 2,
        textAlign: "center",
        fontFamily: 'Montserrat-Regular',
    },

    gasView: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

});
