import React, {PropsWithChildren, useEffect, useState} from "react";
import {AuthContainer, CacheStatusContainer, DataContainers, NetworkContainer} from "./Provider.component";

export function LoaderComponent(props: PropsWithChildren<any>) {
    const networkContainer = NetworkContainer.useContainer();
    const {hasCacheBeenRead, setHasCacheBeenRead} = CacheStatusContainer.useContainer();
    const authContainer = AuthContainer.useContainer();

    const dataContainers = DataContainers.map(container => container.useContainer());

    const [userHasBeenAuthenticated, setUserHasBeenAuthenticated] = useState(false)

    useEffect(() => {
        return networkContainer.subscribeToNetworkChange();
    }, [])

    
    useEffect(() => {
        authContainer.refreshAuthenticated()
    }, [/* I do not understand why you would do that, it just unlogs people when they disconnect from internet ??? networkContainer.isInternetReachable  */])

    useEffect(() => {
        if (authContainer.authenticatedUser && !hasCacheBeenRead) {
            Promise.all(dataContainers.map(container => container.readFromCache())).then(() => {
                setHasCacheBeenRead(true)
                setUserHasBeenAuthenticated(true)
            })
        }

        // if there is no authenticated user but one has been authenticated at some point it mean we have been disconnected
        // so the cache has been rested
        if (!authContainer.authenticatedUser && userHasBeenAuthenticated) {
            setHasCacheBeenRead(false)
            setUserHasBeenAuthenticated(false)
            dataContainers.forEach(container => container.empty())
        }
    }, [authContainer.authenticatedUser, hasCacheBeenRead])

    useEffect(() => {
        if (hasCacheBeenRead && authContainer.authenticatedUser && networkContainer.isInternetReachable) {
            dataContainers.forEach(container => {
                if (container.items.size == 0) {
                    container.refresh()
                }
            })
        }
    }, [hasCacheBeenRead, authContainer.authenticatedUser, networkContainer.isInternetReachable, ...dataContainers.map(container => container.items)])

    return props.children;
}
