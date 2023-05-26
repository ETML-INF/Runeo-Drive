import React from "react"
import {UserStatus} from "../resources/User.resource";

const userStatusMapping: Record<string, string> = {
    [UserStatus.INACTIVE]: 'Inactif',
    [UserStatus.REQUESTED]: 'Sollicité',
    [UserStatus.CONFIRMED]: 'Confirmé',
    [UserStatus.VALIDATED]: 'Validé',
    [UserStatus.HIRED]: 'Engagé',
    [UserStatus.FREE]: 'Disponible',
    [UserStatus.NOT_PRESENT]: 'Pas présent',
    [UserStatus.RETIRED]: 'Retraité',
    [UserStatus.TAKEN]: 'En run'
}

export function getUserStatus(userStatus: string) {
    return userStatusMapping[userStatus] || "aucun status"
}

const userStatusColorRecord: Record<string, string> = {
    [UserStatus.INACTIVE]: "#fff",
    [UserStatus.REQUESTED]: "#ffffcc",
    [UserStatus.CONFIRMED]: "#ccffcc",
    [UserStatus.VALIDATED]: "#00ff00",
    [UserStatus.HIRED]: "#009900",
    [UserStatus.FREE]: "#3399ff",
    [UserStatus.NOT_PRESENT]: "#ffe6cc",
    [UserStatus.RETIRED]: "#000000",
    [UserStatus.TAKEN]: "#ff66ff"

}

export function userStatusColor(userStatus: string) {
    return userStatusColorRecord[userStatus] || "white"
}

const userRoleMapping: Record<string, string> = {
    "admin": "Runners Administrator",
    "coordinator": "Runners coordinator",
    "runner": "Runner",
    "production": "Production",
    "manager": "Artist manager"
}

export function getUserRole(userRole: string) {
    return userRoleMapping[userRole] || ""
}

