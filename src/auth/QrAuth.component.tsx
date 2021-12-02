import React, {useState} from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import {Alert, StyleSheet, Text, View, ViewToken} from "react-native";
import {AuthContainer} from "../Provider.component";
import {Button, Icon} from "react-native-elements";
import {Colors} from "../common/utils/Color.utils";

export function QrAuthComponent() {
    const authContainer = AuthContainer.useContainer();
    const [isQRCodeScannerVisible, setIsQRCodeScannerVisible] = useState(false);

    let content = (
        <Button
            buttonStyle={styles.button}
            icon={
                <Icon
                    style={{marginRight: 10}}
                    type='font-awesome'
                    name={'qrcode'}
                    color={'white'}
                />
            }
            title={"Scanner un QR code"} onPress={() => setIsQRCodeScannerVisible(true)}/>
    );


    if (isQRCodeScannerVisible) {
        content = (
            <View>
                {/* <QRCodeScanner
                    cameraStyle={{overflow: 'hidden', width: "100%"}}
                    reactivate={true}
                    reactivateTimeout={1000}
                    onRead={({data: token}: Event & { data: string }) => {
                        authContainer.authenticate(token).catch(() => {
                            Alert.alert("Authentification", "Le qrcode scanné est invalide")
                        });
                    }}

                    notAuthorizedView={<Text>Vous devez autoriser l'accès à la caméra pour scanner un qrcode.</Text>}
                /> */}
            </View>
        )
    }

    return (
        <View style={{
            width: "100%",
            height: "100%",
            marginTop: 30
        }}>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
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

