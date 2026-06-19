import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { AuthContainer } from "../../Provider.component";
import { ButtonComponent } from "../../common/component/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../common/utils/Color.utils";
import Axios from "axios";

interface PushNotificationRecord {
    id: string;
    title: string;
    body: string;
    run_id: number | null;
    sent_at: string;
}

export function ProfileComponent() {
    const { authenticatedUser, logout } = AuthContainer.useContainer();
    const navigation = useNavigation();

    const [notifications, setNotifications] = useState<PushNotificationRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchNotifications = useCallback(async () => {
        try {
            const res = await Axios.get<PushNotificationRecord[]>("/me/notifications");
            setNotifications(res.data);
        } catch {
            // pas de notifications ou pas connecté, on ignore silencieusement
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchNotifications();
    }, [fetchNotifications]);

    if (!authenticatedUser) return null;

    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleString("fr-CH", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListHeaderComponent={
                    <>
                        <View style={styles.card}>
                            <Text style={styles.name}>{authenticatedUser.firstname} {authenticatedUser.lastname}</Text>
                            <Text style={styles.field}>{authenticatedUser.email}</Text>
                            <Text style={styles.field}>{authenticatedUser.phone_number}</Text>
                            <Text style={styles.role}>{authenticatedUser.role}</Text>
                        </View>
                        <Text style={styles.sectionTitle}>Notifications reçues</Text>
                        {loading && <ActivityIndicator color={Colors.BLUE} style={{ marginTop: 16 }} />}
                        {!loading && notifications.length === 0 && (
                            <Text style={styles.empty}>Aucune notification pour l'instant</Text>
                        )}
                    </>
                }
                renderItem={({ item }) => (
                    <View style={styles.notifCard}>
                        <View style={styles.notifHeader}>
                            <Text style={styles.notifTitle}>{item.title}</Text>
                            <Text style={styles.notifDate}>{formatDate(item.sent_at)}</Text>
                        </View>
                        <Text style={styles.notifBody}>{item.body}</Text>
                        {item.run_id && (
                            <Text style={styles.notifRun}>Run #{item.run_id}</Text>
                        )}
                    </View>
                )}
                ListFooterComponent={
                    <View style={styles.footer}>
                        <ButtonComponent title="Se déconnecter" onPress={() => logout().catch(console.error)} />
                    </View>
                }
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        margin: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#eef4ff",
        gap: 8,
    },
    name: {
        fontSize: 22,
        fontFamily: "Montserrat-SemiBold",
        color: Colors.BLUE,
        marginBottom: 6,
    },
    field: {
        fontSize: 15,
        fontFamily: "Montserrat-Regular",
        color: "#444",
    },
    role: {
        fontSize: 13,
        fontFamily: "Montserrat-Regular",
        color: "#999",
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: "Montserrat-SemiBold",
        color: Colors.BLUE,
        marginHorizontal: 20,
        marginBottom: 8,
    },
    empty: {
        fontSize: 14,
        fontFamily: "Montserrat-Regular",
        color: "#999",
        textAlign: "center",
        marginTop: 16,
    },
    notifCard: {
        marginHorizontal: 20,
        marginBottom: 10,
        padding: 14,
        borderRadius: 8,
        backgroundColor: "#f5f8ff",
        borderLeftWidth: 3,
        borderLeftColor: Colors.BLUE,
    },
    notifHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 4,
    },
    notifTitle: {
        fontSize: 14,
        fontFamily: "Montserrat-SemiBold",
        color: "#333",
        flex: 1,
        marginRight: 8,
    },
    notifDate: {
        fontSize: 11,
        fontFamily: "Montserrat-Regular",
        color: "#999",
    },
    notifBody: {
        fontSize: 13,
        fontFamily: "Montserrat-Regular",
        color: "#555",
    },
    notifRun: {
        fontSize: 11,
        fontFamily: "Montserrat-Regular",
        color: Colors.BLUE,
        marginTop: 4,
    },
    footer: {
        margin: 20,
    },
});
