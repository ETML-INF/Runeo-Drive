import {RunResource} from "../../common/resources/Run.resource";
import {Button, Icon} from "react-native-elements";
import {callPhoneNumber} from "../../common/utils/Phone.utils";
import React, {Fragment} from "react";
import {StyleSheet} from "react-native";
import {Colors} from "../../common/utils/Color.utils";

export interface DetailRunsContactBtnComponent {
    currentRun: RunResource
}

export function DetailRunsContactBtn({currentRun}: DetailRunsContactBtnComponent) {
    const numContact = currentRun.num_contact;

    if (numContact && numContact != "0") {
        return (
            <Button
                buttonStyle={styles.button}
                icon={
                    <Icon
                        style={{marginRight: 15}}
                        type='font-awesome'
                        name={'phone'}
                        color={'white'}
                    />
                }
                onPress={() => callPhoneNumber(numContact)}
                title={`Personne de contact${currentRun.name_contact ? ": " + currentRun.name_contact : ""}`}
            />

        )
    }

    return <Fragment/>
}

const styles = StyleSheet.create({
    button: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,

        height: 50,
        backgroundColor: Colors.BLUE,
        borderRadius: 25,

        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
})
