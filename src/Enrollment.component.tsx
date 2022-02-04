import Axios from "axios";
import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, StyleSheet, Button } from "react-native";
import { ButtonComponent } from "./common/component/ButtonComponent";
import { TextInputComponent } from "./common/component/TextInput.component";
import * as ImagePicker from 'expo-image-picker';


const RunnersEnrollment = (props: any) => {
    async function  validateDatas() {
        let result:ImagePicker.ImagePickerResult;
        result = await ImagePicker.launchImageLibraryAsync({
            base64:true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        console.log(result.base64)
        
    }

    let response = <View></View>;
    switch (props.userState) {
        case "inactive":
            response = <View>On n'a pas besoin de toi, Merci.</View>;
            break;
        case "requested":
            response = (

                <View>
                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Participer en tant que conducteur pour le Runeo de cette année ?</Text>
                    <View style={{ marginTop: 10 }}>
                        <ButtonComponent
                            title="Je participe"
                            onPress={() => setNewState("confirmed", 3)}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <ButtonComponent
                            title="Je ne participe pas"
                            onPress={() => setNewState("inactive", 1)}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <ButtonComponent
                            title="Je ne veux plus jamais participer en tant que conducteur"
                            onPress={() => setNewState("retired", 8)}
                        />
                    </View>
                </View>



            )
            break;
        case "retired":
            response = (<View>Vous n'êtes plus sollicité pour runeo.</View>)
            break;
        case "confirmed":
            response = (
                <Formik
                    onSubmit={validateDatas}
                    initialValues={{ test: "initialValues" }}
                >
                    {(formik) => (
                        <View>
                            <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Permis de conduire</Text>
                            <ButtonComponent
                                title="Importer permis de conduire"
                                onPress={formik.handleSubmit}
                                />
                

                            <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Pseudo</Text>
                            <TextInputComponent
                                name={"pseudo"}
                                formik={formik}
                                inputProps={{
                                    placeholder: "Pseudo"
                                }} />
                            <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Charte</Text>
                            <TextInputComponent
                                name={"charte"}
                                formik={formik}
                                inputProps={{
                                    placeholder: "Charte"
                                }} />
                            <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Nom / Prénom</Text>
                            <TextInputComponent
                                name={"pseudo"}
                                formik={formik}
                                inputProps={{
                                    placeholder: "Nom / prénom"
                                }} />
                            <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Numéro de téléphone</Text>
                            <TextInputComponent
                                name={"pseudo"}
                                formik={formik}
                                inputProps={{
                                    placeholder: "Nom / prénom"
                                }} />
                            <ButtonComponent
                                title="Valider"
                                onPress={formik.handleSubmit}
                                disabled={formik.isSubmitting || !formik.isValid} />
                            <ButtonComponent
                                title="Annuler"
                                onPress={()=>{}}
                                disabled={formik.isSubmitting || !formik.isValid} />
                        </View>
                    )}

                </Formik>

            )
            break;
        case "validated":
            response = (<View>En attente de la validation d'engagement de la part d'un administrateur.</View>)
            break;
        default:
            break;
    }




    async function setNewState(stateName: string, stateId: number) {
        let user = JSON.parse(localStorage.getItem("authenticatedUser")!);
        Axios.patch(`/users/${user.id}/status`, { "status_id": stateId }).then((res) => {
            props.setUserState(stateName);
        }).catch((err) => { console.log(err) })
    }
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.textCenter}>
                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 30, marginBottom: 50 }}>Processus d'inscription</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                {response}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        margin: 30
    },
    textCenter: {
        flexDirection: "row",
        justifyContent: "center",
    }
});
export default RunnersEnrollment;
