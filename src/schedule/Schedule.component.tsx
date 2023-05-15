/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-05
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-15 14:07:16
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
import { ScheduleRunComponent } from "./ScheduleRun.component";
import { DateTime } from "luxon";

export interface ScheduleComponentProps {
    setCurrentDay : Dispatch<SetStateAction<Date>>,
    schedules: List<ScheduleResource>,
    runs: List<RunResource>,
    loading: boolean,
    onRunPress: (run: RunResource) => void,
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

        let data = Array();
        let numberOfDays = 8;
        data = this.props.schedules.toArray();

        //si l'utilisateur n'a pas d'horaires, on affiche un horaire englobant quelques jours avant et après et on l'avertit.
        if(data.length > 0)
        {
            data = data.sort((a:ScheduleResource, b:ScheduleResource) => {return a.start_time.valueOf() - b.start_time.valueOf()})

            this.startDate = moment(data[0].start_time).startOf("day");

            // the +1 is there because we want to display the whole days and not just the difference between them.
            numberOfDays = moment(data[data.length-1].end_time).startOf("day").diff(moment(this.startDate), 'days') + 1 ;
        }
        else
        {
            this.startDate = moment().subtract(4,"days");
            console.log("horaires non récupérés, donc dates de l'horaire estimées à 4 jours avant et après aujourd'hui.")
        }

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
        let _runs;
        _schedules = this.props.schedules.toArray().map((schedule: ScheduleResource)=>
            <ScheduleScheduleComponent
                key={schedule.id}
                y={this.parseDateToScroll(moment(schedule.start_time))}
                height={moment(schedule.end_time).diff(moment(schedule.start_time), "hours") * 2 * this.scale}
                text={"Groupe " + schedule.group.name}
                color={schedule.group.color}
            ></ScheduleScheduleComponent>);

        _runs = this.props.runs.toArray().map((run: RunResource) => {
            //run.start_at and run.end_at are the recorded values of an already finished run, the other are the planned ones. 
            let start = run.start_at.isValid ? run.start_at : run.begin_at;
            let end = run.end_at.isValid ? run.end_at : run.finished_at;
          
            let y = this.parseDateToScroll(moment(start.toISO()));

            let height = Math.round(moment(end.toISO()).diff(moment(start.toISO()), "hours", true) * 2 * this.scale);
            
            let error="";

            if (typeof height != "number" || height < 0)
            {
                error = "La durée du run #" + run.id + "  n'a pas pu être calculée. Il est donc affiché comme durant une heure et demie par défaut.";
                height = 3 * this.scale;
            }


            if(typeof y != "number" || Number.isNaN(y))
            {
                error = "La date de départ du run #" + run.id + "  n'a pas pu être trouvée. Il a été placé en haut de votre calendrier.";
                y = 50;
            }
                


            return(
                <ScheduleRunComponent
                key={run.id}
                y={y}
                height={height}
                run={run}
                onRunPress={this.props.onRunPress}
                ></ScheduleRunComponent>
            )
        })
        let loader = <Text style={[styles.loader, {opacity: 1/*this.loadinAnim*/}]}>Chargement...</Text>

        return (
            <View style={styles.container}>
                <ScrollView ref= {scrollView => this.scrollViewRef = scrollView} onScroll={this.onScroll} style={styles.scrollView}>
                    {this.hours}
                    <View  style={[styles.currentTimeLine, {top: this.parseDateToScroll(moment().startOf('minute')), left: "15%"}]}></View>
                    {_schedules}
                    {_runs}
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
        
        height: "95%",
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
