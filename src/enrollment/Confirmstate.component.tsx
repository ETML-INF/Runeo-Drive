import Axios from "axios";
import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, StyleSheet, Button } from "react-native";
import { ButtonComponent } from "../common/component/ButtonComponent";
import { TextInputComponent } from "../common/component/TextInput.component";
import * as ImagePicker from 'expo-image-picker';
import { AuthContainer } from "../Provider.component";


const ConfirmState = (props: any) => {
    const {authenticatedUser} = AuthContainer.useContainer();

    async function storeImage() {
        let result: ImagePicker.ImagePickerResult;
        let imageBase64: string;
        
        try {
            result = await ImagePicker.launchImageLibraryAsync({
                base64: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
            imageBase64 = "data:image/png;base64," + result.base64;
            Axios.patch(`/users/${user.id}`, { "image_license": imageBase64 });
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit = async (userInfo: object) => {
        try {
            let res = await Axios.patch(`/users/${authenticatedUser?.id}`, {
                name:userInfo.name,
                lastname:userInfo.lastname,
                firstname:userInfo.firstname,
                phone_number:userInfo.phone_number
            });
            if(res.status == 200){
                Axios.patch(`/users/${authenticatedUser?.id}/status`, {
                    status_id:2,
                });
            }
        } catch (e) {
            console.log(e)
        }
    };


    return (
       
        <Formik
            onSubmit={onSubmit}
            initialValues={{
                name:authenticatedUser?.name,
                lastname:authenticatedUser?.lastname,
                firstname:authenticatedUser?.firstname,
                phone_number:authenticatedUser?.phone_number
            }}
        >
            {(formik) => (
                <View>
                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Permis de conduire</Text>
                    <ButtonComponent
                        title="Importer permis de conduire"
                        onPress={storeImage}
                    />
                    
                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Pseudo</Text>
                    <TextInputComponent
                        name={"name"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Pseudo",
                        }}
                         />
                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Charte</Text>
                    <TextInputComponent
                        name={"charte"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Charte",
                            disabled:true
                        }} />
                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Nom</Text>
                    <TextInputComponent
                        name={"lastname"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Nom",
                            disabled:true
                        }} />
                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Prénom</Text>
                    <TextInputComponent
                        name={"firstname"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Prénom",
                            disabled:true,
                            value:"test"
                        }} />
                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Numéro de téléphone</Text>
                    <TextInputComponent
                        name={"phone_number"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Numéro",
                            disabled:true,
                        }} />
                    <ButtonComponent
                        title="Valider"
                        onPress={formik.handleSubmit}
                        disabled={formik.isSubmitting || !formik.isValid} />
                    <ButtonComponent
                        title="Annuler"
                        onPress={() => { }}
                        disabled={formik.isSubmitting || !formik.isValid} />
                </View>
            )}

        </Formik>
    )
}
export default ConfirmState;