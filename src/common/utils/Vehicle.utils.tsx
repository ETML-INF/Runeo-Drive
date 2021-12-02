import {Icon} from "react-native-elements";
import React from "react"
import {Colors} from "./Color.utils";

const gasLevelToTextMapping: Record<string, string> = {
    "-1": "Inconnu",
    "0": "Vide",
    "1": "25%",
    "2": "50%",
    "3": "75%",
    "4": "100%",
}

export function getGasLevelText(gasLevel: number): string {
    return gasLevelToTextMapping[String(gasLevel)] || ""
}

const gasLevelToIconRecord: Record<number, string> = {
    0: "battery-empty",
    1: "battery-quarter",
    2: "battery-half",
    3: "battery-three-quarters",
    4: "battery-full"
}

export function gasLevelToIcon(gasLevel: number, iconSize?: number) {
    const iconName = gasLevelToIconRecord[gasLevel] || "question";

    return (<Icon type='font-awesome-5' name={iconName} size={iconSize} color={Colors.BLUE}/>)
}

const statusColorRecord: Record<string, string> = {
    "taken": "#ff66ff",
    "free": "#3399ff",
    "provisionnal": "#fff",
    "confirmed": "#ccffcc",
    "returned": "#000",
    "unavailable": "#ffe6cc"
}

export function statusColor(status: string) {
    return statusColorRecord[status] || "white"
}

const statusNameRecord: Record<string, string> = {
    "taken": "En Run",
    "free": "Disponible",
    "provisionnal": "Provisionnel",
    "confirmed": "Confirmé",
    "returned": "Retourné",
    "unavailable": "Indisponible"
}

export function getStatusName(status: string) {
    return statusNameRecord[status] || "white"
}
