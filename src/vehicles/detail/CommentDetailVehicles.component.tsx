import {VehicleResource} from "../../common/resources/Vehicle.resource";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {ListItem} from "react-native-elements";
import {DATE_FORMAT} from "../../common/utils/Date.utils";
import {CardComponent} from "../../common/component/Card.component";
import {Colors} from "../../common/utils/Color.utils";

export interface commentDetailVehiclesComponentProps {
    currentVehicle: VehicleResource
}

export function CommentDetailVehiclesComponent({currentVehicle}: commentDetailVehiclesComponentProps) {
    return (
        <ListItem.Content style={styles.component}>
            <ListItem.Content>
                {currentVehicle.comments.size > 0 ? (
                    currentVehicle.comments
                        .sortBy(comment => comment.created_at)
                        .reverse()
                        .map(comment =>
                            (
                                <View key={comment.id} style={{width: "100%"}}>
                                    <CardComponent title={`${comment.user.firstname} ${comment.user.lastname}`}>
                                        <Text style={styles.dateSubTitle}>{comment.created_at.toFormat(DATE_FORMAT)}</Text>
                                        <Text style={styles.commentText}>{comment.content} </Text>
                                    </CardComponent>
                                </View>
                            )
                        )
                ) : null}
            </ListItem.Content>
        </ListItem.Content>
    )
}

const styles = StyleSheet.create({
    dateSubTitle: {
        color: Colors.GREY,
        fontFamily: 'Montserrat-Regular',
        paddingBottom: 10
    },
    commentText: {
      fontFamily: 'Montserrat-Regular'
    },
    component: {
        alignItems: "stretch",
    }
})
