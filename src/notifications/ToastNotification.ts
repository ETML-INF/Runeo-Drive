import Toast from "react-native-root-toast";

export enum toastType{
    succes = "green",
    failed = "red",
    neutral= "blue"
}
export function showToast(text:string,toastType:toastType) {
    Toast.show(text, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor:toastType,
    });
}
export function showToastLong(text:string,toastType:toastType) {
    Toast.show(text, {
        duration: 7000,
        position: 100,
        shadow: true,
        animation: true,
        hideOnPress: false,
        delay: 0,
        backgroundColor:toastType,
    });
}