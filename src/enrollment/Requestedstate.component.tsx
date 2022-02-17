import { View, Text } from "react-native"
import { ButtonComponent } from "../common/component/ButtonComponent"
import React from "react";
const RequestedState = (props: any) => {


    return (
        <View>
            <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Participer en tant que conducteur pour le Runeo de cette année ?</Text>
            <View style={{ marginTop: 10 }}>
                <ButtonComponent
                    title="Je participe"
                    onPress={() => props.setNewState(3)}
                />
            </View>
            <View style={{ marginTop: 10 }}>
                <ButtonComponent
                    title="Je ne participe pas"
                    onPress={() => props.setNewState(1)}
                />
            </View>
            <View style={{ marginTop: 10 }}>
                <ButtonComponent
                    title="Je ne veux plus jamais participer"
                    onPress={() => props.setNewState(8)}
                />
            </View>
        </View>
    )
}
export default RequestedState;