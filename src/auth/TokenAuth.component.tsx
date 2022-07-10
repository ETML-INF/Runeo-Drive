import React from "react";
import {Formik, FormikHelpers} from "formik";
import * as yup from 'yup';
import {Text, View} from "react-native";
import {TextInputComponent} from "../common/component/TextInput.component";
import {AuthContainer} from "../Provider.component";
import {ButtonComponent} from "../common/component/ButtonComponent";

export const TokenAuthComponent = () => {
    const authContainer = AuthContainer.useContainer();
    const initialValues = {
        token: ""
    };

    const onSubmit = async (values: { token: string }, {setSubmitting, setFieldError}: FormikHelpers<any>) => {
        setSubmitting(true);

        try {
            await authContainer.authenticate(values.token)
        } catch (e) {
            setFieldError("token", "Erreur de connexion, veuillez verifier votre token")
            setSubmitting(false);
        }
    };

    return (
        <Formik
            onSubmit={onSubmit}
            validationSchema={
                yup.object().shape({
                    token: yup.string().min(5).required()
                })}
            initialValues={initialValues}>
            {(formik) => (
                <View>
                    <Text style={{fontFamily: 'Montserrat-ExtraBold', marginLeft: 10}}>TOKEN</Text>
                    <TextInputComponent
                        name={"token"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Votre token"
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
