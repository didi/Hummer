interface HMButton_Params {
    builderContext?: ComponentBuilderContext;
    hmContext?: HMContext;
    node?: Node;
    style?: IHummerButtonStyle | undefined;
    attributes?: AttributesType | undefined;
    text?: string | undefined;
}
import { MutationType } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Node";
import type { AttributesType, Node } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Node";
import type { HMContext } from '../../Context/HMContext';
import { CommonStyleModifier } from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/CommonStyleModifier";
import type { ComponentBuilderContext } from './ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/EventHandler";
import { TapEventName, TouchEventName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import type { IHummerButtonStyle } from '../../Style/IHummerStyle';
import { getVP } from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/Utils";
class ButtonStyleModfier extends CommonStyleModifier {
    // 暂只实现按压和禁用状态下的 字体颜色&背景色 设置
    // todo 按压后存在默认样式，背景是蓝色，需要确认下是否是鸿蒙问题？
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
export default class HMButton extends ViewPU {
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
        this.__text = new ObservedPropertyObjectPU(undefined, this, "text");
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
        if (params.style !== undefined) {
            this.style = params.style;
        }
        if (params.attributes !== undefined) {
            this.attributes = params.attributes;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
    }
    updateStateVars(params: HMButton_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__style.purgeDependencyOnElmtId(rmElmtId);
        this.__attributes.purgeDependencyOnElmtId(rmElmtId);
        this.__text.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__style.aboutToBeDeleted();
        this.__attributes.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private builderContext: ComponentBuilderContext;
    private hmContext: HMContext;
    private node: Node;
    private __style: ObservedPropertyObjectPU<IHummerButtonStyle | undefined>;
    get style() {
        return this.__style.get();
    }
    set style(newValue: IHummerButtonStyle | undefined) {
        this.__style.set(newValue);
    }
    private __attributes: ObservedPropertyObjectPU<AttributesType | undefined>;
    get attributes() {
        return this.__attributes.get();
    }
    set attributes(newValue: AttributesType | undefined) {
        this.__attributes.set(newValue);
    }
    private __text: ObservedPropertyObjectPU<string | undefined>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string | undefined) {
        this.__text.set(newValue);
    }
    aboutToAppear(): void {
        this.hmContext = this.builderContext.hmContext;
        this.node = this.builderContext.node;
        this.style = this.node.style as IHummerButtonStyle;
        this.attributes = this.node.attributes;
        this.text = this.attributes.text || '';
        this.node.registerUpdateFunc(MutationType.Style, (style: IHummerButtonStyle) => {
            this.style = style;
        }).registerUpdateFunc(MutationType.Attribute, (attributes: AttributesType) => {
            this.attributes = attributes;
            this.text = this.attributes.text || '';
        });
    }
    aboutToDisappear(): void {
        this.node.unregisterAllUpdateFuncs();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.text, {
                stateEffect: true,
                type: ButtonType.Normal,
                buttonStyle: ButtonStyleMode.NORMAL,
                controlSize: ControlSize.NORMAL
            });
            Button.debugLine("hummer/src/main/ets/Components/ets/Button.ets(66:5)");
            Button.enabled(this.attributes?.enable === false ? false : true);
            Button.padding(0);
            Button.fontColor(this.style?.color || '#000000');
            Button.fontSize(getVP(this.style?.fontSize || 16));
            Button.fontFamily(this.style?.fontFamily || 'HarmonyOS Sans');
            Button.attributeModifier.bind(this)(buttonStyleModfier.setNode(this.node));
            Button.onClick(shouldBindEvent(this.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.node, e)));
            Button.onTouch(shouldBindEvent(this.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.node, e)));
        }, Button);
        Button.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
