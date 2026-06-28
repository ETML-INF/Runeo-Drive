import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {ListUsersComponent} from "./listUsers.component";
import {ProfileComponent} from "./profile/Profile.component";

const Stack = createStackNavigator();

export function UsersNavigatorComponent() {
    return (
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen name="users_list" component={ListUsersComponent} options={{headerShown: false}}/>
            <Stack.Screen name="profile" component={ProfileComponent} options={{title: "Mon profil"}}/>
        </Stack.Navigator>
    );
}
