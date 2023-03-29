import {RunResource} from "../../common/resources/Run.resource";
import {Alert, StyleSheet, Text, View} from "react-native";
import React, {Fragment, useEffect} from "react";
import {CardComponent, CardComponentWithIcon} from "../../common/component/Card.component";
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
    return (
        <CardComponent>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <ButtonComponent titleStyle={styles.buttonTitle} title="Autres runs de l'artiste" onPress={onChangePress}/>
                </View>
            </View>
        </CardComponent>
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

