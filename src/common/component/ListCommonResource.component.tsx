import React, {useMemo, useState} from "react";
import {FlatList} from "react-native";
import {DataContainerInterface} from "../container/DataContainer.interface";
import {CommonResource} from "../resources/Common.resource";
import {Container} from "unstated-next";
import {useRefreshAllDataContainers} from "../hook/Loader.hook";
import {NetworkContainer} from "../../Provider.component";

export interface ListCommonResourceComponent<T extends CommonResource> {
    dataContainer: Container<DataContainerInterface<T>>
    renderItem: (item: T) => JSX.Element
    filter?: (item: T) => boolean,
    sort?: (itemA: T, itemB: T) => number
}

export function ListCommonResourceComponent<T extends CommonResource>(props: ListCommonResourceComponent<T>) {
    const container = props.dataContainer.useContainer();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const refreshAllDataContainers = useRefreshAllDataContainers();
    const {isInternetReachable} = NetworkContainer.useContainer();

    const refreshData = async () => {
        try {
            setIsLoading(true)
            await refreshAllDataContainers()
        } catch (e) {
        } finally {
            setIsLoading(false)
        }
    }

    const renderItem = ({item}: { item: T }) => {
        return props.renderItem(item)
    }

    const items = useMemo(() => {
        let data = container.items.toArray();

        if (props.filter) {
            data = data.filter(props.filter)
        }

        if (props.sort) {
            data = data.sort(props.sort)
        }

        return data;
    }, [container.items])

    return (
        <FlatList
            keyExtractor={((item: CommonResource) => String(item.id))}
            data={items}
            renderItem={renderItem}
            refreshing={isLoading}
            onRefresh={isInternetReachable ? refreshData : null}
            style={{
                height: "100%"
            }}
        />
    )
}
