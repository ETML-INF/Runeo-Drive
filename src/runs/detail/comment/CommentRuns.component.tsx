import React, {useEffect, useState} from "react";
import {FlatList, Text, StyleSheet, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import {RunsContainer} from "../../../Provider.component";
import {RunDetailParams} from "../../../runs/Runs.component";
import { LogResource } from "../../../common/resources/Log.resource";
import {logTimeStamp} from "../../../common/utils/Date.utils"
import { Card } from "react-native-elements";
import { CardContainerComponent } from "../../../common/component/Card.component";

export function CommentRunsComponent() {
    const runsContainer = RunsContainer.useContainer();

    const route = useRoute();
    const {runId} = route.params as RunDetailParams;
    const [logs, setLogs] = useState<LogResource[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Render a row of logs in the list view
     * @param {LogResource} log
     */
    const renderRow = (log: LogResource) => (
        <CardContainerComponent>
            <View style={styles.header}>
                <Text style={styles.headertext}>{ log.item.action }</Text>
            </View>
            <Text style={styles.logmessage}>{ log.item.description }</Text>
            <View style={styles.header}>
                <Text style={styles.headertext}>{ log.item.user ? log.item.user.name : '?' }</Text>
                <Text style={styles.headertext}>{ logTimeStamp(log.item.created_at) }</Text>
            </View>
        </CardContainerComponent>
    )

    /**
     * Get logs of current run
     */
    useEffect(() => {
        runsContainer.getLogs(runId).then((data) => {
            setLogs(data);
            setIsLoading(false);
        });
    }, [runId]);

    return (
        <View>
        { isLoading ?
            <Text>Loading...</Text>
            : logs.length === 0 ?
            <Text style={styles.empty}>Vide</Text>
            :
            <FlatList data={logs} renderItem={renderRow}/>
        }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headertext: {
        color: "#aaaaaa"
    },
    logmessage: {
        fontSize: 16
    },
    empty: {
        color: "#aaaaaa",
        textAlign: "center",
        marginTop: 20
    }
});
