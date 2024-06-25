import {Icon} from "react-native-elements";
import {Image, StyleProp} from "react-native";
import React from "react"
import {Colors} from "./Color.utils";

const gasLevelToTextMapping: Record<string, string> = {
    "-1": "Inconnu",
    "0": "Vide",
    "1": "OK",
    "2": "OK",
    "3": "OK",
    "4": "OK",
}

export function getGasLevelText(gasLevel: number): string {
    return gasLevelToTextMapping[String(gasLevel)] || ""
}

export const gasLevelToColorRecord: Record<number, string> = {
    0: Colors.STATUS_PROBLEM,
    1: Colors.STATUS_READY,
    2: Colors.STATUS_READY,
    3: Colors.STATUS_READY,
    4: Colors.STATUS_READY
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
