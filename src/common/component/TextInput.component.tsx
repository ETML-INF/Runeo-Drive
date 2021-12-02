import {Input, InputProps} from "react-native-elements";
import {FormikProps} from "formik";
import React from "react";

export interface TextInputProps {
    name: string,
    formik: FormikProps<any>,
    inputProps: InputProps
}

export const TextInputComponent = (props: TextInputProps) => {
    const error = props.formik.touched[props.name] && props.formik.errors[props.name] ? props.formik.errors[props.name] : null;

    return <Input
        {...props.inputProps}
        onChangeText={props.formik.handleChange(props.name)}
        onBlur={props.formik.handleBlur(props.name)}
        value={props.formik.values[props.name]}
        errorMessage={error ? error as string : ""}
        errorStyle={error ? {color: 'red'} : null}
    />
};
