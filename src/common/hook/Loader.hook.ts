import {DataContainers, NetworkContainer} from "../../Provider.component";

export function useRefreshAllDataContainers() {
    const networkContainer = NetworkContainer.useContainer();
    const dataContainers = DataContainers.map(containerRef => containerRef.useContainer());

    return async () => {
        if (networkContainer.isInternetReachable) {
            return Promise.all(dataContainers.map(container => container.refresh()))
        }
        return Promise.reject("Une erreur est survenue...");
    }
}
