import Axios from "axios";
import { Form, Formik } from "formik";
import React, { useState,useEffect } from "react";
import { View,SafeAreaView,Text,StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ButtonComponent } from "./common/component/ButtonComponent";


const RunnersEnrollment = (props:any) => {
    const initialValues = {
        token: ""
    };
    const [response, setResponse]=useState(<div></div>);
    function getUserState() {
        return Axios.get("/me").then((res)=>{
            return res.data.status
        })
    }
    useEffect(() => {
        getUserState().then((status)=>{
            if(status){
                switch (status) {
                    case "hired":
                    case "taken":
                    case "free":
                    case "not-present":
                        props.setStateValidation(1);
                        break;
                    case "inactive":
                        setResponse(<View>On n'a pas besoin de toi, Merci.</View>)
                        break;
                    case "requested":
                        setResponse(<View>
                            Vous êtes sollicité
                        </View>)
                        break;
                    case "retired":
                        setResponse(<View>Merci pour ces années passées.</View>)
                        break;
                    case "confirmed":
                        setResponse(<View>Validation des données du permis...</View>)
                        break;
                    case "validated":
                        setResponse(<View>Ton inscription est en cours de validation.</View>)
                        break;
                    default:
                        break;
                }
            }
            
        });
    },[]);
    
    function onSubmit(){

    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.textCenter}>
                <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 30, marginBottom: 50}}>Processus d'inscription</Text>
            </View>
            <Text style={styles.textCenter}>{response}</Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        margin: 30
    },
    textCenter: {
        flexDirection: "row",
        justifyContent: "center",
    }
});
export default RunnersEnrollment;
