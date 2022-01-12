import Axios from "axios";
import { Formik } from "formik";
import React, { useState,useEffect } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ButtonComponent } from "./common/component/ButtonComponent";


const RunnersEnrollment = (props:any) => {
    const [userState,setUserState]=useState('');

    function getUserState() {
        return Axios.get("/me").then((res)=>{
            return res.data.status
        })
    }
    useEffect(() => {
        getUserState().then((status)=>{
            setUserState(status);
            
        });
    });
    if(userState){
        switch (userState) {
            case "hired":
            case "taken":
            case "free":
            case "not-present":
                props.setStateValidation(1);
                break;
            case "inactive":
                break;
            case "requested":
                break;
            case "retired":
                break;
            case "confirmed":
                break;
            case "validated":
                break;
            default:
                break;
        }
    }
    
    return (
        
        <View>
          <div>test</div>
        </View>
    )
}
export default RunnersEnrollment;
