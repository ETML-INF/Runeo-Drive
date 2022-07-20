import {RunResource} from "../../common/resources/Run.resource";
import {callPhoneNumber} from "../../common/utils/Phone.utils";
import React, {Fragment} from "react";
import {StyleSheet} from "react-native";
import {Colors} from "../../common/utils/Color.utils";
import { ButtonComponent } from "../../common/component/ButtonComponent";

export interface DetailRunsContactBtnComponent {
    currentRun: RunResource
}

export function DetailRunsContactBtn({currentRun}: DetailRunsContactBtnComponent) {
    const numContact = currentRun.num_contact;
    if (numContact && numContact != "0") {
        return (
            <ButtonComponent titleStyle={styles.buttonTitle} title="Appeler" onPress={() => callPhoneNumber(numContact)}/>
        )
    }

    return <Fragment/>
}

const styles = StyleSheet.create({
    button: {
        marginRight: 10,
        marginLeft: 10,

        height: 30,
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
    buttonTitle: {
        marginVertical: 5,
    }
})
