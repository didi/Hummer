interface HMScroller_Params {
    builderContext?: ComponentBuilderContext;
    scrollDirection?: ScrollDirection;
    hmContext?: HMContext;
    node?: Node;
    scroller?;
    offsetDelta?: Position;
    scrollState?: ScrollState;
    recentDimOffsetDelta?: number;
    useYogaLayout?: Boolean;
    children?: Node[];
    style?: IHummerStyle | undefined;
    attributes?: AttributesType | undefined;
}
import commonStyleModifier from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/AttributeModifiers/CommonStyleModifier";
import { FlexManager, getVP } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/AttributeModifiers/Utils";
import { OnScrollBottomEventName, OnScrollTopEventName, ScrollEventName, ScrollEventState, TapEventName, TouchEventName } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Event";
import type { ScrollEvent } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Event";
import type { HMContext } from '../../Context/HMContext';
import type { IHummerStyle } from '../../Style/IHummerStyle';
import { isUndefined, timestamp } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/Utils";
import { MutationType } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Node";
import type { AttributesType, Node } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Node";
import { componentFactoryBuilder } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/ets/ComponentBuilder";
import type { ComponentBuilderContext } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/ets/ComponentBuilder";
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/ets/EventHandler";
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
        this.offsetDelta = { x: 0, y: 0 };
        this.scrollState = ScrollState.Idle;
        this.recentDimOffsetDelta = 0;
        this.__useYogaLayout = new ObservedPropertyObjectPU(false, this, "useYogaLayout");
        this.__children = new ObservedPropertyObjectPU([], this, "children");
        this.__style = new ObservedPropertyObjectPU(undefined, this, "style");
        this.__attributes = new ObservedPropertyObjectPU(undefined, this, "attributes");
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
        if (params.offsetDelta !== undefined) {
            this.offsetDelta = params.offsetDelta;
        }
        if (params.scrollState !== undefined) {
            this.scrollState = params.scrollState;
        }
        if (params.recentDimOffsetDelta !== undefined) {
            this.recentDimOffsetDelta = params.recentDimOffsetDelta;
        }
        if (params.useYogaLayout !== undefined) {
            this.useYogaLayout = params.useYogaLayout;
        }
        if (params.children !== undefined) {
            this.children = params.children;
        }
        if (params.style !== undefined) {
            this.style = params.style;
        }
        if (params.attributes !== undefined) {
            this.attributes = params.attributes;
        }
    }
    updateStateVars(params: HMScroller_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__useYogaLayout.purgeDependencyOnElmtId(rmElmtId);
        this.__children.purgeDependencyOnElmtId(rmElmtId);
        this.__style.purgeDependencyOnElmtId(rmElmtId);
        this.__attributes.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__useYogaLayout.aboutToBeDeleted();
        this.__children.aboutToBeDeleted();
        this.__style.aboutToBeDeleted();
        this.__attributes.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private builderContext: ComponentBuilderContext;
    private scrollDirection: ScrollDirection;
    private hmContext: HMContext;
    private node: Node;
    private scroller;
    private offsetDelta: Position;
    private scrollState: ScrollState;
    private recentDimOffsetDelta: number;
    private __useYogaLayout: ObservedPropertyObjectPU<Boolean>;
    get useYogaLayout() {
        return this.__useYogaLayout.get();
    }
    set useYogaLayout(newValue: Boolean) {
        this.__useYogaLayout.set(newValue);
    }
    private __children: ObservedPropertyObjectPU<Node[]>;
    get children() {
        return this.__children.get();
    }
    set children(newValue: Node[]) {
        this.__children.set(newValue);
    }
    private __style: ObservedPropertyObjectPU<IHummerStyle | undefined>;
    get style() {
        return this.__style.get();
    }
    set style(newValue: IHummerStyle | undefined) {
        this.__style.set(newValue);
    }
    private __attributes: ObservedPropertyObjectPU<AttributesType | undefined>;
    get attributes() {
        return this.__attributes.get();
    }
    set attributes(newValue: AttributesType | undefined) {
        this.__attributes.set(newValue);
    }
    aboutToAppear(): void {
        this.hmContext = this.builderContext.hmContext;
        this.node = this.builderContext.node;
        this.style = this.node.style;
        this.children = this.node.childNodes;
        this.attributes = this.node.attributes;
        // todo: 是否有更好的 监听改动机制
        this.node.registerUpdateFunc(MutationType.Style, (style: IHummerStyle) => {
            this.style = style;
        }).registerUpdateFunc(MutationType.Attribute, (attributes: AttributesType) => {
            this.attributes = attributes;
        }).registerUpdateFunc(MutationType.Children, (childNodes: Node[]) => {
            this.children = childNodes;
        });
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
    }
    // hdc
    aboutToDisappear(): void {
        this.node.unregisterAllUpdateFuncs();
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
        console.log('hummer', res);
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/Scroller.ets(191:5)");
            Scroll.align(Alignment.TopStart);
            Scroll.scrollable(this.scrollDirection);
            Scroll.edgeEffect(this.bounces());
            Scroll.scrollBar(this.showScrollBar());
            Scroll.onScrollFrameBegin(shouldBindEvent(this.node, ScrollEventName, (offset: number, state: ScrollState) => this.onScrollFrameBegin(offset, state)));
            Scroll.onScroll(shouldBindEvent(this.node, ScrollEventName, (xOffset: number, yOffset: number): void => this.onScroll(xOffset, yOffset)));
            Scroll.onScrollStop(shouldBindEvent(this.node, ScrollEventName, (): void => this.onScrollEnd()));
            Scroll.onScrollEdge(shouldBindEvent(this.node, [OnScrollBottomEventName, OnScrollBottomEventName], (side: Edge): void => this.onScrollToEdge(side)));
            Scroll.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node, ObservedObject.GetRawObject(this.style)));
            Scroll.onClick(shouldBindEvent(this.node, TapEventName, (e: ClickEvent): void => dispatchTapEvent(this.node, e)));
            Scroll.onTouch(shouldBindEvent(this.node, TouchEventName, (e: TouchEvent): void => dispatchTouchEvent(this.node, e)));
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.hmContext.flexOptimize && FlexManager.canConvertToRow(ObservedObject.GetRawObject(this.style))) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildRow.bind(this)();
                });
            }
            else if (this.hmContext.flexOptimize && FlexManager.canConvertToColumn(ObservedObject.GetRawObject(this.style))) {
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
        Scroll.pop();
    }
    buildColumn(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/Scroller.ets(214:3)");
            Column.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node, ObservedObject.GetRawObject(this.style)));
            Column.alignItems(FlexManager.convertFlexAlignItemsToColumnOrRow(this.style?.flexDirection, this.style?.alignItems) as HorizontalAlign);
            Column.justifyContent(FlexManager.flexOptions(ObservedObject.GetRawObject(this.style)).justifyContent);
            Column.onClick(shouldBindEvent(this.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.node, e)));
            Column.onTouch(shouldBindEvent(this.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.node, e)));
            Column.width(this.isVertical() ? this.style?.width : null);
            Column.height(this.isVertical() ? null : this.style?.height);
        }, Column);
        this.buildChildren.bind(this)();
        Column.pop();
    }
    buildRow(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/Scroller.ets(228:3)");
            Row.alignItems(FlexManager.convertFlexAlignItemsToColumnOrRow(this.style?.flexDirection, this.style?.alignItems) as VerticalAlign);
            Row.justifyContent(FlexManager.flexOptions(ObservedObject.GetRawObject(this.style)).justifyContent);
            Row.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node, ObservedObject.GetRawObject(this.style)));
            Row.onClick(shouldBindEvent(this.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.node, e)));
            Row.onTouch(shouldBindEvent(this.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.node, e)));
            Row.width(this.isVertical() ? this.style?.width : null);
            Row.height(this.isVertical() ? null : this.style?.height);
        }, Row);
        this.buildChildren.bind(this)();
        Row.pop();
    }
    buildFlex(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create(FlexManager.flexOptions(ObservedObject.GetRawObject(this.style)));
            Flex.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/Scroller.ets(242:3)");
            Flex.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node, ObservedObject.GetRawObject(this.style)));
            Flex.onClick(shouldBindEvent(this.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.node, e)));
            Flex.onTouch(shouldBindEvent(this.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.node, e)));
            Flex.width(this.isVertical() ? this.style?.width : null);
            Flex.height(this.isVertical() ? null : this.style?.height);
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
            this.forEachUpdateFunction(elmtId, this.children, forEachItemGenFunction, (node: Node) => node.id.toString(), false, false);
        }, ForEach);
        ForEach.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
