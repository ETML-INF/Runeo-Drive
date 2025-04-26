
import React, {Fragment, useState} from "react";
import {Alert, SafeAreaView, Text, View} from "react-native";
import {useRunFromRouteParam} from "../common/hook/Run.hook";
import {AuthContainer, RunsContainer} from "../Provider.component";
import {Slider} from "react-native-elements";
import { getGasLevelText} from "../common/utils/Vehicle.utils";
import {useNavigation} from "@react-navigation/native";
import {CardComponentWithIcon} from "../common/component/Card.component";
import {Colors} from "../common/utils/Color.utils";
import {ButtonComponent} from "../common/component/ButtonComponent";

export function RunsEndComponent() {
    const currentRun = useRunFromRouteParam();

    const {authenticatedUser} = AuthContainer.useContainer();
    const navigation = useNavigation();
    const {stopRun} = RunsContainer.useContainer();

    const currentRunner = currentRun?.runners.find(runner => runner.user?.id === authenticatedUser?.id)

    //+1 because the slider don't support value bellow 0
    const [gasLevel, setGasLevel] = useState((currentRunner?.vehicle?.gas_level || -1) + 1)

    const getRealGasLevelValue = () => gasLevel - 1;

    if (!currentRun) {
        console.error("No run matching provided found for provided run id ")
        return <Fragment/>;
    }

    return (
        <SafeAreaView style={{flex: 1, flexDirection: "column", justifyContent: "space-between", backgroundColor: "white"}}>

            <View style={{justifyContent: "center", flexDirection: "row", margin: 10, marginTop: 50}}>
                <CardComponentWithIcon title={'Niveau d\'essence'} icon={'car'}>
                    <Text>Si tu le connais, merci d'introduire le niveau d'essence de {currentRunner?.vehicle?.name}</Text>
                </CardComponentWithIcon>
            </View>

            <View style={{
                flex: 1,
                alignItems: 'stretch',
                justifyContent: 'center',
                margin: "5%"

            }}>
                <Slider
                    value={gasLevel}
                    onValueChange={setGasLevel}
                    step={1}
                    minimumValue={0}
                    maximumValue={5}

                    //animateTransitions={true}
                    thumbStyle={{backgroundColor: `${Colors.BLUE}`}}
                />

            </View>

            <View style={{marginBottom: 50, margin: 10}}>
                <ButtonComponent
                    title={'TERMINER'}
                    onPress={() =>
                        stopRun(currentRun, getRealGasLevelValue())
                            .then(() => {
                                navigation.goBack()
                            })
                            .catch(() => {
                                Alert.alert("Erreur", "Le run n'a pas pu être terminé.")
                            })
                    }>
                </ButtonComponent>
            </View>

        </SafeAreaView>
    )
}