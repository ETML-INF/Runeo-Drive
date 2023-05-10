/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-05
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-10 15:45:16
 *   Description: Specific component dedicated to display the schedule. Uses a scale property that is then used to display hour
 *      (ScheduleHour) and to convert Moments Objects (equivalent to Date) to scroll.
 */

import {SafeAreaView, StyleSheet, View, Text, NativeSyntheticEvent, NativeScrollEvent, Animated} from "react-native";
import React, {Dispatch, SetStateAction, useEffect, useState, useRef} from "react";
import { Colors } from "../common/utils/Color.utils";
import moment, { Moment } from "moment";
import { ScrollView } from "react-native-gesture-handler";
import { ScheduleHour } from "./ScheduleHour.component";
import { ScheduleScheduleComponent } from "./ScheduleSchedule.component";
import { ScheduleResource } from "../common/resources/Schedule.resourse";
import { RunResource } from "../common/resources/Run.resource";
import { List } from "immutable";

export interface ScheduleComponentProps {
    startDate : Date,
    endDate : Date,
    setCurrentDay : Dispatch<SetStateAction<Date>>,
    schedules: List<ScheduleResource>,
    runs: List<RunResource>,
    loading: boolean,
}

//Shall always be at 00:00
//let startDate : Moment;

export class ScheduleComponent extends React.Component {
    
    // class variables
    hours = Array();
    //amount of pixels for 30 minutes
    scale = 25;
    scrollViewRef = null;
    
    constructor(props: ScheduleComponentProps){
        super(props);

        // the +1 is there because we want to display the whole days and not just the difference between them.
        let numberOfDays = moment(props.endDate).diff(moment(props.startDate), 'days') + 1 ;

        this.startDate = moment(props.startDate).startOf("day");

        /*this.loadinAnim = useRef(new Animated.Value(0)).current;

        this.anim = Animated.loop(
            Animated.timing(this.loadinAnim,{
            toValue: 1,
            duration: 750,
            useNativeDriver: true
            })
        )*/

        for(let i = 0; i < numberOfDays; i++){
            for(let h= 0; h < 24; h++)
            {
                this.hours.push(<ScheduleHour key={i.toString() + h.toString()} hour={(h>=10?'':'0') + h + ":00"} scale={this.scale}></ScheduleHour>);
            }
        }


    }
    
    
    parseScrollToDate(y: number) : Moment{
        //the - scale is due to the fact that pixel 0 is set at 23:30 of the day before because of aesthetics.
        let hoursAmount = (y - this.scale) / (2 * this.scale);

        return this.startDate.clone().add(hoursAmount, 'hours');
    }

    onScroll = (e : NativeSyntheticEvent<NativeScrollEvent>) => {
        let currentDate = this.parseScrollToDate(e.nativeEvent.contentOffset.y);
    
        if(currentDate.hour() >= 22)
        {
            this.props.setCurrentDay(currentDate.startOf('day').add(1, 'day').toDate());
        }
        else
        {
            this.props.setCurrentDay(currentDate.startOf('day').toDate());
        }
    }
    
    parseDateToScroll(date: Moment) : number{
        let hoursAmount = date.diff(this.startDate, 'hours', true);
    
        let scroll = (hoursAmount * 2 * this.scale) + this.scale;
    
        //alert(startDate.toString())
        
        return scroll;
    }
    
    render(){
        let _schedules;
        /* if(this.props.schedules.count() > 0)
        { */
            _schedules = this.props.schedules.toArray().map(schedule =>
                <ScheduleScheduleComponent
                    key={schedule.id}
                    y={this.parseDateToScroll(moment(schedule.start_time))}
                    height={moment(schedule.end_time).diff(moment(schedule.start_time), "hours") * 2 * this.scale}
                    text={"Groupe A"}
                ></ScheduleScheduleComponent>);
        /* } */
        let loader = <Text style={[styles.loader, {opacity: 1/*this.loadinAnim*/}]}>Chargement...</Text>

        return (
            <View style={styles.container}>
                <ScrollView ref= {scrollView => this.scrollViewRef = scrollView} onScroll={this.onScroll} style={styles.scrollView}>
                    {this.hours}
                    <View  style={[styles.currentTimeLine, {top: this.parseDateToScroll(moment().startOf('minute')), left: "15%"}]}></View>
                    {!this.props.loading && _schedules}
                </ScrollView>
                {this.props.loading && loader}
            </View>
        )
    }

    componentDidMount(): void {
        this.scrollViewRef.scrollTo({y: (this.parseDateToScroll(moment().startOf('minute')) - 10  * this.scale), animated: false})

        //this.anim.start();
    }
}

const styles = StyleSheet.create({
    container: {
        
        height: "92%",
    },
    scrollView:{
        display: "flex",
        width: "100%",
        height: "100%", 
    }, 
    currentTimeLine:{
        width: "85%",
        height: 2,
        position: "absolute",
        borderColor: "#CC00FF",
        borderTopWidth: 2,        
    },
    loader:{
        position: "absolute",
        top: 10,
        width: "100%",
        textAlign: "center",
    }
})
