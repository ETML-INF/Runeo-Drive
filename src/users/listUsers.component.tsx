import React from "react";
import {RunsContainer, UsersContainer} from "../Provider.component";
import {UserResource} from "../common/resources/User.resource";
import {Button, Icon, ListItem, Avatar} from "react-native-elements";
import {getUserStatus, userStatusColor} from "../common/utils/User.utils";
import {RunStatus} from "../common/resources/Run.resource";
import {useNavigation} from "@react-navigation/native";
import {callPhoneNumber} from "../common/utils/Phone.utils";
import {SafeAreaView, StyleSheet, Text} from "react-native";
import {ListCommonResourceComponent} from "../common/component/ListCommonResource.component";
import {StatusCircleComponent} from "../common/component/StatusCircle.component";


export function ListUsersComponent() {
    const navigation = useNavigation();
    const runContainer = RunsContainer.useContainer();
    const startedRuns = runContainer.items.filter(run => run.status == RunStatus.GONE)

    const buildUserDisplayName = (user: UserResource) => `${user.lastname} ${user.firstname}`

    const renderItem = (item: UserResource) => {
        const userCurrentRun = startedRuns.find(run => !!run.runners.find(runner => runner.user?.id == item.id));

        return (
            <ListItem bottomDivider={true}>
                <Avatar rounded size="medium" source={{ uri: 'http://runeo.paleo.ch/storage/profiles/'+item.picture}} />
                <ListItem.Content>
                    <ListItem.Title style={styles.columnName}>
                        {item.firstname} {item.lastname}
                    </ListItem.Title>
                </ListItem.Content>

                <Button
                    icon={
                        <Icon
                            type='font-awesome'
                            name={'phone'}
                            color={'white'}
                        />
                    }
                    onPress={() => callPhoneNumber(item.phone_number)}
                />
            </ListItem>
        )
    }

    return (
        <SafeAreaView>
            <ListCommonResourceComponent
                sort={(userA: UserResource, userB: UserResource) => {
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
    columnState: {
        fontFamily: 'Montserrat-Regular',
        marginTop: 5,
    },
    runState: {
        color: '#F24F13'
    },
})

