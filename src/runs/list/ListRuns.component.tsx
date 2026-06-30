import React, {useMemo, useState} from "react";
import {RunResource, RunStatus} from "../../common/resources/Run.resource";
import {useNavigation} from "@react-navigation/native";
import {SectionList, StyleSheet, Text, View} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {AuthContainer, NetworkContainer, RunsContainer} from "../../Provider.component";
import {useRefreshAllDataContainers} from "../../common/hook/Loader.hook";
import { toastType, showToast } from "../../notifications/ToastNotification";
import { ListRunsItemComponent } from "./ListRunsItem.component";
import {participates} from "../../common/utils/Run.utils"

export function ListRunsComponent() {
    const navigation = useNavigation();
    const {authenticatedUser} = AuthContainer.useContainer();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const runContainer = RunsContainer.useContainer();
    const refreshAllDataContainers = useRefreshAllDataContainers();
    const {isInternetReachable} = NetworkContainer.useContainer();

    const refreshRuns = async () => {
        let timeout = new Promise(function(resolve, reject){
            setTimeout(function() {
                reject('Time out!');
            }, 15000);
        }).catch(()=>{});
        try {
            setIsLoading(true)
            await Promise.race([refreshAllDataContainers(), timeout]);
            setIsLoading(false)
        } catch (e) {
            showToast(e, toastType.failed);
            setIsLoading(false)
        }
    }

    const gotoRun = (run: RunResource) => navigation.navigate("detail", {runId: run.id})

    const byDate = (a: RunResource, b: RunResource) => a.begin_at.diff(b.begin_at).toMillis()

    const sections = useMemo(() => {
        const allRuns = runContainer.items.toArray()

        const myRuns = allRuns
            .filter(r => participates(r, authenticatedUser))
            .sort(byDate)

        const needsDriver = allRuns
            .filter(r => !participates(r, authenticatedUser) && r.status === RunStatus.NEEDS_FILLING)
            .sort(byDate)

        const others = allRuns
            .filter(r => !participates(r, authenticatedUser) && r.status !== RunStatus.NEEDS_FILLING)
            .sort(byDate)

        return [
            {title: "Mes runs", data: myRuns},
            {title: "Besoin de chauffeurs", data: needsDriver},
            {title: "Autres", data: others},
        ].filter(section => section.data.length > 0)
    }, [runContainer.items, authenticatedUser])

    return (
        <SafeAreaView style={styles.fill}>
            <SectionList
                sections={sections}
                keyExtractor={(item: RunResource) => String(item.id)}
                renderItem={({item}) => <ListRunsItemComponent onSelectRun={gotoRun} run={item}/>}
                renderSectionHeader={({section}) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>{section.title}</Text>
                    </View>
                )}
                refreshing={isLoading}
                onRefresh={isInternetReachable ? refreshRuns : null}
                style={styles.fill}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text>Aucun</Text>
                    </View>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fill: {
        height: "100%"
    },
    sectionHeader: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    sectionHeaderText: {
        fontWeight: "700",
        fontSize: 13,
        color: "#555",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50%",
    },
});
