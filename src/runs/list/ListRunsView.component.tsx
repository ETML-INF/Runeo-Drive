import React, {Component} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {CommonResource} from "../../common/resources/Common.resource";
import {Button} from "react-native-elements";
import {Map} from "immutable";
import {RunResource} from "../../common/resources/Run.resource";
import {ListRunsItemComponent} from "./ListRunsItem.component";
import {ListRunsFilterEnum} from "./ListRunsFilter.enum";
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
    offsetAnim: Animated.Value,
    clampedScroll: Animated.AnimatedDiffClamp
}

export class ListRunsViewComponent<T extends CommonResource> extends Component<ListRunsViewComponentProps<T>, ListRunsViewComponentState> {
    _clampedScrollValue = 0;
    _offsetValue = 0;
    _scrollValue = 0;
    _scrollEndTimer: NodeJS.Timeout | null = null;

    constructor(props: ListRunsViewComponentProps<T>) {
        super(props);

        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        this.state = {
            scrollAnim,
            offsetAnim,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                    }),
                    offsetAnim,
                ),
                0,
                NAVBAR_HEIGHT,
            ),
        };
    }

    componentDidMount() {
        this.state.scrollAnim.addListener(({value}) => {
            const diff = value - this._scrollValue;
            this._scrollValue = value;
            this._clampedScrollValue = Math.min(
                Math.max(this._clampedScrollValue + diff, 0),
                NAVBAR_HEIGHT,
            );
        });
        this.state.offsetAnim.addListener(({value}) => {
            this._offsetValue = value;
        });
    }

    componentWillUnmount() {
        this.state.scrollAnim.removeAllListeners();
        this.state.offsetAnim.removeAllListeners();
    }

    _onScrollEndDrag = () => {
        //used because after scrollEnd their may be a momentum scroll and depending on
        //the hardware it may take some time to be detected
        this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 100);
    };

    _onMomentumScrollBegin = () => {
        if (this._scrollEndTimer)
            clearTimeout(this._scrollEndTimer);
    };

    _onMomentumScrollEnd = () => {
        const toValue = this._scrollValue > NAVBAR_HEIGHT &&
        this._clampedScrollValue > (NAVBAR_HEIGHT) / 2
            ? this._offsetValue + NAVBAR_HEIGHT
            : this._offsetValue - NAVBAR_HEIGHT;

        Animated.timing(this.state.offsetAnim, {
            toValue,
            duration: 350,
            useNativeDriver: true,
        }).start();
    };


    filterBtn = (name: string, label: string) => {
        const isBtnEnable = this.props.activatedFilter.get(name, false);

        return (
            <View style={styles.filterBtn}>
                <Button
                    buttonStyle={isBtnEnable ? {backgroundColor: Colors.BLUE} : {}}
                    onPress={() => this.props.updateFilterStatus(name)}
                    type={isBtnEnable ? 'solid' : 'outline'}
                    title={label}/>
            </View>
        )
    }

    renderItem = ({item}: { item: RunResource }) => {
        return <ListRunsItemComponent onSelectRun={this.props.onSelectRun} run={item}/>
    }

    render() {
        const navbarTranslate = this.state.clampedScroll.interpolate({
            inputRange: [0, NAVBAR_HEIGHT],
            outputRange: [0, -(NAVBAR_HEIGHT)],
            extrapolate: 'clamp',
        });

        const navbarOpacity = this.state.clampedScroll.interpolate({
            inputRange: [0, NAVBAR_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        const listTranslate = Animated.add(
            navbarTranslate,
            NAVBAR_HEIGHT,
        )

        return (
            <View style={styles.fill}>
                <Animated.View style={[styles.navbar, {
                    opacity: navbarOpacity,
                    transform: [{
                        translateY: navbarTranslate
                    }],
                }]}>
                    {this.filterBtn(ListRunsFilterEnum.MY_RUNS, "MES RUNS")}
                    {this.filterBtn(ListRunsFilterEnum.OPEN, "OUVERT")}
                    {this.filterBtn(ListRunsFilterEnum.RUNNING, "EN COURS")}
                    {this.filterBtn(ListRunsFilterEnum.DONE, "TERMINE")}
                </Animated.View>

                <Animated.FlatList
                    style={{
                        transform: [{
                            translateY: listTranslate
                        }],
                    }}
                    // @ts-ignore
                    data={this.props.data}
                    renderItem={this.renderItem}
                    keyExtractor={((item: CommonResource) => String(item.id))}
                    scrollEventThrottle={1}
                    onMomentumScrollBegin={this._onMomentumScrollBegin}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    onScrollEndDrag={this._onScrollEndDrag}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollAnim}}}],
                        {useNativeDriver: true},
                    )}
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
