interface HMButton_Params {
    builderContext?: ComponentBuilderContext;
    hmContext?: HMContext;
    node?: HMNode;
    props?: ButtonPropsWrapper | undefined;
}
import type { HMNode } from '../../Node';
import type { HMContext } from '../../../Context/HMContext';
import { CommonStyleModifier } from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/CommonStyleModifier";
import type { ComponentBuilderContext } from '../ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/EventHandler";
import { TapEventName, TouchEventName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import { ButtonPropsWrapper } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/Button/ButtonPropsWrapper";
class ButtonStyleModfier extends CommonStyleModifier {
    // 暂只实现按压和禁用状态下的 字体颜色&背景色 设置
    applyPressedAttribute(instance: ButtonAttribute) {
        if (this.node?.attributes?.pressed?.backgroundColor) {
            instance.backgroundColor(this.node.attributes.pressed.backgroundColor);
        }
        if (this.node?.attributes?.pressed?.color) {
            instance.fontColor(this.node.attributes.pressed.color);
        }
    }
    applyDisabledAttribute(instance: ButtonAttribute) {
        if (this.node?.attributes?.disabled?.backgroundColor) {
            instance.backgroundColor(this.node.attributes.disabled.backgroundColor);
        }
        if (this.node?.attributes?.disabled?.color) {
            instance.fontColor(this.node.attributes.disabled.color);
        }
    }
}
const buttonStyleModfier = new ButtonStyleModfier();
function getTextAlign(textAlign?: string): number | undefined {
    if (textAlign == 'left') {
        return Alignment.Start;
    }
    else if (textAlign == 'center') {
        return Alignment.Center;
    }
    else if (textAlign == 'right') {
        return Alignment.End;
    }
    return undefined;
}
export default class HMButton extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.builderContext = undefined;
        this.hmContext = undefined;
        this.node = undefined;
        this.__props = new ObservedPropertyObjectPU(undefined, this, "props");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: HMButton_Params) {
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
    }
    updateStateVars(params: HMButton_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__props.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__props.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private builderContext: ComponentBuilderContext;
    private hmContext: HMContext;
    private node: HMNode;
    private __props: ObservedPropertyObjectPU<ButtonPropsWrapper | undefined>;
    get props() {
        return this.__props.get();
    }
    set props(newValue: ButtonPropsWrapper | undefined) {
        this.__props.set(newValue);
    }
    aboutToAppear(): void {
        this.hmContext = this.builderContext.hmContext;
        this.node = this.builderContext.node;
        this.props = new ButtonPropsWrapper(this.node);
        this.props.bindPropsUpdate();
    }
    aboutToDisappear(): void {
        this.props?.dispose();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.props?.text, {
                stateEffect: true,
                type: ButtonType.Normal,
                controlSize: ControlSize.NORMAL
            });
            Button.debugLine("hummer/src/main/ets/Components/ets/Button/Button.ets(69:5)");
            Button.padding(0);
            Button.fontColor(this.props?.color);
            Button.fontSize(this.props?.fontSize);
            Button.fontFamily(this.props?.fontFamily);
            Button.attributeModifier.bind(this)(buttonStyleModfier.setNode(this.node));
            Button.enabled(this.props?.enable);
            Button.align(getTextAlign(this.props?.textAlign));
            Button.onClick(shouldBindEvent(this.props!.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.props!.node, e)));
            Button.onTouch(shouldBindEvent(this.props!.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.props!.node, e)));
        }, Button);
        Button.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
