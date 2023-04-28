/**
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-04-05 13:47:18
 *   Description: Added a dropdown that allows to switch festival or enter a custom URL. 
 *   The dropdown only decide if the text field is visible or not and fills it with data, so the formik form only uses the text field.
 */

import React, {FC, useState} from "react";
import {Field, Formik, FormikHelpers} from "formik";
import * as yup from 'yup';
import {Text, View, Modal} from "react-native";
import {TextInputComponent} from "../common/component/TextInput.component";
import {AuthContainer} from "../Provider.component";
import {ButtonComponent} from "../common/component/ButtonComponent";
import Dropdown from "../common/component/Dropdown";
import { urlConfigData } from "../../App";

export const TokenAuthComponent = () => {
    //#region dropdown config
    const data = urlConfigData;
    
    const [selected, setSelected] = useState(data[0]);

    const [urlVisible, setUrlVisible] = useState(false);

    function onPress(item: { label: string; value: string }) : void {
        setUrlVisible(item.value == '')
    }
    //#endregion

    const authContainer = AuthContainer.useContainer();
    const initialValues = {
        token: "",
        url: selected.value
    };

    const onSubmit = async (values: { token: string, url: string }, {setSubmitting, setFieldError}: FormikHelpers<any>) => {
        setSubmitting(true);

        try {
            await authContainer.authenticate(values);
        } catch (e) {
            // TODO : peut-être que cette partie pourrait être fait plus dynamiquement en gérant les types des erreurs 
            // comme en C# et non le message, mais je ne suis pas sûr que cela soit possible en react et cela fonctionne bien comme cela.
            if(e.message == "Network Error")
            {
                if(urlVisible)
                {
                    setFieldError("url", "Erreur de connexion, vérifie ton accès à internet et l'URL que tu as entré.");
                }
                else
                {
                    setFieldError("token", "Erreur de connexion, vérifie ton accès à internet.");
                }
            }
            else
            {
                setFieldError("token", "Erreur de token, vérifie que le token que tu as entré est bien valide pour le festival sélectionné.")
            }
            setSubmitting(false);
        }
    };

    return (
        <Formik
            onSubmit={onSubmit}
            validationSchema={
                yup.object().shape({
                    token: yup.string().min(5).required(),
                    url: yup.string().min(1).required()
                })}
            initialValues={initialValues}
            enableReinitialize={true}>
            {(formik) => (
                <View>
                    <Text style={{fontFamily: 'Montserrat-ExtraBold', marginLeft: 10}}>FESTIVAL</Text>
                    <Dropdown label={selected.label} data={data} onSelect={setSelected} onPress={onPress}/>

                    <View style={urlVisible ? {} : {display: "none"}}>
                        <Text style={{fontFamily: 'Montserrat-ExtraBold', marginLeft: 10}}>URL</Text>
                        <TextInputComponent
                        name={"url"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Ex: https://192.168.241.121:8000/api"
                        }}/>
                    </View>

                    <Text style={{fontFamily: 'Montserrat-ExtraBold', marginLeft: 10}}>TOKEN</Text>
                    <TextInputComponent
                        name={"token"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Ton token"
                        }}/>
                    

                    <ButtonComponent
                        title="Connexion"
                        onPress={formik.handleSubmit}
                        disabled={formik.isSubmitting || !formik.isValid}/>
                </View>
            )}

        </Formik>
    );
};
