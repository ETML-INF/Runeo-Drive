/**
 *   Author: Clément Sartoni
 *   Create Time: 2023-05-05
 *   Modified by: Alban Segalen
 *   Modified time: 2026-02-11 16:04:36
 *   Description: Specific component dedicated to display the schedule. Uses a scale property that is then used to display hour
 *      (ScheduleHour) and to convert Moments Objects (equivalent to Date) to scroll.
 */

import {StyleSheet, View, Text, NativeSyntheticEvent, NativeScrollEvent} from "react-native";
import React, {Dispatch, SetStateAction} from "react";
import moment, { Moment } from "moment";
import { ScrollView } from "react-native-gesture-handler";
import { ScheduleHour } from "./ScheduleHour.component";
import { ScheduleScheduleComponent } from "./ScheduleSchedule.component";
import { ScheduleResource } from "../common/resources/Schedule.resourse";
import { RunResource } from "../common/resources/Run.resource";
import { List } from "immutable";
import { ScheduleRunComponent } from "./ScheduleRun.component";

export interface ScheduleComponentProps {
    setCurrentDay : Dispatch<SetStateAction<Date>>,
    schedules: List<ScheduleResource>,
    runs: List<RunResource>,
    loading: boolean,
    onRunPress: (run: RunResource) => void,
}

//TODO: little detail : it would be better to transform this class compoment in a function compoment to maintain coherence.
export class ScheduleComponent extends React.Component<ScheduleComponentProps> {

    // - class variables -
    startDate: Moment = moment();
    //amount of pixels for 30 minutes
    scale = 25;
    scrollViewRef = null;
    
    constructor(props: ScheduleComponentProps){
        super(props);
    }

    computeDateRange() {
        const data = this.props.schedules.toArray()
            .sort((a: ScheduleResource, b: ScheduleResource) => a.start_date.valueOf() - b.start_date.valueOf());

        let startDate: Moment;
        let numberOfDays = 8;

        if (data.length > 0) {
            startDate = moment(data[0].start_date).startOf("day");
            const endDate = data[data.length - 1].end_date;
            numberOfDays = moment(endDate).startOf("day").diff(startDate, 'days') + 1;
        } else {
            startDate = moment().subtract(4, "days").startOf("day");
        }

        const hours = [];
        for (let i = 0; i < numberOfDays; i++) {
            for (let h = 0; h < 24; h++) {
                hours.push(<ScheduleHour key={i.toString() + h.toString()} hour={(h >= 10 ? '' : '0') + h + ":00"} scale={this.scale}></ScheduleHour>);
            }
        }

        this.startDate = startDate;
        return hours;
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
        
        return scroll;
    }
    
    render(){
        const hours = this.computeDateRange();
        let _schedules;
        let _runs;
        _schedules = this.props.schedules.toArray().map((schedule: ScheduleResource)=>
            <ScheduleScheduleComponent
                key={schedule.id}
                y={this.parseDateToScroll(moment(schedule.start_date))}
                height={moment(schedule.end_date).diff(moment(schedule.start_date), "hours") * 2 * this.scale}
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

            //Si le run démarre après la date de fin planifiée ou si il est trop petit car il a démarré trop tard, la hauteur est définie par rapport à la durée planifiée
            if((run.start_at.isValid && run.begin_at.isValid && run.finished_at.isValid && run.start_at.toSeconds > run.finished_at.toSeconds) || height < this.scale)
            {
                height = Math.round(moment(run.finished_at.toISO()).diff(moment(run.begin_at.toISO()), "hours", true) * 2 * this.scale);
            }

            if (typeof height != "number" || height < 0 || Number.isNaN(height))
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
        let loader = <Text style={styles.loader}>Chargement...</Text>

        return (
            <View style={styles.container}>
                <ScrollView ref= {scrollView => this.scrollViewRef = scrollView} onScroll={this.onScroll} scrollEventThrottle={16} style={styles.scrollView}>
                    {hours}                
                    {_schedules}
                    <View  style={[styles.currentTimeLine, {top: this.parseDateToScroll(moment().startOf('minute')), left: "15%"}]}>
                        <View style={styles.currentTimeBall}></View>
                    </View>
                    {_runs}
                </ScrollView>
                {this.props.loading && loader}
            </View>
        )
    }

    componentDidMount(): void {
        //the - 10 * this.scale is there to show the current time at a position of 5 hours from the top.
        this.scrollViewRef.scrollTo({y: (this.parseDateToScroll(moment().startOf('minute')) - 10  * this.scale), animated: false})
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
        borderTopWidth: 3,  
        overflow: "visible",      
    },
    currentTimeBall:{
        height: 10,
        width: 10,
        backgroundColor: "#CC00FF",
        position: "absolute",
        left: -6,
        top: -7,
        zIndex: 10,
        borderRadius: 6
    },
    loader:{
        position: "absolute",
        top: 10,
        width: "100%",
        textAlign: "center",
    }
})
