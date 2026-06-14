import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInputComponent } from "../common/component/TextInput.component";
import { ButtonComponent } from "../common/component/ButtonComponent";
import Dropdown from "../common/component/Dropdown";
import { useBackendList } from "../common/hook/BackendList.hook";
import { AuthContainer } from "../Provider.component";

export const TokenAuthComponent = () => {
    const { backends, loading } = useBackendList();
    const [selected, setSelected] = useState<{ label: string; value: string } | null>(null);
    const authContainer = AuthContainer.useContainer();

    useEffect(() => {
        if (backends.length > 0) {
            setSelected(backends[0]);
        }
    }, [backends]);

    const initialValues = {
        email: "",
        password: "",
        url: selected?.value ?? ""
    };

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
            await authContainer.refreshAuthenticated();
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

    if (loading || selected === null) {
        return <ActivityIndicator style={{ marginTop: 20 }} />;
    }

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
            {(formik) => {
                const onPress = (item: { label: string; value: string }) => {
                    setSelected(item);
                    formik.setFieldValue("url", item.value);
                };

                return (
                    <View>
                        {backends.length > 1 && (
                            <>
                                <Text style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10 }}>Je suis</Text>
                                <Dropdown label={selected.label} data={backends} onSelect={setSelected} onPress={onPress} />
                            </>
                        )}

                        {backends.length === 1 && selected.value !== "" && (
                            <Text style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10 }}>
                                Connexion {selected.label}
                            </Text>
                        )}

                        {selected.value === "" && (
                            <>
                                <Text style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10 }}>URL</Text>
                                <TextInputComponent
                                    name="url"
                                    formik={formik}
                                    inputProps={{
                                        placeholder: "http://localhost:8000/api"
                                    }}
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
                );
            }}
        </Formik>
    );
};
