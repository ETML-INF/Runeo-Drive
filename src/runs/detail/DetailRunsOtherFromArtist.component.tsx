/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-03-29
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-04-05 07:06:43
 *   Description: The button leading to the list of runs from the same artist. Has the particularity of not showing up 
 *   when the run page is called again to see the details of the other runs. 
 */

import {RunResource} from "../../common/resources/Run.resource";
import {Alert, StyleSheet, Text, View} from "react-native";
import React, {Fragment, useEffect} from "react";
import {CardComponent, CardComponentWithIcon, CardContainerComponent} from "../../common/component/Card.component";
import {ButtonComponent} from "../../common/component/ButtonComponent";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export interface InfoDetailRunsComponentProps {
    currentRun: RunResource
}

export function DetailRunsOtherFromArtistComponent({currentRun}: InfoDetailRunsComponentProps) {
    const navigation = useNavigation();

    const onChangePress = async () => {
        navigation.navigate("listFromArtist", {runId: currentRun.id});
    }

    //if the page is called after the runs from other artist page the index is tree 
    if(navigation.getState().index >= 3)
    {
        return null
    }

    return (
        <CardContainerComponent>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <ButtonComponent titleStyle={styles.buttonTitle} title="Autres runs de l'artiste" onPress={onChangePress}/>
                </View>
            </View>
        </CardContainerComponent>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
    },
    container: {
        flex: 1,
        padding: 10,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
    },
    buttonWrapper: {
        flex: 1,
        padding: 5
    },
    buttonTitle: {
        marginVertical: 5,
    }
})

