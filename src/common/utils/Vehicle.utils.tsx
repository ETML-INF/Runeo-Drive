import {Icon} from "react-native-elements";
import React from "react"
import {Colors} from "./Color.utils";

const gasLevelToTextMapping: Record<string, string> = {
    "-1": "Inconnu",
    "0": "Vide",
    "1": "Moyen",
    "2": "Plein",
    "3": "Plein",
    "4": "Plein",
}

export function getGasLevelText(gasLevel: number): string {
    return gasLevelToTextMapping[String(gasLevel)] || ""
}

const gasLevelToIconRecord: Record<number, string> = {
    0: "gas-pump",
    1: "meh",
    2: "smile",
    3: "smile",
    4: "smile"
}

const gasLevelToColorRecord: Record<number, string> = {
    0: Colors.STATUS_PROBLEM,
    1: Colors.STATUS_NEED,
    2: Colors.GREEN,
    3: Colors.GREEN,
    4: Colors.GREEN
}

export function gasLevelToIcon(gasLevel: number, iconSize?: number, color?: string) {
    const iconName = gasLevelToIconRecord[gasLevel] || "question";
    return (<Icon type='font-awesome-5' name={iconName} size={iconSize} color={(color!=undefined)?color:Colors.BLUE}/>)
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
