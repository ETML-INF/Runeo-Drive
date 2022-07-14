import {Dimensions, SafeAreaView, StyleSheet} from "react-native";
import React from "react";
import {FastDialsContainer} from "../Provider.component"
import {FastDialResource} from "../common/resources/FastDial.resource";
import {Button, Icon, ListItem} from "react-native-elements";
import {callPhoneNumber} from "../common/utils/Phone.utils";
import {ListCommonResourceComponent} from "../common/component/ListCommonResource.component";
import {Colors} from "../common/utils/Color.utils";

export function ListFastDialsComponent() {
    const renderItem = (item: FastDialResource) => (
        <ListItem bottomDivider onPress={() => callPhoneNumber(item.phone_number)}>
            <ListItem.Content>
                <ListItem.Title style={{fontFamily: 'Montserrat-Medium'}}>
                    {item.label}
                </ListItem.Title>
            </ListItem.Content>
            <Button
                buttonStyle={{backgroundColor: Colors.BLUE}}
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

    return (
        <SafeAreaView style={styles.wrapper}>
            <ListCommonResourceComponent
                sort={(fastDialA: FastDialResource, fastDialB: FastDialResource) => {
                    return fastDialA.label > fastDialB.label ? 1 : -1
                }}
                dataContainer={FastDialsContainer}
                renderItem={renderItem}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
    },
    buttonWrapper: {
        width: Dimensions.get('window').width / 2,
        padding: 5
    },
    buttonTitle: {
        marginVertical: 5,
    }
})