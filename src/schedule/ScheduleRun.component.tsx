/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-10
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-31 09:00:21
 *   Description: represents one users's run on on the main schedule, with the particularity that it adapts 
 *      to the place available and the amount of runners in the run.
 */
import {StyleSheet, View, Text, Pressable} from "react-native";
import React, { DOMElement } from "react";
import { Colors } from "../common/utils/Color.utils";
import { RunResource } from "../common/resources/Run.resource";
import { statusColor } from "../common/utils/Run.utils";
import { Icon } from "react-native-elements";
import { AuthContainer } from "../Provider.component";

interface ScheduleRunProps {
    y: number, 
    height: number, 
    run: RunResource,
    onRunPress: (run: RunResource) => void,
}

export function ScheduleRunComponent(props: ScheduleRunProps){
    let lineheight = 25;
    let isMultiple = props.run.runners.count() > 1;
    let isMultipleAndShort = isMultiple && props.height/lineheight < 4;
    let isMultipleAndLong = isMultiple && !isMultipleAndShort;
    let runnersString = '';

    if(isMultipleAndLong)
    {
        runnersString = '';

        let amountOfOthers = 0;

        props.run.runners.forEach((runner) => {
            if(runner.user != null)
            {   
                if(runner.user.id != AuthContainer.useContainer().authenticatedUser?.id)
                    runnersString += runner.user.name + ', ';
            }  
            else
            {
                amountOfOthers++;
            }        
        })

        if(runnersString.endsWith(', '))
        {
            runnersString =  runnersString.substring(0, runnersString.length - 3);
        }

        if(amountOfOthers != 0)
        {
            runnersString += ' et ' + amountOfOthers + (amountOfOthers > 1 ? ' chauffeurs manquants': ' chauffeur manquant');
        }
    }

    //TODO move the stylesheet or at least most of the logic here to make the JSX more readable.

    return (
        <Pressable onPress={() => props.onRunPress(props.run)} style={[styles.container,{top: props.y, height: props.height, backgroundColor: statusColor(props.run)}]}>
            <View style={styles.upContainer}>
                <Text style={styles.id}>{'#' + props.run.id}</Text>
                { isMultipleAndShort&&
                    <View style={styles.iconShortContainer}>
                        <View style={styles.iconShort}><Icon type='font-awesome-5' size={30} name={"users"} color={Colors.WHITE}/></View>
                        <Text style={styles.runnersAmount}>{props.run.runners.count()}</Text>
                    </View>  
                }
                <Text numberOfLines={Math.round(isMultipleAndLong? props.height/lineheight/2 : props.height/lineheight)} style={[styles.title, isMultipleAndShort? {width: '58%'} : {width: '75%'}]}>
                    {props.run.title.toUpperCase()}
                </Text>
            </View>
            {isMultipleAndLong && 
            <View style={styles.downContainer}>
                <View style={styles.icon}><Icon type='font-awesome-5' size={30} name={"users"} color={Colors.WHITE}/></View>
                <Text style={styles.runners}>{runnersString}</Text>
            </View>}
            
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        width: "80%",
        left: "16%",
        borderRadius: 15,
        minHeight: 25,
    },
    id:{
        fontSize: 22,
        fontWeight: "bold",

        width: '20%',
        minWidth: 70,
        marginLeft: 7,
        marginTop: -3,

        color: Colors.WHITE,
    },
    icon:{
        margin: 3,
        width: '18%',
    },
    iconShort:{
        margin: 3,
        width: '80%',
        minWidth: 45
    },
    iconShortContainer:{
        flexDirection: "row",
        width: "18%",
        left: -13,
    },
    runnersAmount:{
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.WHITE,
        marginTop: 2,
        marginLeft: -4,
        width: '20%',
        minWidth: 10
    },
    title:{
        marginVertical: 1,
        color: Colors.WHITE,
        fontSize: 17,
        fontWeight: 'bold',
    },
    runners:{
        marginVertical: 3,
        marginLeft: 7,
        color: Colors.WHITE,
        fontSize: 15,
        width: '75%',
    },
    upContainer:{
        flexDirection: 'row',
    },
    downContainer:{
        height: "50%",
        flexDirection: "row",
    }
})