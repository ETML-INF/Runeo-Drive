import {Linking} from "react-native";

export function callPhoneNumber(phoneNumber: string) {
    Linking.openURL(`tel:${phoneNumber}`)
}
