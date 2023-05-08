/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-05
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-08 16:25:16
 *   Description: Specific component dedicated to display the schedule. Probably will use a artificially created scroll.
 */

import {SafeAreaView, StyleSheet, View, Text, NativeSyntheticEvent, NativeScrollEvent} from "react-native";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import { Colors } from "../common/utils/Color.utils";
import moment, { Moment } from "moment";
import { ScrollView } from "react-native-gesture-handler";
import { List, set } from "immutable";

export interface ScheduleComponentProps {
    startDate : Date,
    endDate : Date,
    setCurrentDay : Dispatch<SetStateAction<Date>>
}

interface HourProps {
    hour: string,
}

//amount of pixels for 30 minutes
const scale = 25;

//Shall always be at 00:00
let startDate : Moment;

let setCurrentDay : Dispatch<SetStateAction<Date>>

export function ScheduleComponent(props: ScheduleComponentProps) {
    // the +1 is there because we want to display the whole days and not just the difference between them.
    let numberOfDays = moment(props.endDate).diff(moment(props.startDate), 'days') + 1 ;

    startDate = moment(props.startDate).startOf("day");

    setCurrentDay = props.setCurrentDay;
    
    //const [toLoad, setToLoad] = useState(Array());
    



    let hours = Array();
    for(let i = 0; i < numberOfDays; i++){
        for(let h= 0; h < 24; h++)
        {
            hours.push(<Hour key={i.toString() + h.toString()} hour={(h>=10?'':'0') + h + ":00"}></Hour>);
        }
    }

    return (
        <ScrollView onScroll={onScroll}>
            {hours}
            <View  style={[styles.currentTimeLine, {top: parseDateToScroll(moment().startOf('minute')), left: "15%"}]}></View>
        </ScrollView>
    )
}

function onScroll(e : NativeSyntheticEvent<NativeScrollEvent>) {
    let currentDate = parseScrollToDate(e.nativeEvent.contentOffset.y);

    if(currentDate.hour() >= 22)
    {
        setCurrentDay(currentDate.startOf('day').add(1, 'day').toDate());
    }
    else
    {
        setCurrentDay(currentDate.startOf('day').toDate());
    }
}

function parseScrollToDate(y: number) : Moment{
    //the - scale is due to the fact that pixel 0 is set at 23:30 of the day before because of aesthetics.
    let hoursAmount = (y - scale) / (2 * scale);

    return startDate.add(hoursAmount, 'hours');
}

function parseDateToScroll(date: Moment) : number{
    let hoursAmount = date.diff(startDate, 'hours', true);

    let scroll = (hoursAmount * 2 * scale) + scale;

    //alert(startDate.toString())
    
    return scroll;
}

function Hour(props: HourProps){
    return(
        <View style={[styles.hourContainer, {height: 2 * scale}]}>
            <Text style={styles.hourText}>{props.hour}</Text>
            <View style={styles.hourLinesContainer}>
                <View style={styles.hourLine}></View>
                <View style={styles.halfHourLine}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    hoursContainer: {
        display: "flex",
    },
    hourContainer:{
        flexDirection: "row",
        width: "100%", 
    },
    hourLinesContainer:{
        height: "100%",
        width: "85%",
    },
    hourText:{
        fontSize: 14,
        width: "15%",
        height: "100%",
        
        textAlign: "center",
        textAlignVertical: "center",

        borderRightWidth: 1,
        borderRightColor: '#D9D9D9'
    },
    hourLine:{
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
        height: "50%",
        width: "100%",
    },
    halfHourLine:{
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
        height: "50%",
        width: "100%",
    },
    currentTimeLine:{
        width: "85%",
        height: 2,
        position: "absolute",
        borderColor: "#CC00FF",
        borderTopWidth: 2,        
    },
})