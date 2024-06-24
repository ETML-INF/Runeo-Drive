/**
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-22 09:33:05
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
import { AxiosError } from "axios";
import { ScrollView } from "react-native-gesture-handler";

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

        authContainer.authenticate(values).then(() => setFieldError('url','OK')).catch((e: AxiosError) => {
            if(e.response)
            {
                switch(e.response?.status)
                {
                    case 401:
                        setFieldError("token", "Erreur de token, vérifie que le token que tu as entré est bien valide pour le festival sélectionné.");
                        if(urlVisible){setFieldError("url", "Il est aussi possible que tu aies oublié le \"/api\" à la fin de ton URL.");}
                        break;
                    default:
                        setFieldError("token", "Il y a eu un problème lors de la connexion. Contactez un administrateur pour en savoir plus. (erreur HTTP:" + e.response?.status + ")");
                        break;
                }
            }
            else
            {
                if(urlVisible)
                {
                    setFieldError("url", "Erreur de connexion, vérifie ton accès à internet et l'URL que tu as entré et réessaye plus tard.");
                }
                else
                {
                    setFieldError("token", "Erreur de connexion, vérifie ton accès à internet ou réessaye plus tard.");
                }
            }
            setSubmitting(false);
        });
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
