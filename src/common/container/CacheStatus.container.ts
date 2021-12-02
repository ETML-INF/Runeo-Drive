import {useState} from "react";

export interface CacheStatusContainer {
    hasCacheBeenRead: boolean,
    setHasCacheBeenRead: (value: boolean) => void
}

export function useCacheStatusContainer(): CacheStatusContainer {
    const [hasCacheBeenRead, setHasCacheBeenRead] = useState(false)

    return {
        hasCacheBeenRead,
        setHasCacheBeenRead
    }
}
