import {DataContainers, NetworkContainer} from "../../Provider.component";

export function useRefreshAllDataContainers() {
    const networkContainer = NetworkContainer.useContainer();
    const dataContainers = DataContainers.map(containerRef => containerRef.useContainer());

    return () => {
        if (networkContainer.isInternetReachable) {
            return Promise.all(dataContainers.map(container => container.refresh()))
        }

        return Promise.reject();
    }
}
