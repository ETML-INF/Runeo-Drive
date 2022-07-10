import React, {Component} from 'react';
import {Animated, FlatList, StyleSheet, View} from 'react-native';
import {CommonResource} from "../../common/resources/Common.resource";
import {Button} from "react-native-elements";
import {Map} from "immutable";
import {RunResource} from "../../common/resources/Run.resource";
import {ListRunsItemComponent} from "./ListRunsItem.component";
import {Colors} from "../../common/utils/Color.utils";

// need to be fixed to be use in Animated.interpolate function
const NAVBAR_HEIGHT = 105;

export interface ListRunsViewComponentProps<T extends CommonResource> {
    data: T[],
    onSelectRun: (run: RunResource) => void,
    activatedFilter: Map<string, boolean>
    updateFilterStatus: (key: string) => void,
    refreshing: boolean,
    onRefresh: (() => Promise<void>) | null
}

export interface ListRunsViewComponentState {
    scrollAnim: Animated.Value,
    offsetAnim: Animated.Value
}

export class ListRunsViewComponent<T extends CommonResource> extends Component<ListRunsViewComponentProps<T>, ListRunsViewComponentState> {
    _offsetValue = 0;
    _scrollValue = 0;
    _scrollEndTimer: NodeJS.Timeout | null = null;

    constructor(props: ListRunsViewComponentProps<T>) {
        super(props);

        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        this.state = {
            scrollAnim,
            offsetAnim
        };
    }

    componentDidMount() {
        this.state.scrollAnim.addListener(({value}) => {
            const diff = value - this._scrollValue;
            this._scrollValue = value;
        });
        this.state.offsetAnim.addListener(({value}) => {
            this._offsetValue = value;
        });
    }

    componentWillUnmount() {
        this.state.scrollAnim.removeAllListeners();
        this.state.offsetAnim.removeAllListeners();
    }

    _onMomentumScrollBegin = () => {
        if (this._scrollEndTimer)
            clearTimeout(this._scrollEndTimer);
    };

    renderItem = ({item}: { item: RunResource }) => {
        return <ListRunsItemComponent onSelectRun={this.props.onSelectRun} run={item}/>
    }

    render() {
        return (
            <View style={styles.fill}>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                    keyExtractor={((item: CommonResource) => String(item.id))}
                    refreshing={this.props.refreshing}
                    onRefresh={this.props.onRefresh}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fill: {
        height: "100%"
    },
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: '#dedede',
        borderBottomWidth: 1,
        height: NAVBAR_HEIGHT,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "space-evenly",
    },
    filterBtn: {
        width: "50%",
        padding: 5,
    }
});
