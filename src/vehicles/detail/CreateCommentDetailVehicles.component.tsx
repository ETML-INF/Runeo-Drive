import React from "react";
import {View} from "react-native";
import {Input} from "react-native-elements";
import {NetworkContainer, VehiclesContainer} from "../../Provider.component";
import {Formik} from "formik";
import {VehicleResource} from "../../common/resources/Vehicle.resource";
import {ButtonComponent} from "../../common/component/ButtonComponent";

export function CreateCommentDetailVehicles(props: { currentVehicle: VehicleResource }) {

    const vehiclesContainer = VehiclesContainer.useContainer();
    const networkContainer = NetworkContainer.useContainer();

    return (
        <View>
            <Formik
                initialValues={{content: ''}}
                onSubmit={(value, {resetForm}) => {
                    vehiclesContainer.postComment(props.currentVehicle, value.content)
                    resetForm();
                }}
            >
                {({handleChange, handleBlur, handleSubmit, values}) => (
                    <View style={{paddingHorizontal: 10}}>
                        <Input
                            onChangeText={handleChange('content')}
                            onBlur={handleBlur('content')}
                            value={values.content}
                            placeholder='Ajouter un commentaire'
                        />
                        <ButtonComponent disabled={!networkContainer.isInternetReachable} onPress={handleSubmit}
                                         title='Ajouter'/>
                    </View>
                )}
            </Formik>
        </View>
    )
}
