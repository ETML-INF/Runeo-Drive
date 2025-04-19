/**
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-22 09:33:05
 *   Description: Added a dropdown that allows to switch festival or enter a custom URL. 
 *   The dropdown only decide if the text field is visible or not and fills it with data, so the formik form only uses the text field.
 */

import React, { useState } from "react";
import { View, Text } from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInputComponent } from "../common/component/TextInput.component";
import { ButtonComponent } from "../common/component/ButtonComponent";
import Dropdown from "../common/component/Dropdown";
import { urlConfigData } from "../../BackendList";
import { useNavigation } from '@react-navigation/native';

export const TokenAuthComponent = () => {
    const data = urlConfigData;
    const [selected, setSelected] = useState(data[0]);
    const [urlVisible, setUrlVisible] = useState(false);

    const initialValues = {
        email: "",
        password: "",
        url: selected.value
    };

    function onPress(item: { label: string; value: string }): void {
        setUrlVisible(item.value === "");
    }

    const onSubmit = async (
        values: { email: string; password: string; url: string },
        { setSubmitting, setFieldError }: FormikHelpers<any>
    ) => {
        setSubmitting(true);
        const apiUrl = values.url.endsWith("/") ? values.url + "me/token" : values.url + "/me/token";

        try {
            const response = await axios.post(apiUrl, {
                email: values.email,
                password: values.password
            });
            const token = response.data.token;
            await AsyncStorage.setItem("apiToken", token);
            await AsyncStorage.setItem("apiUrl", values.url);
            await AsyncStorage.setItem("authenticatedUser", JSON.stringify(response.data.user));

        } catch (error) {
            const e = error as AxiosError;
            if (e.response?.status === 401) {
                setFieldError("password", "Email ou mot de passe invalide.");
            } else {
                setFieldError("email", "Erreur de connexion au serveur.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={yup.object().shape({
                email: yup.string().email().required("Email requis"),
                password: yup.string().min(6).required("Mot de passe requis"),
                url: yup.string().required("URL requise")
            })}
        >
            {(formik) => (
                <View>
                    <Text style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10 }}>Je suis</Text>
                    <Dropdown label={selected.label} data={data} onSelect={setSelected} onPress={onPress} />

                    {urlVisible && (
                        <>
                            <Text style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10 }}>URL</Text>
                            <TextInputComponent
                                name="url"
                                formik={formik}
                                inputProps={{ value: "http://localhost:8000/api" }}
                            />
                        </>
                    )}

                    <Text style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10 }}>Mon email c'est</Text>
                    <TextInputComponent
                        name="email"
                        formik={formik}
                        inputProps={{ placeholder: "Ton email" }}
                    />

                    <Text style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10 }}>et mon mot de passe est</Text>
                    <TextInputComponent
                        name="password"
                        formik={formik}
                        inputProps={{
                            placeholder: "Ton mot de passe",
                            secureTextEntry: true
                        }}
                    />

                    <ButtonComponent
                        title="Connexion"
                        onPress={formik.handleSubmit}
                        disabled={formik.isSubmitting || !formik.isValid}
                    />
                </View>
            )}
        </Formik>
    );
};
