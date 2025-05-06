interface HMScroller_Params {
    builderContext?: ComponentBuilderContext;
    scrollDirection?: ScrollDirection;
    hmContext?: HMContext;
    node?: HMNode;
    scroller?;
    scrollState?: ScrollState;
    recentDimOffsetDelta?: number;
    stopRefresh?: undefined | ((message: string) => void);
    stopLoadMore?: undefined | ((message: string) => void);
    refreshNodeHeight?;
    loadMoreNodeHeight?;
    pullToRefreshConfigurator?: PullToRefreshConfigurator;
    props?: ScrollViewPropsWrapper | undefined;
    useYogaLayout?: Boolean;
    children?: HMNode[];
    data?: string[];
    pullDownAnimatedHeight?: number;
}
import commonStyleModifier from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/CommonStyleModifier";
import { FlexManager } from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/Utils";
import { OnScrollBottomEventName, OnScrollTopEventName, ScrollEventName, ScrollEventState, TapEventName, TouchEventName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import type { ScrollEvent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import type { HMContext } from '../../../Context/HMContext';
import { getVP, timestamp } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Utils";
import type { HMNode } from '../../Node';
import { componentFactoryBuilder } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/ComponentBuilder";
import type { ComponentBuilderContext } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/ComponentBuilder";
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/EventHandler";
import { PullToRefresh, PullToRefreshConfigurator, fakeStyleModifier } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/PullToRefresh/ets";
import { ScrollViewPropsWrapper } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/Scroller/ScrollViewPropsWrapper";
import { createLoadMoreEvent, createRefreshEvent, OnLoadMoreEventName, OnRefreshEventName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/PullToRefresh/Event";
import type { RefreshEventState } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/PullToRefresh/Event";
import { isUndefined } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/is";
import { FlexibleColumn } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/PullToRefresh/FlexibleColumn";
export default class HMScroller extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.builderContext = undefined;
        this.scrollDirection = ScrollDirection.Vertical;
        this.hmContext = undefined;
        this.node = undefined;
        this.scroller = new Scroller();
        this.scrollState = ScrollState.Idle;
        this.recentDimOffsetDelta = 0;
        this.stopRefresh = undefined;
        this.stopLoadMore = undefined;
        this.refreshNodeHeight = -1;
        this.loadMoreNodeHeight = -1;
        this.pullToRefreshConfigurator = new PullToRefreshConfigurator();
        this.__props = new ObservedPropertyObjectPU(undefined, this, "props");
        this.__useYogaLayout = new ObservedPropertyObjectPU(false, this, "useYogaLayout");
        this.__children = new ObservedPropertyObjectPU([], this, "children");
        this.__data = new ObservedPropertyObjectPU([], this, "data");
        this.__pullDownAnimatedHeight = new ObservedPropertySimplePU(0, this, "pullDownAnimatedHeight");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: HMScroller_Params) {
        if (params.builderContext !== undefined) {
            this.builderContext = params.builderContext;
        }
        if (params.scrollDirection !== undefined) {
            this.scrollDirection = params.scrollDirection;
        }
        if (params.hmContext !== undefined) {
            this.hmContext = params.hmContext;
        }
        if (params.node !== undefined) {
            this.node = params.node;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.scrollState !== undefined) {
            this.scrollState = params.scrollState;
        }
        if (params.recentDimOffsetDelta !== undefined) {
            this.recentDimOffsetDelta = params.recentDimOffsetDelta;
        }
        if (params.stopRefresh !== undefined) {
            this.stopRefresh = params.stopRefresh;
        }
        if (params.stopLoadMore !== undefined) {
            this.stopLoadMore = params.stopLoadMore;
        }
        if (params.refreshNodeHeight !== undefined) {
            this.refreshNodeHeight = params.refreshNodeHeight;
        }
        if (params.loadMoreNodeHeight !== undefined) {
            this.loadMoreNodeHeight = params.loadMoreNodeHeight;
        }
        if (params.pullToRefreshConfigurator !== undefined) {
            this.pullToRefreshConfigurator = params.pullToRefreshConfigurator;
        }
        if (params.props !== undefined) {
            this.props = params.props;
        }
        if (params.useYogaLayout !== undefined) {
            this.useYogaLayout = params.useYogaLayout;
        }
        if (params.children !== undefined) {
            this.children = params.children;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.pullDownAnimatedHeight !== undefined) {
            this.pullDownAnimatedHeight = params.pullDownAnimatedHeight;
        }
    }
    updateStateVars(params: HMScroller_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__props.purgeDependencyOnElmtId(rmElmtId);
        this.__useYogaLayout.purgeDependencyOnElmtId(rmElmtId);
        this.__children.purgeDependencyOnElmtId(rmElmtId);
        this.__data.purgeDependencyOnElmtId(rmElmtId);
        this.__pullDownAnimatedHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__props.aboutToBeDeleted();
        this.__useYogaLayout.aboutToBeDeleted();
        this.__children.aboutToBeDeleted();
        this.__data.aboutToBeDeleted();
        this.__pullDownAnimatedHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private builderContext: ComponentBuilderContext;
    private scrollDirection: ScrollDirection;
    private hmContext: HMContext;
    private node: HMNode;
    private scroller;
    private scrollState: ScrollState;
    private recentDimOffsetDelta: number;
    private stopRefresh: undefined | ((message: string) => void);
    private stopLoadMore: undefined | ((message: string) => void);
    private refreshNodeHeight;
    private loadMoreNodeHeight;
    // refresh & loadMore info
    private pullToRefreshConfigurator: PullToRefreshConfigurator;
    private __props: ObservedPropertyObjectPU<ScrollViewPropsWrapper | undefined>;
    get props() {
        return this.__props.get();
    }
    set props(newValue: ScrollViewPropsWrapper | undefined) {
        this.__props.set(newValue);
    }
    private __useYogaLayout: ObservedPropertyObjectPU<Boolean>;
    get useYogaLayout() {
        return this.__useYogaLayout.get();
    }
    set useYogaLayout(newValue: Boolean) {
        this.__useYogaLayout.set(newValue);
    }
    private __children: ObservedPropertyObjectPU<HMNode[]>;
    get children() {
        return this.__children.get();
    }
    set children(newValue: HMNode[]) {
        this.__children.set(newValue);
    }
    private __data: ObservedPropertyObjectPU<string[]>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: string[]) {
        this.__data.set(newValue);
    }
    private __pullDownAnimatedHeight: ObservedPropertySimplePU<number>;
    get pullDownAnimatedHeight() {
        return this.__pullDownAnimatedHeight.get();
    }
    set pullDownAnimatedHeight(newValue: number) {
        this.__pullDownAnimatedHeight.set(newValue);
    }
    aboutToAppear(): void {
        this.hmContext = this.builderContext.hmContext;
        this.node = this.builderContext.node;
        this.props = new ScrollViewPropsWrapper(this.node);
        this.children = this.props.child;
        this.props.bindPropsUpdate(() => {
            this.handleRefreshLoadMoreAttr();
        });
        this.props.onChildUpdate((child: HMNode[]) => {
            this.children = child;
        });
        this.handleRefreshLoadMoreAttr();
        this.node.registerNativeFunc("scrollTo", (x: number | string, y: number | string) => {
            this.scroller.scrollBy(getVP(x), getVP(y));
        });
        this.node.registerNativeFunc("scrollBy", (dx: number | string, dy: number | string) => {
            this.scroller.scrollBy(getVP(dx), getVP(dy));
        });
        this.node.registerNativeFunc("scrollToTop", () => {
            this.scroller.scrollTo({
                xOffset: 0,
                yOffset: 0,
            });
        });
        this.node.registerNativeFunc("scrollToBottom", () => {
            const h = this.scroller.getItemRect(0).height;
            this.scroller.scrollTo({
                xOffset: 0,
                yOffset: h,
            });
        });
        // 停止刷新状态
        this.node.registerNativeFunc("stopPullRefresh", () => {
            this.stopRefresh?.('success');
        });
        this.node.registerNativeFunc("stopLoadMore", () => {
            this.stopLoadMore?.('success');
        });
    }
    aboutToDisappear(): void {
        this.props?.dispose();
    }
    handleRefreshLoadMoreAttr() {
        const refreshNode = this.props?.refreshView;
        const loadMoreNode = this.props?.loadMoreView;
        if (!refreshNode) {
            this.pullToRefreshConfigurator?.setHasRefresh(false);
            this.refreshNodeHeight = -1;
        }
        if (!loadMoreNode) {
            this.loadMoreNodeHeight = -1;
            this.pullToRefreshConfigurator?.setHasLoadMore(false);
        }
    }
    onScrollFrameBegin(offset: number, scrollState: ScrollState): number {
        const currentScrollState = this.scrollState;
        this.recentDimOffsetDelta = offset;
        if (currentScrollState != scrollState) {
            if (currentScrollState === ScrollState.Scroll) {
                this.handleDragEnd();
            }
            else if (currentScrollState === ScrollState.Fling) {
                this.onMomentumEnd();
            }
            if (scrollState === ScrollState.Scroll) {
                this.onDragBegin();
            }
            else if (scrollState === ScrollState.Fling) {
                this.onMomentumBegin();
            }
        }
        this.scrollState = scrollState;
        return offset;
    }
    isVertical(): boolean {
        const res = this.scrollDirection == ScrollDirection.Vertical;
        return res;
    }
    createScrollEvent(state: ScrollEventState): ScrollEvent {
        const currentOffset = this.scroller.currentOffset();
        const delta = this.recentDimOffsetDelta;
        const event: ScrollEvent = {
            type: ScrollEventName,
            state: state,
            timestamp: timestamp(),
            offsetX: currentOffset.xOffset,
            offsetY: currentOffset.yOffset,
            dx: this.isVertical() ? 0 : delta,
            dy: this.isVertical() ? delta : 0
        };
        return event;
    }
    // state = 1，开始滚动
    // 手指拖动，
    // 通过 API 触发不调用：scrollTo
    // 边界反弹不调用
    onDragBegin() {
        this.recentDimOffsetDelta = 0;
        this.node.dispatchEvent(ScrollEventName, this.createScrollEvent(ScrollEventState.beganDrag));
    }
    // state = 4，滚动过程中，手指抬起
    // 手指拖动，
    // 通过 API 触发不调用：scrollTo
    handleDragEnd() {
        this.node.dispatchEvent(ScrollEventName, this.createScrollEvent(ScrollEventState.endDrag));
    }
    // 1、滚动组件触发滚动时触发，支持键鼠操作等其他触发滚动的输入设置。
    // 2、通过滚动控制器API接口调用。
    // 3、越界回弹。
    onScroll(xOffset: number, yOffset: number) {
        this.node.dispatchEvent(ScrollEventName, this.createScrollEvent(ScrollEventState.scroll));
    }
    onRefresh(state: RefreshEventState) {
        this.node.dispatchEvent(OnRefreshEventName, createRefreshEvent(state));
    }
    onLoadMore(state: RefreshEventState) {
        this.node.dispatchEvent(OnLoadMoreEventName, createLoadMoreEvent(state));
    }
    // 触发条件
    // 1. 滚动组件触发滚动后停止，支持键鼠操作等其他触发滚动的输入设置。
    // 2、通过滚动控制器API接口调用后开始，带过渡动效。
    onScrollEnd() {
        if (this.scrollState === ScrollState.Fling) {
            this.onMomentumEnd();
        }
        else if (this.scrollState === ScrollState.Scroll) {
            this.handleDragEnd();
        }
        this.scrollState = ScrollState.Idle;
    }
    // 滚动动画结束时调用此函数。
    onMomentumEnd() {
        this.node.dispatchEvent(ScrollEventName, this.createScrollEvent(ScrollEventState.stop));
    }
    // 滚动动画开始时调用此函数。
    onMomentumBegin() {
    }
    onScrollToEdge(side: Edge) {
        this.node.dispatchEvent(side == Edge.Top ? OnScrollTopEventName : OnScrollBottomEventName, undefined);
    }
    bounces(): EdgeEffect {
        // 垂直滚动 且 有刷新或加载视图，取消边缘弹性效果
        if (this.isVertical() && (this.props?.refreshView || this.props?.loadMoreView)) {
            return EdgeEffect.None;
        }
        const bounces = this.props?.bounces ? EdgeEffect.Spring : EdgeEffect.None;
        return bounces;
    }
    showScrollBar(): BarState {
        const showScrollBar = this.props?.showScrollBar ? BarState.Auto : BarState.Off;
        return showScrollBar;
    }
    private hasPullToRefresh(): boolean {
        return (this.isVertical() && (!isUndefined(this.props?.refreshView) || !isUndefined(this.props?.loadMoreView)));
    }
    private setMaxTranslate() {
        this.pullToRefreshConfigurator?.setMaxTranslate(Math.max(this.loadMoreNodeHeight, this.refreshNodeHeight) / 0.75);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.hasPullToRefresh()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("hummer/src/main/ets/Components/ets/Scroller/Scroller.ets(241:7)");
                        Column.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node, this.props?.style));
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new PullToRefresh(this, {
                                    mWidth: undefined,
                                    mHeight: undefined,
                                    // 必传项，需绑定传入主体布局内的列表或宫格组件
                                    scroller: this.scroller,
                                    // 必传项，自定义主体布局，内部有列表或宫格组件
                                    customList: () => {
                                        // 一个用@Builder修饰过的UI方法
                                        this.buildScroller();
                                    },
                                    // 可选项，组件属性配置，具有默认值
                                    refreshConfigurator: this.pullToRefreshConfigurator,
                                    // 可选项，下拉刷新回调, resolve 才会停止刷新状态
                                    onRefresh: () => {
                                        return new Promise<string>((resolve, reject) => {
                                            this.stopRefresh = resolve;
                                        });
                                    },
                                    refreshStateChange: (state: RefreshEventState) => {
                                        this.onRefresh(state);
                                    },
                                    loadMoreStateChange: (state: RefreshEventState) => {
                                        this.onLoadMore(state);
                                    },
                                    onAnimPullDown: (value, width, height) => {
                                        if (isUndefined(height)) {
                                            return;
                                        }
                                        this.pullDownAnimatedHeight = height;
                                    },
                                    onAnimRefreshing: (value, width, height) => {
                                        if (isUndefined(height)) {
                                            return;
                                        }
                                        this.pullDownAnimatedHeight = height;
                                    },
                                    onLoadMore: () => {
                                        return new Promise<string>((resolve, reject) => {
                                            // TODO: stopLoadMore true false 问题
                                            this.stopLoadMore = resolve;
                                        });
                                    },
                                    // 可选项，自定义下拉刷新动画布局
                                    customRefresh: () => {
                                        this.RefreshComponent();
                                    },
                                    customLoad: () => {
                                        this.LoadMoreComponent();
                                    }
                                }, undefined, elmtId, () => { }, { page: "hummer/src/main/ets/Components/ets/Scroller/Scroller.ets", line: 242 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        mWidth: undefined,
                                        mHeight: undefined,
                                        // 必传项，需绑定传入主体布局内的列表或宫格组件
                                        scroller: this.scroller,
                                        // 必传项，自定义主体布局，内部有列表或宫格组件
                                        customList: () => {
                                            // 一个用@Builder修饰过的UI方法
                                            this.buildScroller();
                                        },
                                        // 可选项，组件属性配置，具有默认值
                                        refreshConfigurator: this.pullToRefreshConfigurator,
                                        // 可选项，下拉刷新回调, resolve 才会停止刷新状态
                                        onRefresh: () => {
                                            return new Promise<string>((resolve, reject) => {
                                                this.stopRefresh = resolve;
                                            });
                                        },
                                        refreshStateChange: (state: RefreshEventState) => {
                                            this.onRefresh(state);
                                        },
                                        loadMoreStateChange: (state: RefreshEventState) => {
                                            this.onLoadMore(state);
                                        },
                                        onAnimPullDown: (value, width, height) => {
                                            if (isUndefined(height)) {
                                                return;
                                            }
                                            this.pullDownAnimatedHeight = height;
                                        },
                                        onAnimRefreshing: (value, width, height) => {
                                            if (isUndefined(height)) {
                                                return;
                                            }
                                            this.pullDownAnimatedHeight = height;
                                        },
                                        onLoadMore: () => {
                                            return new Promise<string>((resolve, reject) => {
                                                // TODO: stopLoadMore true false 问题
                                                this.stopLoadMore = resolve;
                                            });
                                        },
                                        // 可选项，自定义下拉刷新动画布局
                                        customRefresh: () => {
                                            this.RefreshComponent();
                                        },
                                        customLoad: () => {
                                            this.LoadMoreComponent();
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "PullToRefresh" });
                    }
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildScroller.bind(this)();
                });
            }
        }, If);
        If.pop();
    }
    loadMoreComponentChild(parent = null) {
        componentFactoryBuilder.bind(this)(makeBuilderParameterProxy("componentFactoryBuilder", { hmContext: () => (this["__hmContext"] ? this["__hmContext"] : this["hmContext"]), tag: () => this.props!.loadMoreView!.name, node: () => this.props!.loadMoreView!, customComponentBuilder: () => this.builderContext.customComponentBuilder }));
    }
    LoadMoreComponent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.props?.loadMoreView) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.height(1000);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new FlexibleColumn(this, {
                                    childBuilder: this.loadMoreComponentChild.bind(this),
                                    didUpdateLayout: (width, height) => {
                                        this.loadMoreNodeHeight = height;
                                        this.setMaxTranslate();
                                    }
                                }, undefined, elmtId, () => { }, { page: "hummer/src/main/ets/Components/ets/Scroller/Scroller.ets", line: 313 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        childBuilder: this.loadMoreComponentChild.bind(this),
                                        didUpdateLayout: (width, height) => {
                                            this.loadMoreNodeHeight = height;
                                            this.setMaxTranslate();
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "FlexibleColumn" });
                    }
                    __Common__.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    refreshComponentChild(parent = null) {
        componentFactoryBuilder.bind(this)(makeBuilderParameterProxy("componentFactoryBuilder", { hmContext: () => (this["__hmContext"] ? this["__hmContext"] : this["hmContext"]), tag: () => this.props!.refreshView!.name, node: () => this.props!.refreshView!, customComponentBuilder: () => this.builderContext.customComponentBuilder }));
    }
    RefreshComponent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.props?.refreshView) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.height(1000);
                        __Common__.translate({ x: 0, y: this.pullDownOffsetYAnimation() });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new FlexibleColumn(this, {
                                    childBuilder: this.refreshComponentChild.bind(this),
                                    didUpdateLayout: (width, height) => {
                                        this.refreshNodeHeight = height;
                                        this.setMaxTranslate();
                                    }
                                }, undefined, elmtId, () => { }, { page: "hummer/src/main/ets/Components/ets/Scroller/Scroller.ets", line: 336 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        childBuilder: this.refreshComponentChild.bind(this),
                                        didUpdateLayout: (width, height) => {
                                            this.refreshNodeHeight = height;
                                            this.setMaxTranslate();
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "FlexibleColumn" });
                    }
                    __Common__.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    pullDownOffsetYAnimation(): number {
        const value = this.pullDownAnimatedHeight - this.pullToRefreshConfigurator!.getMaxTranslate()! * 0.75;
        return value;
    }
    buildScroller(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //scroller 的高度没办法超出父容器
            Scroll.create(this.scroller);
            Scroll.debugLine("hummer/src/main/ets/Components/ets/Scroller/Scroller.ets(355:5)");
            //scroller 的高度没办法超出父容器
            Scroll.align(Alignment.TopStart);
            //scroller 的高度没办法超出父容器
            Scroll.scrollable(this.scrollDirection);
            //scroller 的高度没办法超出父容器
            Scroll.edgeEffect(this.bounces());
            //scroller 的高度没办法超出父容器
            Scroll.scrollBar(this.showScrollBar());
            //scroller 的高度没办法超出父容器
            Scroll.onScrollFrameBegin(shouldBindEvent(this.node, ScrollEventName, (offset: number, state: ScrollState) => this.onScrollFrameBegin(offset, state)));
            //scroller 的高度没办法超出父容器
            Scroll.onScroll(shouldBindEvent(this.node, ScrollEventName, (xOffset: number, yOffset: number): void => this.onScroll(xOffset, yOffset)));
            //scroller 的高度没办法超出父容器
            Scroll.onScrollStop(shouldBindEvent(this.node, ScrollEventName, (): void => this.onScrollEnd()));
            //scroller 的高度没办法超出父容器
            Scroll.onScrollEdge(shouldBindEvent(this.node, [OnScrollBottomEventName, OnScrollTopEventName], (side: Edge): void => this.onScrollToEdge(side)));
            //scroller 的高度没办法超出父容器
            Scroll.width('100%');
            //scroller 的高度没办法超出父容器
            Scroll.height('100%');
            //scroller 的高度没办法超出父容器
            Scroll.attributeModifier.bind(this)(this.hasPullToRefresh() ? fakeStyleModifier : commonStyleModifier.setNode(this.node, this.props?.style));
            //scroller 的高度没办法超出父容器
            Scroll.onClick(shouldBindEvent(this.props!.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.props!.node, e)));
            //scroller 的高度没办法超出父容器
            Scroll.onTouch(shouldBindEvent(this.props!.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.props!.node, e)));
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.hmContext.flexOptimize && FlexManager.canConvertToRow(this.props?.style)) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildRow.bind(this)();
                });
            }
            else if (this.hmContext.flexOptimize && FlexManager.canConvertToColumn(this.props?.style)) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildColumn.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.buildFlex.bind(this)();
                });
            }
        }, If);
        If.pop();
        //scroller 的高度没办法超出父容器
        Scroll.pop();
    }
    // scroller 内部容器只设置 宽高。其他属性由 scroller 设置
    buildColumn(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("hummer/src/main/ets/Components/ets/Scroller/Scroller.ets(382:5)");
            Column.alignItems(FlexManager.convertFlexAlignItemsToColumnOrRow(this.props?.style?.flexDirection, this.props?.style?.alignItems) as HorizontalAlign);
            Column.justifyContent(FlexManager.flexOptions(this.props?.style).justifyContent);
            Column.onClick(shouldBindEvent(this.props!.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.props!.node, e)));
            Column.onTouch(shouldBindEvent(this.props!.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.props!.node, e)));
            Column.width(this.isVertical() ? '100%' : null);
            Column.height(this.isVertical() ? null : '100%');
        }, Column);
        this.buildChildren.bind(this)();
        Column.pop();
    }
    buildRow(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("hummer/src/main/ets/Components/ets/Scroller/Scroller.ets(395:5)");
            Row.alignItems(FlexManager.convertFlexAlignItemsToColumnOrRow(this.props?.style?.flexDirection, this.props?.style?.alignItems) as VerticalAlign);
            Row.justifyContent(FlexManager.flexOptions(this.props?.style).justifyContent);
            Row.onClick(shouldBindEvent(this.props!.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.props!.node, e)));
            Row.onTouch(shouldBindEvent(this.props!.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.props!.node, e)));
            Row.width(this.isVertical() ? '100%' : null);
            Row.height(this.isVertical() ? null : '100%');
        }, Row);
        this.buildChildren.bind(this)();
        Row.pop();
    }
    buildFlex(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create(FlexManager.flexOptions(this.props?.style));
            Flex.debugLine("hummer/src/main/ets/Components/ets/Scroller/Scroller.ets(408:5)");
            Flex.onClick(shouldBindEvent(this.props!.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.props!.node, e)));
            Flex.onTouch(shouldBindEvent(this.props!.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.props!.node, e)));
            Flex.width(this.isVertical() ? '100%' : null);
            Flex.height(this.isVertical() ? null : '100%');
        }, Flex);
        this.buildChildren.bind(this)();
        Flex.pop();
    }
    buildChildren(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const node = _item;
                componentFactoryBuilder.bind(this)(makeBuilderParameterProxy("componentFactoryBuilder", { hmContext: () => (this["__hmContext"] ? this["__hmContext"] : this["hmContext"]), tag: () => node.name, node: () => node, customComponentBuilder: () => this.builderContext.customComponentBuilder }));
            };
            this.forEachUpdateFunction(elmtId, this.children, forEachItemGenFunction, (node: HMNode) => node.id.toString(), false, false);
        }, ForEach);
        ForEach.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
