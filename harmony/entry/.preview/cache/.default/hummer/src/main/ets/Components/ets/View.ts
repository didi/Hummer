interface View_Params {
    builderContext?: ComponentBuilderContext;
    hmContext?: HMContext;
    node?: Node;
    useYogaLayout?: Boolean;
    children?: Node[];
    style?: IHummerStyle;
    attributes?: AttributesType | undefined;
}
import { FlexManager } from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/Utils";
import { MutationType } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Node";
import type { AttributesType, Node } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Node";
import type { HMContext } from '../../Context/HMContext';
import commonStyleModifier from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/CommonStyleModifier";
import { componentFactoryBuilder } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/ComponentBuilder";
import type { ComponentBuilderContext } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/ComponentBuilder";
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/EventHandler";
import { TapEventName, TouchEventName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import type { IHummerStyle } from '../../Style/IHummerStyle';
class ViewProps {
}
export default class View extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.builderContext = undefined;
        this.hmContext = undefined;
        this.node = undefined;
        this.__useYogaLayout = new ObservedPropertyObjectPU(false, this, "useYogaLayout");
        this.__children = new ObservedPropertyObjectPU([], this, "children");
        this.__style = new ObservedPropertyObjectPU({}, this, "style");
        this.__attributes = new ObservedPropertyObjectPU(undefined, this, "attributes");
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
    updateStateVars(params: View_Params) {
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
    private hmContext: HMContext;
    private node: Node;
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
    private __style: ObservedPropertyObjectPU<IHummerStyle>;
    get style() {
        return this.__style.get();
    }
    set style(newValue: IHummerStyle) {
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
    }
    // hdc
    aboutToDisappear(): void {
        this.node.unregisterAllUpdateFuncs();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.hmContext.useYoga) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.debugLine("hummer/src/main/ets/Components/ets/View.ets(54:7)");
                        Stack.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node));
                        Stack.onClick(shouldBindEvent(this.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.node, e)));
                        Stack.onTouch(shouldBindEvent(this.node, TapEventName, (e: TouchEvent) => dispatchTouchEvent(this.node, e)));
                    }, Stack);
                    Stack.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
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
                });
            }
        }, If);
        If.pop();
    }
    buildColumn(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("hummer/src/main/ets/Components/ets/View.ets(74:5)");
            Column.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node, ObservedObject.GetRawObject(this.style)));
            Column.alignItems(FlexManager.convertFlexAlignItemsToColumnOrRow(this.style?.flexDirection, this.style?.alignItems) as HorizontalAlign);
            Column.justifyContent(FlexManager.flexOptions(ObservedObject.GetRawObject(this.style)).justifyContent);
            Column.onClick(shouldBindEvent(this.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.node, e)));
            Column.onTouch(shouldBindEvent(this.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.node, e)));
        }, Column);
        this.buildChildren.bind(this)();
        Column.pop();
    }
    buildRow(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("hummer/src/main/ets/Components/ets/View.ets(86:5)");
            Row.alignItems(FlexManager.convertFlexAlignItemsToColumnOrRow(this.style?.flexDirection, this.style?.alignItems) as VerticalAlign);
            Row.justifyContent(FlexManager.flexOptions(ObservedObject.GetRawObject(this.style)).justifyContent);
            Row.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node, ObservedObject.GetRawObject(this.style)));
            Row.onClick(shouldBindEvent(this.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.node, e)));
            Row.onTouch(shouldBindEvent(this.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.node, e)));
        }, Row);
        this.buildChildren.bind(this)();
        Row.pop();
    }
    buildFlex(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create(FlexManager.flexOptions(ObservedObject.GetRawObject(this.style)));
            Flex.debugLine("hummer/src/main/ets/Components/ets/View.ets(98:5)");
            Flex.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node, ObservedObject.GetRawObject(this.style)));
            Flex.onClick(shouldBindEvent(this.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.node, e)));
            Flex.onTouch(shouldBindEvent(this.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.node, e)));
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
