/**
 *  ETML
 *   De: Theo Bensaci
 *   Date: 10:33 01.02.2023
 *   Description: Popup de fin de run permtant de definire le niveau d'essence de la voiture
 */


import React, {Fragment, useState, useEffect} from "react";
import {Alert, Text, View, Modal,Image, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {Button, Icon} from "react-native-elements";
import {useRunFromRouteParam} from "../common/hook/Run.hook";
import {AuthContainer, RunsContainer} from "../Provider.component";
import {gasLevelToIcon, getGasLevelText} from "../common/utils/Vehicle.utils";
import {useNavigation} from "@react-navigation/native";
import {Colors} from "../common/utils/Color.utils";
import {IconButtonComponent} from "../common/component/IconButtonComponent";
import { JerikanIcon } from "../common/utils/Jerikan.utils";

export interface RunsEndPopUpProps {
    isVisable: boolean;
    onPopUpClose: RunsEndPopUpCloseCallBack;
}

interface RunsEndPopUpCloseCallBack{
    () : void;
}


export function RunsEndPopUpComponent(props : RunsEndPopUpProps) {
    const currentRun = useRunFromRouteParam();

    const {authenticatedUser} = AuthContainer.useContainer();
    const navigation = useNavigation();
    const {stopRun} = RunsContainer.useContainer();

    const currentRunner = currentRun?.runners.find(runner => runner.user?.id === authenticatedUser?.id);

    //+1 because the slider don't support value bellow 0
    const [gasLevel, setGasLevel] = useState((currentRunner?.vehicle?.gas_level || -1) + 1)

    const getRealGasLevelValue = () => gasLevel - 1;

    const FUIL_LVL_BNT_SIZE={x:100,y:100};


    //#region function

    function onInfoOptionSelect(val: number){
        if(currentRun==null || currentRunner?.vehicle==null){
            thorwError();
            return;
        
        }
        let newGasLevel=(val==-1)?currentRunner.vehicle.gas_level:val-1;
        stopRun(currentRun, newGasLevel)
        .then(() => {
            props.onPopUpClose();
        })
        .catch(() => {
            thorwError();
        })
    }

    function thorwError(){
        Alert.alert("Erreur", "Le run n'a pas pu être terminé.")
    }

    /**
     * renvoie l'icon de jerickan corespondant id
     * @param id id 
     * @returns img avec l'icon de jerican
     */
    function getJericanIcon(id:number){
        let img;
        switch(id){
            case 0:
                img=JerikanIcon.Happy_White;
                break;
            case 1 : 
                img=JerikanIcon.Idk_White;
                break;
            case 2 : 
                img=JerikanIcon.Death_White;
                break;
            default:
                img=JerikanIcon.Happy_White;
                break;
        }
        return <Image source={img} style={FuilPopUpStyles.fuilLevlIcon}/>
    }

    //#endregion

    if (!currentRun) {
        console.error("No run matching provided found for provided run id ")
        return <Fragment/>;
    }

    return (
        <Modal
            style={{margin: 0, minHeight:"100%"}}
            animationType="fade"
            visible={props.isVisable}
            transparent={true}>
            <TouchableOpacity style={FuilPopUpStyles.centeredView} activeOpacity={1} onPress={props.onPopUpClose}>
                <TouchableOpacity style={FuilPopUpStyles.modalView} activeOpacity={1}>
                    <View style={{justifyContent: "center" , flexDirection: "column", marginBottom: 30}}>
                        <View style={FuilPopUpStyles.textWithIcon}>
                            <Icon
                                style={FuilPopUpStyles.icon}
                                type='font-awesome-5'
                                name={`car`}
                                size={18}
                                color='#055BA6'
                            />
                            <Text style={FuilPopUpStyles.title}>
                                Niveau d'essence
                            </Text>
                        </View>
                        <Text>Merci d'indiquer si le véhicule {currentRunner?.vehicle?.name} possède encore de l'essence</Text>
                    </View>
                    <View style={FuilPopUpStyles.bntContainer}>
                        <IconButtonComponent
                            addStyle={FuilPopUpStyles.bntAddStyle}
                            addTextStyle={FuilPopUpStyles.textAddStyle}
                            height={FUIL_LVL_BNT_SIZE.y}
                            width={FUIL_LVL_BNT_SIZE.x}
                            title={'Vide'}
                            color={Colors.STATUS_PROBLEM}
                            icon={getJericanIcon(2)}
                            onPress={()=>{onInfoOptionSelect(1)}}>
                        </IconButtonComponent>
                        <IconButtonComponent
                            addStyle={FuilPopUpStyles.bntAddStyle}
                            addTextStyle={FuilPopUpStyles.textAddStyle}
                            height={FUIL_LVL_BNT_SIZE.y}
                            width={FUIL_LVL_BNT_SIZE.x}
                            title={'Inconnu'}
                            color={Colors.STATUS_NEED}
                            icon={getJericanIcon(1)}
                            onPress={()=>{onInfoOptionSelect(-1)}}>
                        </IconButtonComponent>
                        <IconButtonComponent
                            addStyle={FuilPopUpStyles.bntAddStyle}
                            addTextStyle={FuilPopUpStyles.textAddStyle}
                            height={FUIL_LVL_BNT_SIZE.y}
                            width={FUIL_LVL_BNT_SIZE.x}
                            title={'Rempli'}
                            color={Colors.STATUS_READY}
                            icon={getJericanIcon(0)}
                            onPress={()=>{onInfoOptionSelect(5)}}>
                        </IconButtonComponent>
                    </View>
                    <TouchableOpacity style={FuilPopUpStyles.backBnt} onPress={props.onPopUpClose}>
                        <Text style={FuilPopUpStyles.backBnt_text}>Annuler</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

const FuilPopUpStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0005',
      width:"100%",
      minHeight:"100%",
      padding:9,
    },
    modalView: {
        margin:0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        color: Colors.BLUE,
        paddingBottom: 5,
        fontFamily: 'Montserrat-Medium',
    },
    textWithIcon: {
        flexDirection: "row",
    },
    icon: {
        marginRight: 5,
        marginBottom: 5,

    },
    bntContainer:{
        flexDirection: "row", 
        justifyContent: "space-evenly",  
        margin:0, 
        width:"100%",
        backgroundColor:"#fff",
        borderRadius:20,
        padding:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 0,
    },
    bntAddStyle:{
        margin:5,
        justifyContent:"center",
        flexDirection:"column",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 15,
    },
    textAddStyle:{
        fontSize:15,
        marginBottom:10
    },
    fuilLevlIcon:{
        marginTop:70,
        width:50,
        height:"100%",
        resizeMode:"contain"
    },
    backBnt:{
        marginTop:10,
        padding:15,
        paddingBottom:0
    },
    backBnt_text:{
        fontSize:15,
        color:Colors.BLUE
    }
  });
