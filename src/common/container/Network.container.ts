import {useState} from "react";
import NetInfo from "@react-native-community/netinfo";

export interface NetworkContainer {
    isInternetReachable: boolean,
    subscribeToNetworkChange: () => () => void
}

export function useNetworkContainer(): NetworkContainer {
    const [isInternetReachable, setIsInternetReachable] = useState<boolean>(false);

    const subscribeToNetworkChange = (): () => void => {
        return NetInfo.addEventListener(state => {
            setIsInternetReachable(state.isInternetReachable || false)
        })
    }

    return {
        isInternetReachable,
        subscribeToNetworkChange
    }
}
