import React, {PropsWithChildren} from "react";
import {useAuthContainer} from "./common/container/Auth.container";
import {Container, createContainer} from "unstated-next";
import {NavigationContainer} from "@react-navigation/native";
import {useRunsContainer} from "./common/container/Runs.container";
import {useUsersContainer} from "./common/container/Users.container";
import {useNetworkContainer} from "./common/container/Network.container";
import {useFastDialsContainer} from "./common/container/FastDials.container";
import {useVehiclesContainer} from "./common/container/Vehicles.container";
import {useCacheStatusContainer} from "./common/container/CacheStatus.container";
import {List, Stack} from "immutable";
import {DataContainerInterface} from "./common/container/DataContainer.interface";
import {NotificationHandlerComponent} from "./NotificationHandler.component";
import {useNotificationsContainer} from "./common/container/Notification.container";
import {isRootNavigationReady, rootNavigationRef} from "./RootNavigator";

export const NetworkContainer = createContainer(useNetworkContainer)
export const CacheStatusContainer = createContainer(useCacheStatusContainer)
export const AuthContainer = createContainer(useAuthContainer(NetworkContainer));

export const RunsContainer = createContainer(useRunsContainer);
export const FastDialsContainer = createContainer(useFastDialsContainer);
export const UsersContainer = createContainer(useUsersContainer);
export const VehiclesContainer = createContainer(useVehiclesContainer);
export const NotificationsContainer = createContainer(useNotificationsContainer);

export const DataContainers = List([
    RunsContainer,
    FastDialsContainer,
    UsersContainer,
    VehiclesContainer,
    NotificationsContainer
])

function DataContainersProviderComponent(props: PropsWithChildren<any> & { dataContainers: Stack<Container<DataContainerInterface<any>>> }) {
    const firstContainer = props.dataContainers.peek();

    if (firstContainer) {
        return (
            <firstContainer.Provider>
                <DataContainersProviderComponent dataContainers={props.dataContainers.pop()}>
                    {props.children}
                </DataContainersProviderComponent>
            </firstContainer.Provider>
        )
    }

    return props.children;
}

export function ProviderComponent(props: PropsWithChildren<any>) {
    return (
        <NetworkContainer.Provider>
            <CacheStatusContainer.Provider>
                <AuthContainer.Provider>
                    <DataContainersProviderComponent dataContainers={DataContainers.toStack()}>
                        <NotificationHandlerComponent
                            authContainer={AuthContainer}
                            networkContainer={NetworkContainer}
                            notificationsContainer={NotificationsContainer}
                        >
                            <NavigationContainer ref={rootNavigationRef} onReady={() => {
                                // @ts-ignore
                                isRootNavigationReady.current = true
                            }}>
                                {props.children}
                            </NavigationContainer>
                        </NotificationHandlerComponent>
                    </DataContainersProviderComponent>
                </AuthContainer.Provider>
            </CacheStatusContainer.Provider>
        </NetworkContainer.Provider>
    )
}
