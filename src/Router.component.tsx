import React, { useEffect, useRef, useState } from "react";
import { AuthContainer, NetworkContainer } from "./Provider.component";
import { AuthComponent } from "./auth/Auth.component";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UsersNavigatorComponent } from "./users/UsersNavigator.component";
import { FontAwesome } from "@expo/vector-icons";
import { RunsComponent } from "./runs/Runs.component";
import { VehiclesComponent } from "./vehicles/Vehicles.components";
import { ScheduleNavigatorComponent } from "./schedule/ScheduleNavigator.component";
import { Colors } from "./common/utils/Color.utils";
import { ListFastDialsComponent } from "./fastDials/FastDials.component";
import { Animated, Easing, Platform, Text, View, StyleSheet } from "react-native";
import { ButtonComponent } from "./common/component/ButtonComponent";
import { Icon } from "react-native-elements";
import * as Notifications from "expo-notifications";
import { showToastLong, showToast, toastType } from "./notifications/ToastNotification";
import { useRefreshAllDataContainers } from "./common/hook/Loader.hook";

const Tab = createBottomTabNavigator();

export const RUNS_TAB = "Runs"

const ACTIVE_TAB_COLOR = Colors.BLUE;
const INACTIVE_TAB_COLOR = Colors.BLACK;

function SpinningRefreshIcon({ spinning, onPress }: { spinning: boolean; onPress: () => void }) {
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!spinning) {
            rotation.setValue(0);
            return;
        }
        const loop = Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 800,
                easing: Easing.linear,
                useNativeDriver: Platform.OS !== 'web',
            })
        );
        loop.start();
        return () => loop.stop();
    }, [spinning]);

    const rotate = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

    return (
        <Animated.View style={[styles.headerRefreshIcon, { transform: [{ rotate }] }]}>
            <Icon
                type="font-awesome"
                name="refresh"
                color={ACTIVE_TAB_COLOR}
                disabled={spinning}
                onPress={onPress}
            />
        </Animated.View>
    );
}

export function RouterComponent() {
    const authContainer = AuthContainer.useContainer();
    const { isInternetReachable } = NetworkContainer.useContainer();
    const refreshAllDataContainers = useRefreshAllDataContainers();
    const [isRefreshingRuns, setIsRefreshingRuns] = useState(false);
    const tabBarIconGen = (name: React.ComponentProps<typeof FontAwesome>['name']) => {
        return ({ focused }: { focused: boolean }) => (<FontAwesome
            name={name}
            size={24}
            color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
        />)
    };

    const onRefreshRunsPress = async () => {
        if (isRefreshingRuns || !isInternetReachable) return;
        setIsRefreshingRuns(true);
        try {
            await refreshAllDataContainers();
        } catch (error) {
            showToast(String(error), toastType.failed);
        } finally {
            setIsRefreshingRuns(false);
        }
    }

    // ugly hotfix to solve race condition on some devices
    useEffect( () => {
        if(!authContainer.authenticatedUser) {
            setTimeout(refreshAuth, 1000)
        }
    } )

    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener((notification) => {
            const { title, body } = notification.request.content;
            const text = [title, body].filter(Boolean).join("\n");
            if (text) showToastLong(text, toastType.neutral);
        });
        return () => subscription.remove();
    }, []);

    function refreshAuth() {
        authContainer.refreshAuthenticated().catch((error) => { console.error(error); });
    }

    const onLogoutPress = () => {
        authContainer.logout().catch((error) => console.log(error))
    }

    if (authContainer.authenticatedUser) {
        switch (authContainer.authenticatedUser?.status.slug) {
            case "hired":
            case "taken":
            case "free":
            case "not-present":
                return (
                    <Tab.Navigator initialRouteName={RUNS_TAB} screenOptions={{
                        tabBarActiveTintColor: ACTIVE_TAB_COLOR,
                        tabBarInactiveTintColor: INACTIVE_TAB_COLOR,
                    }}>
                        <Tab.Screen
                            name={RUNS_TAB}
                            options={{
                                tabBarIcon: tabBarIconGen('list'),
                                headerRight: () => (
                                    <SpinningRefreshIcon spinning={isRefreshingRuns} onPress={onRefreshRunsPress} />
                                ),
                            }}
                            component={RunsComponent}
                        />
                        <Tab.Screen
                            name="Chauffeurs"
                            options={{
                                tabBarIcon: tabBarIconGen('drivers-license-o'),
                            }}
                            component={UsersNavigatorComponent}
                        />
                        <Tab.Screen
                            name="Véhicules"
                            options={{
                                tabBarIcon: tabBarIconGen('car'),
                            }}
                            component={VehiclesComponent}
                        />
                        <Tab.Screen
                            name="Rapide"
                            options={{
                                tabBarIcon: tabBarIconGen('phone'),
                            }}
                            component={ListFastDialsComponent}
                        />
                        <Tab.Screen
                            name="Horaire"
                            options={{
                                tabBarIcon: tabBarIconGen('calendar'),
                            }}
                            component={ScheduleNavigatorComponent}
                        />
                    </Tab.Navigator>
                )
            default:
                return (
                    <View style={styles.error}>
                        <Text style={styles.error_message}>Problème!</Text>
                        <Text style={styles.error_message}>Ton compte n'est pas encore activé</Text>
                        <Text style={styles.discreet}>({authContainer.authenticatedUser?.status.slug})</Text>
                        <ButtonComponent title="Retour" onPress={onLogoutPress}/>
                    </View>
                )
        }
    }
    return (
        <AuthComponent />
    )
}

const styles = StyleSheet.create({
    headerRefreshIcon: {
        marginRight: 16,
    },
    error: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding:30
    },
    error_message: {
        fontSize: 35,
        textAlign: "center"
    },
    discreet: {
        fontSize: 12,
        color: "#dddddd",
        textAlign: "center"
    }
});