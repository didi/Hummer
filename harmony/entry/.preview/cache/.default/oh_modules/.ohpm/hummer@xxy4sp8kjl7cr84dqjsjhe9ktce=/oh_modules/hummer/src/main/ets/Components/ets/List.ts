interface HMList_Params {
    builderContext?: ComponentBuilderContext;
    hmContext?: HMContext;
    node?: Node;
    style?: IHummerListStyle | undefined;
    attributes?: AttributesType | undefined;
    listMode?: string;
    scroller?: Scroller;
    scrollState?: ScrollState;
    scrollDirection?: ScrollDirection;
    recentDimOffsetDelta?: number;
    listItemTypeList?: number[];
    listItemNodeList?: HMAny[];
    listDataSource?: ListDataSource;
    refreshLoadMoreHelper?: RefreshLoadMoreInfoClass;
    isRefreshing?: boolean;
    refreshNode?: HMAny;
    refreshCallback?: HMAny;
    loadMoreNode?: HMAny;
    loadMoreCallback?: HMAny;
}
import { MutationType } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Node";
import type { AttributesType, Node } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Node";
import type { HMContext } from '../../Context/HMContext';
import commonStyleModifier from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/AttributeModifiers/CommonStyleModifier";
import { componentFactoryBuilder } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/ets/ComponentBuilder";
import type { ComponentBuilderContext } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/ets/ComponentBuilder";
import { shouldBindEvent } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/ets/EventHandler";
import { OnScrollBottomEventName, OnScrollTopEventName, ScrollEventName, ScrollEventState, } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Event";
import type { ScrollEvent } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Event";
import type { IHummerListStyle } from '../../Style/IHummerStyle';
import { isUndefined, timestamp } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/Utils";
import type { HMAny } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/Utils";
import { getEdgeEffect, getListDirection, getScrollBarState, getVP } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/AttributeModifiers/Utils";
import { RefreshLoadMoreInfoClass, listTouchEvent } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/RefreshLoadMoreHelper";
class BasicDataSource implements IDataSource {
    private listeners: DataChangeListener[] = [];
    private originDataArray: string[] = [];
    public totalCount(): number {
        return 0;
    }
    public getData(index: number): string {
        return this.originDataArray[index];
    }
    registerDataChangeListener(listener: DataChangeListener): void {
        if (this.listeners.indexOf(listener) < 0) {
            console.info('add listener');
            this.listeners.push(listener);
        }
    }
    unregisterDataChangeListener(listener: DataChangeListener): void {
        const pos = this.listeners.indexOf(listener);
        if (pos >= 0) {
            console.info('remove listener');
            this.listeners.splice(pos, 1);
        }
    }
    notifyDataReload(): void {
        this.listeners.forEach(listener => {
            listener.onDataReloaded();
        });
    }
    notifyDataAdd(index: number): void {
        this.listeners.forEach(listener => {
            listener.onDataAdd(index);
        });
    }
    notifyDataChange(index: number): void {
        this.listeners.forEach(listener => {
            listener.onDataChange(index);
        });
    }
    notifyDataDelete(index: number): void {
        this.listeners.forEach(listener => {
            listener.onDataDelete(index);
        });
    }
}
class ListDataSource extends BasicDataSource {
    private dataArray: HMAny[] = [];
    public totalCount(): number {
        return this.dataArray.length;
    }
    public getData(index: number): string {
        return this.dataArray[index];
    }
    public addData(index: number, data: string): void {
        this.dataArray.splice(index, 0, data);
        this.notifyDataAdd(index);
    }
    public pushData(data: string): void {
        this.dataArray.push(data);
        this.notifyDataAdd(this.dataArray.length - 1);
    }
    public deleteData(index: number): void {
        this.dataArray.splice(index, 1);
        this.notifyDataDelete(index);
    }
    public changeData(index: number): void {
        this.notifyDataChange(index);
    }
    public reloadData(): void {
        this.notifyDataReload();
    }
    public modifyAllData(count: number): void {
        this.dataArray = (new Array(count)).map((item: HMAny, index: number): HMAny => {
            return index + new Date().getUTCMilliseconds();
        });
    }
}
export default class HMList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.builderContext = undefined;
        this.hmContext = undefined;
        this.node = undefined;
        this.__style = new ObservedPropertyObjectPU(undefined, this, "style");
        this.__attributes = new ObservedPropertyObjectPU(undefined, this, "attributes");
        this.listMode = 'list';
        this.scroller = new Scroller();
        this.scrollState = ScrollState.Idle;
        this.scrollDirection = ScrollDirection.Vertical;
        this.recentDimOffsetDelta = 0;
        this.listItemTypeList = [];
        this.listItemNodeList = [];
        this.listDataSource = new ListDataSource();
        this.__refreshLoadMoreHelper = new ObservedPropertyObjectPU(new RefreshLoadMoreInfoClass(), this, "refreshLoadMoreHelper");
        this.__isRefreshing = new ObservedPropertySimplePU(false, this, "isRefreshing");
        this.refreshNode = undefined;
        this.refreshCallback = undefined;
        this.loadMoreNode = undefined;
        this.loadMoreCallback = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: HMList_Params) {
        if (params.builderContext !== undefined) {
            this.builderContext = params.builderContext;
        }
        if (params.hmContext !== undefined) {
            this.hmContext = params.hmContext;
        }
        if (params.node !== undefined) {
            this.node = params.node;
        }
        if (params.style !== undefined) {
            this.style = params.style;
        }
        if (params.attributes !== undefined) {
            this.attributes = params.attributes;
        }
        if (params.listMode !== undefined) {
            this.listMode = params.listMode;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.scrollState !== undefined) {
            this.scrollState = params.scrollState;
        }
        if (params.scrollDirection !== undefined) {
            this.scrollDirection = params.scrollDirection;
        }
        if (params.recentDimOffsetDelta !== undefined) {
            this.recentDimOffsetDelta = params.recentDimOffsetDelta;
        }
        if (params.listItemTypeList !== undefined) {
            this.listItemTypeList = params.listItemTypeList;
        }
        if (params.listItemNodeList !== undefined) {
            this.listItemNodeList = params.listItemNodeList;
        }
        if (params.listDataSource !== undefined) {
            this.listDataSource = params.listDataSource;
        }
        if (params.refreshLoadMoreHelper !== undefined) {
            this.refreshLoadMoreHelper = params.refreshLoadMoreHelper;
        }
        if (params.isRefreshing !== undefined) {
            this.isRefreshing = params.isRefreshing;
        }
        if (params.refreshNode !== undefined) {
            this.refreshNode = params.refreshNode;
        }
        if (params.refreshCallback !== undefined) {
            this.refreshCallback = params.refreshCallback;
        }
        if (params.loadMoreNode !== undefined) {
            this.loadMoreNode = params.loadMoreNode;
        }
        if (params.loadMoreCallback !== undefined) {
            this.loadMoreCallback = params.loadMoreCallback;
        }
    }
    updateStateVars(params: HMList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__style.purgeDependencyOnElmtId(rmElmtId);
        this.__attributes.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshLoadMoreHelper.purgeDependencyOnElmtId(rmElmtId);
        this.__isRefreshing.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__style.aboutToBeDeleted();
        this.__attributes.aboutToBeDeleted();
        this.__refreshLoadMoreHelper.aboutToBeDeleted();
        this.__isRefreshing.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private builderContext: ComponentBuilderContext;
    private hmContext: HMContext;
    private node: Node;
    private __style: ObservedPropertyObjectPU<IHummerListStyle | undefined>;
    get style() {
        return this.__style.get();
    }
    set style(newValue: IHummerListStyle | undefined) {
        this.__style.set(newValue);
    }
    private __attributes: ObservedPropertyObjectPU<AttributesType | undefined>;
    get attributes() {
        return this.__attributes.get();
    }
    set attributes(newValue: AttributesType | undefined) {
        this.__attributes.set(newValue);
    }
    private listMode: string;
    // 滚动控制器
    private scroller: Scroller;
    private scrollState: ScrollState;
    private scrollDirection: ScrollDirection;
    private recentDimOffsetDelta: number;
    // item & data
    private listItemTypeList: number[];
    private listItemNodeList: HMAny[];
    private listDataSource: ListDataSource;
    // refresh info
    private __refreshLoadMoreHelper: ObservedPropertyObjectPU<RefreshLoadMoreInfoClass>;
    get refreshLoadMoreHelper() {
        return this.__refreshLoadMoreHelper.get();
    }
    set refreshLoadMoreHelper(newValue: RefreshLoadMoreInfoClass) {
        this.__refreshLoadMoreHelper.set(newValue);
    }
    private __isRefreshing: ObservedPropertySimplePU<boolean>;
    get isRefreshing() {
        return this.__isRefreshing.get();
    }
    set isRefreshing(newValue: boolean) {
        this.__isRefreshing.set(newValue);
    }
    private refreshNode: HMAny;
    private refreshCallback: HMAny;
    private loadMoreNode: HMAny;
    private loadMoreCallback: HMAny;
    aboutToAppear(): void {
        this.hmContext = this.builderContext.hmContext;
        this.node = this.builderContext.node;
        this.style = this.node.style as IHummerListStyle;
        this.attributes = this.node.attributes;
        this.listMode = this.style?.mode || 'list';
        this.refreshCallback = this.attributes?.onRefresh;
        this.refreshNode = this.attributes?.refreshView;
        this.loadMoreCallback = this.attributes?.onLoadMore;
        this.loadMoreNode = this.attributes?.loadMoreView;
        // 监听style 和 attributes
        this.node.registerUpdateFunc(MutationType.Style, (style: IHummerListStyle) => {
            this.style = style;
        }).registerUpdateFunc(MutationType.Attribute, (attributes: AttributesType) => {
            this.attributes = attributes;
            this.refreshCallback = this.attributes?.onRefresh;
            this.refreshNode = this.attributes?.refreshView;
            this.loadMoreCallback = this.attributes?.onLoadMore;
            this.loadMoreNode = this.attributes?.loadMoreView;
        });
        // 刷新列表方法 内部触发onRegister onCreate回调
        this.node.registerNativeFunc("refresh", (count: number) => {
            for (let position = 0; position < count; position++) {
                let type = this.attributes?.onRegister(position) as number;
                this.listItemTypeList.push(type);
                this.listItemNodeList.push(this.attributes?.onCreate(type));
            }
            this.listDataSource.modifyAllData(count);
            this.listDataSource.reloadData();
        });
        //
        this.node.registerNativeFunc("scrollTo", (x: number | string, y: number | string) => {
            this.scroller.scrollBy(getVP(x), getVP(y));
        }).registerNativeFunc("scrollBy", (dx: number | string, dy: number | string) => {
            this.scroller.scrollBy(getVP(dx), getVP(dy));
        }).registerNativeFunc("scrollToTop", () => {
            this.scroller.scrollTo({
                xOffset: 0,
                yOffset: 0,
            });
        }).registerNativeFunc("scrollToBottom", () => {
            const h = this.scroller.getItemRect(0).height;
            this.scroller.scrollTo({
                xOffset: 0,
                yOffset: h,
            });
        });
        // 停止刷新状态
        this.node.registerNativeFunc("stopPullRefresh", () => {
            this.isRefreshing = false;
        });
        // 停止加载更多状态
        this.node.registerNativeFunc("stopLoadMore", (enable: boolean) => {
            // TODO: 下次能否加载更多标识处理
            // this.isRefreshing = false
        });
    }
    // hdc
    aboutToDisappear(): void {
        this.node.unregisterAllUpdateFuncs();
    }
    isVertical(): boolean {
        const res = this.style?.scrollDirection === 'vertical';
        return res;
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
        console.log("### hummer", JSON.stringify(event));
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
        if (!isUndefined(this.attributes?.bounces)) {
            const bounces = this.attributes?.bounces ? EdgeEffect.Spring : EdgeEffect.None;
            return bounces;
        }
        return EdgeEffect.Spring;
    }
    showScrollBar(): BarState {
        if (!isUndefined(this.attributes?.showScrollBar)) {
            const showScrollBar = this.attributes?.showScrollBar ? BarState.Auto : BarState.Off;
            return showScrollBar;
        }
        return BarState.Auto;
    }
    columnsTemplate(column: number): string {
        let template = '';
        for (let index = 0; index < column; index++) {
            template += '1fr ';
        }
        return template;
    }
    getHummerRefreshState(refreshStatus: RefreshStatus): number {
        console.log('refreshStatus', refreshStatus);
        if ([RefreshStatus.Inactive, RefreshStatus.Done].indexOf(refreshStatus) > -1) {
            return 0;
        }
        else if ([RefreshStatus.Drag, RefreshStatus.OverDrag].indexOf(refreshStatus) > -1) {
            return 1;
        }
        else {
            return 2;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/List.ets(335:5)");
            Column.onTouch((event: TouchEvent | undefined) => {
                if (event) {
                    listTouchEvent(this.refreshLoadMoreHelper, event);
                }
            });
            Column.clip(true);
            Column.backgroundColor('red');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // if (this.refreshNode) {
            //   this.RefreshComponent()
            // }
            if (this.listMode === 'list') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.listBuilder.bind(this)();
                });
            }
            else if (this.listMode === 'waterfall') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.waterFallBuilder.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.gridBuilder.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    LoadMoreComponent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我是加载更多视图');
            Text.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/List.ets(364:5)");
            Text.height(70);
            Text.offset({ x: 0, y: `${this.refreshLoadMoreHelper.offsetY}px` });
            Text.backgroundColor('blue');
        }, Text);
        Text.pop();
    }
    RefreshComponent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // if (this.refreshNode) {
            //   Column() {
            //     componentFactoryBuilder({
            //       hmContext : this.hmContext,
            //       tag: this.refreshNode.name,
            //       node: this.refreshNode,
            //       customComponentBuilder: this.builderContext.customComponentBuilder
            //     })
            //   }
            // } else {
            Text.create("正在刷新...1111");
            Text.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/List.ets(382:7)");
            // if (this.refreshNode) {
            //   Column() {
            //     componentFactoryBuilder({
            //       hmContext : this.hmContext,
            //       tag: this.refreshNode.name,
            //       node: this.refreshNode,
            //       customComponentBuilder: this.builderContext.customComponentBuilder
            //     })
            //   }
            // } else {
            Text.fontSize(30);
            // if (this.refreshNode) {
            //   Column() {
            //     componentFactoryBuilder({
            //       hmContext : this.hmContext,
            //       tag: this.refreshNode.name,
            //       node: this.refreshNode,
            //       customComponentBuilder: this.builderContext.customComponentBuilder
            //     })
            //   }
            // } else {
            Text.height(70);
            // if (this.refreshNode) {
            //   Column() {
            //     componentFactoryBuilder({
            //       hmContext : this.hmContext,
            //       tag: this.refreshNode.name,
            //       node: this.refreshNode,
            //       customComponentBuilder: this.builderContext.customComponentBuilder
            //     })
            //   }
            // } else {
            Text.offset({ x: 0, y: `${vp2px(-70) + this.refreshLoadMoreHelper.offsetY}px` });
            // if (this.refreshNode) {
            //   Column() {
            //     componentFactoryBuilder({
            //       hmContext : this.hmContext,
            //       tag: this.refreshNode.name,
            //       node: this.refreshNode,
            //       customComponentBuilder: this.builderContext.customComponentBuilder
            //     })
            //   }
            // } else {
            Text.backgroundColor('blue');
        }, Text);
        // if (this.refreshNode) {
        //   Column() {
        //     componentFactoryBuilder({
        //       hmContext : this.hmContext,
        //       tag: this.refreshNode.name,
        //       node: this.refreshNode,
        //       customComponentBuilder: this.builderContext.customComponentBuilder
        //     })
        //   }
        // } else {
        Text.pop();
    }
    listBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({
                space: getVP(this.style?.lineSpacing || 0),
                scroller: this.scroller
            });
            List.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/List.ets(391:5)");
            List.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node));
            List.listDirection(getListDirection(this.style?.scrollDirection));
            List.scrollBar(getScrollBarState(this.attributes?.showScrollBar));
            List.edgeEffect(getEdgeEffect(this.attributes?.bounces));
            List.cachedCount(3);
            List.contentStartOffset(getVP(this.style?.topSpacing || 0));
            List.contentEndOffset(getVP(this.style?.bottomSpacing || 0));
            List.onScroll(shouldBindEvent(this.node, ScrollEventName, (xOffset: number, yOffset: number): void => this.onScroll(xOffset, yOffset)));
            List.onTouch((event: TouchEvent | undefined) => {
                if (event) {
                    // listTouchEvent(this.refreshLoadMoreInfo, event);
                }
            });
            List.onReachStart(() => {
                this.refreshLoadMoreHelper.isReachStart = true;
            });
            List.onReachEnd(() => {
                this.refreshLoadMoreHelper.isReachEnd = true;
            });
        }, List);
        {
            const __lazyForEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(() => { }, false);
                        ListItem.onAppear(() => {
                            // 节点渲染时 触发onUpdate回调
                            this.attributes?.onUpdate(index, this.listItemNodeList[index]);
                        });
                        ListItem.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/List.ets(397:9)");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        componentFactoryBuilder.bind(this)(makeBuilderParameterProxy("componentFactoryBuilder", { hmContext: () => (this["__hmContext"] ? this["__hmContext"] : this["hmContext"]), tag: () => this.listItemNodeList[index].__nativeHandle__.name, node: () => this.listItemNodeList[index].__nativeHandle__, customComponentBuilder: () => this.builderContext.customComponentBuilder }));
                        ListItem.pop();
                    };
                    observedDeepRender();
                }
            };
            LazyForEach.create("1", this, this.listDataSource, __lazyForEachItemGenFunction);
            LazyForEach.pop();
        }
        List.pop();
    }
    gridBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create(this.scroller, {
                regularSize: [1, 1]
            });
            Grid.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/List.ets(434:5)");
            Grid.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node));
            Grid.columnsGap(getVP(this.style?.itemSpacing || 0));
            Grid.rowsGap(getVP(this.style?.lineSpacing || 0));
            Grid.scrollBar(getScrollBarState(this.attributes?.showScrollBar));
            Grid.edgeEffect(getEdgeEffect(false));
            Grid.columnsTemplate(this.columnsTemplate(this.style?.column || 2));
            Grid.cachedCount(3);
            Grid.onScroll(shouldBindEvent(this.node, ScrollEventName, (xOffset: number, yOffset: number): void => this.onScroll(xOffset, yOffset)));
            Grid.onReachStart(() => {
                this.refreshLoadMoreHelper.isReachStart = true;
            });
            Grid.onReachEnd(() => {
                this.refreshLoadMoreHelper.isReachEnd = true;
            });
            Grid.onTouch((event: TouchEvent | undefined) => {
                if (event) {
                    listTouchEvent(this.refreshLoadMoreHelper, event);
                }
            });
        }, Grid);
        {
            const __lazyForEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.onAppear(() => {
                            // 节点渲染时 触发onUpdate回调
                            this.attributes?.onUpdate(index, this.listItemNodeList[index]);
                        });
                        GridItem.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/List.ets(438:9)");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        componentFactoryBuilder.bind(this)(makeBuilderParameterProxy("componentFactoryBuilder", { hmContext: () => (this["__hmContext"] ? this["__hmContext"] : this["hmContext"]), tag: () => this.listItemNodeList[index].name, node: () => this.listItemNodeList[index], customComponentBuilder: () => this.builderContext.customComponentBuilder }));
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            LazyForEach.create("1", this, this.listDataSource, __lazyForEachItemGenFunction);
            LazyForEach.pop();
        }
        Grid.pop();
    }
    waterFallBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            WaterFlow.create({
                scroller: this.scroller
            });
            WaterFlow.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/List.ets(483:5)");
            WaterFlow.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node));
            WaterFlow.columnsGap(getVP(this.style?.itemSpacing || 0));
            WaterFlow.rowsGap(getVP(this.style?.lineSpacing || 0));
            WaterFlow.scrollBar(getScrollBarState(this.attributes?.showScrollBar));
            WaterFlow.edgeEffect(getEdgeEffect(this.attributes?.bounces));
            WaterFlow.columnsTemplate(this.columnsTemplate(this.style?.column || 2));
            WaterFlow.cachedCount(3);
            WaterFlow.onScroll(shouldBindEvent(this.node, ScrollEventName, (xOffset: number, yOffset: number): void => this.onScroll(xOffset, yOffset)));
        }, WaterFlow);
        {
            const __lazyForEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    FlowItem.create();
                    FlowItem.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/List.ets(487:9)");
                    FlowItem.onAppear(() => {
                        // 节点渲染时 触发onUpdate回调
                        this.attributes?.onUpdate(index, this.listItemNodeList[index]);
                    });
                }, FlowItem);
                componentFactoryBuilder.bind(this)(makeBuilderParameterProxy("componentFactoryBuilder", { hmContext: () => (this["__hmContext"] ? this["__hmContext"] : this["hmContext"]), tag: () => this.listItemNodeList[index].name, node: () => this.listItemNodeList[index], customComponentBuilder: () => this.builderContext.customComponentBuilder }));
                FlowItem.pop();
            };
            LazyForEach.create("1", this, this.listDataSource, __lazyForEachItemGenFunction);
            LazyForEach.pop();
        }
        WaterFlow.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
