import Axios from "axios";
import React from "react";
import { View, Text } from "react-native";
import { ButtonComponent } from "../common/component/ButtonComponent";
import { TextInputComponent } from "../common/component/TextInput.component";
import * as ImagePicker from 'expo-image-picker';
import { AuthContainer } from "../Provider.component";
import * as Yup from "yup";
import { Formik } from "formik";

const ConfirmState = (props: any) => {
    const { authenticatedUser } = AuthContainer.useContainer();
    let imageBase64: string;
    async function storeImage() {
        let result: ImagePicker.ImagePickerResult;
        try {
            result = await ImagePicker.launchImageLibraryAsync({
                base64: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
            if(!result.cancelled)
                imageBase64 = "data:image/png;base64," + result.base64;
        } catch (error) {
            throw error.message;
        }
    }
    const onSubmit = async (userInfo: object) => {
        try {
            let res = await Axios.patch(`/users/${authenticatedUser?.id}`, {
                name: userInfo.name,
                lastname: userInfo.lastname,
                firstname: userInfo.firstname,
                phone_number: userInfo.phone_number
            });
            let imgRes = await Axios.patch(`/users/${authenticatedUser?.id}`, { "image_license": imageBase64 });
            if (res.status == 200 && imgRes.status == 200) {
                props.setNewState(4);
            }
        } catch (e) {
            console.error(e)
        }
    };
    const onCancel = async () => {
        props.setNewState(2);
    }

    return (

        <Formik
            onSubmit={onSubmit}
            initialValues={{
                name: authenticatedUser?.name,
                lastname: authenticatedUser?.lastname,
                firstname: authenticatedUser?.firstname,
                phone_number: authenticatedUser?.phone_number
            }}
            validationSchema={
                Yup.object().shape({
                    name:Yup.string().min(2).required()
                })}
        >
            {(formik) => (
                <View>
                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Permis de conduire</Text>
                    <View style={{ marginTop: 10 }}>
                    <ButtonComponent
                        title="Importer permis de conduire"
                        onPress={storeImage}
                    />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Pseudo</Text>
                        <TextInputComponent
                            name={"name"}
                            formik={formik}
                            inputProps={{
                                placeholder: "Pseudo",
                            }}
                        />
                    </View>
                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Charte</Text>
                    <TextInputComponent
                        name={"charte"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Charte",
                            disabled: true
                        }} />
                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Nom</Text>
                    <TextInputComponent
                        name={"lastname"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Nom",
                            disabled: true
                        }} />
                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Prénom</Text>
                    <TextInputComponent
                        name={"firstname"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Prénom",
                            disabled: true,
                            value: "test"
                        }} />
                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', marginLeft: 10 }}>Numéro de téléphone</Text>
                    <TextInputComponent
                        name={"phone_number"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Numéro",
                            disabled: true,
                        }} />
                    <View style={{ marginTop: 10 }}>
                        <ButtonComponent
                            title="Valider"
                            onPress={formik.handleSubmit}
                            disabled={formik.isSubmitting || !formik.isValid} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <ButtonComponent
                            title="Annuler"
                            onPress={onCancel}
                            disabled={formik.isSubmitting || !formik.isValid} />
                    </View>
                </View>
            )}

        </Formik>
    )
}
export default ConfirmState;