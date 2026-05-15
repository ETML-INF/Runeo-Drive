
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
