interface View_Params {
    builderContext?: ComponentBuilderContext;
    hmContext?: HMContext;
    node?: HMNode;
    props?: ViewPropsWrapper | undefined;
    children?: HMNode[];
}
import { FlexManager, useRelativeContainer } from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/Utils";
import type { HMNode } from '../../Node';
import type { HMContext } from '../../../Context/HMContext';
import commonStyleModifier from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/CommonStyleModifier";
import { componentFactoryBuilder } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/ComponentBuilder";
import type { ComponentBuilderContext } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/ComponentBuilder";
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/EventHandler";
import { TapEventName, TouchEventName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import { ViewPropsWrapper } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/View/ViewPropsWrapper";
export default class View extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.builderContext = undefined;
        this.hmContext = undefined;
        this.node = undefined;
        this.__props = new ObservedPropertyObjectPU(undefined, this, "props");
        this.__children = new ObservedPropertyObjectPU([], this, "children");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: View_Params) {
        if (params.builderContext !== undefined) {
            this.builderContext = params.builderContext;
        }
        if (params.hmContext !== undefined) {
            this.hmContext = params.hmContext;
        }
        if (params.node !== undefined) {
            this.node = params.node;
        }
        if (params.props !== undefined) {
            this.props = params.props;
        }
        if (params.children !== undefined) {
            this.children = params.children;
        }
    }
    updateStateVars(params: View_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__props.purgeDependencyOnElmtId(rmElmtId);
        this.__children.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__props.aboutToBeDeleted();
        this.__children.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private builderContext: ComponentBuilderContext;
    private hmContext: HMContext;
    private node: HMNode;
    private __props: ObservedPropertyObjectPU<ViewPropsWrapper | undefined>;
    get props() {
        return this.__props.get();
    }
    set props(newValue: ViewPropsWrapper | undefined) {
        this.__props.set(newValue);
    }
    private __children: ObservedPropertyObjectPU<HMNode[]>;
    get children() {
        return this.__children.get();
    }
    set children(newValue: HMNode[]) {
        this.__children.set(newValue);
    }
    aboutToAppear(): void {
        this.hmContext = this.builderContext.hmContext;
        this.node = this.builderContext.node;
        this.props = new ViewPropsWrapper(this.node);
        this.children = this.props.child;
        this.props.bindPropsUpdate();
        this.props.onChildUpdate((child: HMNode[]) => {
            this.children = child;
        });
    }
    // hdc
    aboutToDisappear(): void {
        this.props?.dispose();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.hmContext.useYoga) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.debugLine("hummer/src/main/ets/Components/ets/View/View.ets(41:7)");
                        Stack.attributeModifier.bind(this)(commonStyleModifier.setNode(this.props!.node));
                        Stack.onClick(shouldBindEvent(this.props!.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.props!.node, e)));
                        Stack.onTouch(shouldBindEvent(this.props!.node, TapEventName, (e: TouchEvent) => dispatchTouchEvent(this.props!.node, e)));
                    }, Stack);
                    Stack.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        //当父容器为RelativeContainer, 且子组件设置了alignRules属性, 则子组件的position属性不生效。
                        if (useRelativeContainer(this.props?.style)) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    RelativeContainer.create();
                                    RelativeContainer.debugLine("hummer/src/main/ets/Components/ets/View/View.ets(50:9)");
                                    RelativeContainer.hitTestBehavior(HitTestMode.None);
                                    RelativeContainer.width('100%');
                                    RelativeContainer.height('100%');
                                    RelativeContainer.position({ x: 0, y: 0 });
                                }, RelativeContainer);
                                this.buildContent.bind(this)();
                                RelativeContainer.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.buildContent.bind(this)();
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
        }, If);
        If.pop();
    }
    buildContent(parent = null) {
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
    }
    buildColumn(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("hummer/src/main/ets/Components/ets/View/View.ets(76:5)");
            Column.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node, this.props?.style));
            Column.alignItems(FlexManager.convertFlexAlignItemsToColumnOrRow(this.props?.flexDirection, this.props?.alignItems) as HorizontalAlign);
            Column.justifyContent(FlexManager.flexOptions(this.props?.style).justifyContent);
            Column.onClick(shouldBindEvent(this.props!.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.props!.node, e)));
            Column.onTouch(shouldBindEvent(this.props!.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.props!.node, e)));
        }, Column);
        this.buildChildren.bind(this)();
        Column.pop();
    }
    buildRow(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("hummer/src/main/ets/Components/ets/View/View.ets(88:5)");
            Row.alignItems(FlexManager.convertFlexAlignItemsToColumnOrRow(this.props?.flexDirection, this.props?.alignItems) as VerticalAlign);
            Row.justifyContent(FlexManager.flexOptions(this.props?.style).justifyContent);
            Row.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node, this.props?.style));
            Row.onClick(shouldBindEvent(this.props!.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.props!.node, e)));
            Row.onTouch(shouldBindEvent(this.props!.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.props!.node, e)));
        }, Row);
        this.buildChildren.bind(this)();
        Row.pop();
    }
    buildFlex(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create(FlexManager.flexOptions(this.props?.style));
            Flex.debugLine("hummer/src/main/ets/Components/ets/View/View.ets(100:5)");
            Flex.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node, this.props?.style));
            Flex.onClick(shouldBindEvent(this.props!.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.props!.node, e)));
            Flex.onTouch(shouldBindEvent(this.props!.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.props!.node, e)));
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
