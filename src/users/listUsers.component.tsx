import React from "react";
import {AuthContainer, RunsContainer, UsersContainer} from "../Provider.component";
import {UserResource} from "../common/resources/User.resource";
import {Button, Icon, ListItem, Avatar} from "react-native-elements";
import {getUserStatus, userStatusColor} from "../common/utils/User.utils";
import {RunStatus} from "../common/resources/Run.resource";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

type UsersStackParamList = { users_list: undefined; profile: undefined };
type UsersNavProp = StackNavigationProp<UsersStackParamList>;
import {Colors} from "../common/utils/Color.utils";
import {callPhoneNumber} from "../common/utils/Phone.utils";
import {SafeAreaView, StyleSheet, Text} from "react-native";
import {ListCommonResourceComponent} from "../common/component/ListCommonResource.component";
import {StatusCircleComponent} from "../common/component/StatusCircle.component";
import Axios from "axios";


export function ListUsersComponent() {
    const navigation = useNavigation<UsersNavProp>();
    const runContainer = RunsContainer.useContainer();
    const {authenticatedUser} = AuthContainer.useContainer();
    const startedRuns = runContainer.items.filter(run => run.status == RunStatus.GONE)

    const buildUserDisplayName = (user: UserResource) => `${user.lastname} ${user.firstname}`

    const renderItem = (item: UserResource) => {
        const isMe = item.id === authenticatedUser?.id;
        const userCurrentRun = startedRuns.find(run => !!run.runners.find(runner => runner.user?.id == item.id));

        let baseURL = Axios.defaults.baseURL;

        let uri = "";

        if(baseURL)
        {
            uri = baseURL.replace('api', 'storage/uploads/') + item.picture.path;
        }

        return (
            <ListItem bottomDivider={true} containerStyle={isMe ? styles.meContainer : undefined}>
                <Avatar rounded size="medium" source={{ uri: uri}} />
                <ListItem.Content>
                    <ListItem.Title style={[styles.columnName, isMe ? styles.meName : undefined]}>
                        {item.firstname} {item.lastname}{isMe ? '  (moi)' : ''}
                    </ListItem.Title>
                </ListItem.Content>

                {isMe ? (
                    <Button
                        icon={<Icon type='font-awesome' name={'cog'} color={'white'}/>}
                        buttonStyle={{backgroundColor: Colors.BLUE}}
                        onPress={() => navigation.navigate('profile')}
                    />
                ) : (
                    <Button
                        icon={<Icon type='font-awesome' name={'phone'} color={'white'}/>}
                        onPress={() => callPhoneNumber(item.phone_number)}
                    />
                )}
            </ListItem>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ListCommonResourceComponent
                sort={(userA: UserResource, userB: UserResource) => {
                    if (userA.id === authenticatedUser?.id) return -1;
                    if (userB.id === authenticatedUser?.id) return 1;
                    return userA.firstname > userB.firstname ? 1 : -1
                }}
                dataContainer={UsersContainer}
                renderItem={renderItem}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    columnName: {
        marginTop: 3,
        fontFamily: 'Montserrat-Medium',
        fontSize: 20
    },
    meContainer: {
        backgroundColor: '#eef4ff',
    },
    meName: {
        color: '#055BA6',
        fontFamily: 'Montserrat-SemiBold',
    },
    columnState: {
        fontFamily: 'Montserrat-Regular',
        marginTop: 5,
    },
    runState: {
        color: '#F24F13'
    },
})

