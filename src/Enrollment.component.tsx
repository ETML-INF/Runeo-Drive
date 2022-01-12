import Axios from "axios";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ButtonComponent } from "./common/component/ButtonComponent";

const RunnersEnrollment = () => {
    function handleSubmit(){
    }
    function getUsersFromApi() {
        return Axios.get("/me").then(res => console.log(res))
    }
    function getUserState() {
        return Axios.get("/me").then(res => console.log(res))
    }

   

    return (
        <View>
          <div>test</div>
        </View>
    )
}
export default RunnersEnrollment;
