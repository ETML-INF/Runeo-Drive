import React from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {AuthContainer} from "../../Provider.component";
import {ButtonComponent} from "../../common/component/ButtonComponent";
import {useNavigation} from "@react-navigation/native";
import {Colors} from "../../common/utils/Color.utils";

export function ProfileComponent() {
    const {authenticatedUser, logout} = AuthContainer.useContainer();
    const navigation = useNavigation();

    if (!authenticatedUser) return null;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.name}>{authenticatedUser.firstname} {authenticatedUser.lastname}</Text>
                <Text style={styles.field}>{authenticatedUser.email}</Text>
                <Text style={styles.field}>{authenticatedUser.phone_number}</Text>
                <Text style={styles.role}>{authenticatedUser.role}</Text>
            </View>
            <View style={styles.footer}>
                <ButtonComponent title="Se déconnecter" onPress={() => logout().catch(console.error)}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    card: {
        margin: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#eef4ff',
        gap: 8,
    },
    name: {
        fontSize: 22,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.BLUE,
        marginBottom: 6,
    },
    field: {
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        color: '#444',
    },
    role: {
        fontSize: 13,
        fontFamily: 'Montserrat-Regular',
        color: '#999',
        marginTop: 4,
    },
    footer: {
        margin: 20,
    },
});
