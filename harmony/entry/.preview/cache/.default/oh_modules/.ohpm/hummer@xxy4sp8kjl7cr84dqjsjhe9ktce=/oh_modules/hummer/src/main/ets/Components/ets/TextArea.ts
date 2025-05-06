interface HMTextArea_Params {
    builderContext?: ComponentBuilderContext;
    hmContext?: HMContext;
    node?: Node;
    style?: IHummerTextInputStyle | undefined;
    attributes?: AttributesType | undefined;
    text?: string;
    placeholder?: ResourceStr | undefined;
    focused?: boolean;
    controller?: TextAreaController;
}
import { MutationType } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Node";
import type { AttributesType, Node } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Node";
import type { HMContext } from '../../Context/HMContext';
import commonStyleModifier from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/AttributeModifiers/CommonStyleModifier";
import type { ComponentBuilderContext } from './ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, dispatchChangeEvent, shouldBindEvent } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/ets/EventHandler";
import { TouchEventName, TapEventName, FocusEventName, BlurEventName, ChangeEventName, SubmitEventName } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Event";
import type { IHummerTextInputStyle } from '../../Style/IHummerStyle';
import { getTextAlign, getMaxLength } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/AttributeModifiers/Utils";
// type映射
const TYPE = {
    "default": InputType.Normal,
    "password": InputType.Password,
    "email": InputType.Email,
    "number": InputType.Number,
    "tel": InputType.PhoneNumber,
    "username": InputType.USER_NAME,
    "new_password": InputType.NEW_PASSWORD,
    "number_password": InputType.NUMBER_PASSWORD,
    "number_decimal": InputType.NUMBER_DECIMAL,
} as Record<string, number>;
// enterKeyType映射
const ENTERKEYTYPE = {
    "go": EnterKeyType.Go,
    "done": EnterKeyType.Done,
    "next": EnterKeyType.Next,
    "search": EnterKeyType.Search,
    "send": EnterKeyType.Send
} as Record<string, number>;
export default class HMTextArea extends ViewPU {
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
        this.text = '';
        this.__placeholder = new ObservedPropertyObjectPU("请输入", this, "placeholder");
        this.__focused = new ObservedPropertySimplePU(false, this, "focused");
        this.controller = new TextAreaController();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: HMTextArea_Params) {
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
        if (params.placeholder !== undefined) {
            this.placeholder = params.placeholder;
        }
        if (params.focused !== undefined) {
            this.focused = params.focused;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: HMTextArea_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__style.purgeDependencyOnElmtId(rmElmtId);
        this.__attributes.purgeDependencyOnElmtId(rmElmtId);
        this.__placeholder.purgeDependencyOnElmtId(rmElmtId);
        this.__focused.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__style.aboutToBeDeleted();
        this.__attributes.aboutToBeDeleted();
        this.__placeholder.aboutToBeDeleted();
        this.__focused.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private builderContext: ComponentBuilderContext;
    private hmContext: HMContext;
    private node: Node;
    private __style: ObservedPropertyObjectPU<IHummerTextInputStyle | undefined>;
    get style() {
        return this.__style.get();
    }
    set style(newValue: IHummerTextInputStyle | undefined) {
        this.__style.set(newValue);
    }
    private __attributes: ObservedPropertyObjectPU<AttributesType | undefined>;
    get attributes() {
        return this.__attributes.get();
    }
    set attributes(newValue: AttributesType | undefined) {
        this.__attributes.set(newValue);
    }
    private text: string; // 输入框绑定的值
    private __placeholder: ObservedPropertyObjectPU<ResourceStr | undefined>; // placeholder
    get placeholder() {
        return this.__placeholder.get();
    }
    set placeholder(newValue: ResourceStr | undefined) {
        this.__placeholder.set(newValue);
    }
    private __focused: ObservedPropertySimplePU<boolean>;
    get focused() {
        return this.__focused.get();
    }
    set focused(newValue: boolean) {
        this.__focused.set(newValue);
    }
    private controller: TextAreaController;
    aboutToAppear(): void {
        this.hmContext = this.builderContext.hmContext;
        this.node = this.builderContext.node;
        this.style = this.node.style as IHummerTextInputStyle;
        this.attributes = this.node.attributes;
        this.placeholder = this.attributes?.placeholder;
        this.text = this.attributes?.text;
        this.focused = this.attributes?.focused;
        this.node.registerUpdateFunc(MutationType.Style, (style: IHummerTextInputStyle) => {
            this.style = style;
        }).registerUpdateFunc(MutationType.Attribute, (attributes: AttributesType) => {
            this.attributes = attributes;
        });
    }
    aboutToDisappear(): void {
        this.node.unregisterAllUpdateFuncs();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ text: this.text, placeholder: this.placeholder, controller: this.controller });
            TextArea.debugLine("oh_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/oh_modules/hummer/src/main/ets/Components/ets/TextArea.ets(67:5)");
            TextArea.padding(0);
            TextArea.borderRadius(0);
            TextArea.type(TYPE[this.style?.type || 'default']);
            TextArea.maxLength(getMaxLength(this.style?.maxLength || 0));
            TextArea.enterKeyType(ENTERKEYTYPE[this.style?.returnKeyType || 'done']);
            TextArea.textAlign(getTextAlign(this.style?.textAlign || 'left'));
            TextArea.placeholderColor(this.style?.placeholderColor || '#999999');
            TextArea.caretColor(this.style?.cursorColor || '#007AFF');
            TextArea.fontSize(this.style?.fontSize || 16);
            TextArea.fontColor(this.style?.color || '#000000');
            TextArea.fontFamily(this.style?.fontFamily || 'New Times Roma');
            TextArea.maxLines(this.style?.textLineClamp || 6);
            TextArea.defaultFocus(this.focused || false);
            TextArea.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node));
            TextArea.onChange(shouldBindEvent(this.node, [ChangeEventName, BlurEventName, FocusEventName, SubmitEventName], (e: string) => {
                this.text = e;
                if (this.node?.eventListeners.has(ChangeEventName)) {
                    dispatchChangeEvent(this.node, e);
                }
            }));
            TextArea.onSubmit(shouldBindEvent(this.node, ChangeEventName, (enterKey: EnterKeyType, event: SubmitEvent) => dispatchChangeEvent(this.node, event?.text, SubmitEventName)));
            TextArea.onFocus(shouldBindEvent(this.node, ChangeEventName, () => dispatchChangeEvent(this.node, this.text, FocusEventName)));
            TextArea.onBlur(shouldBindEvent(this.node, ChangeEventName, () => dispatchChangeEvent(this.node, this.text, BlurEventName)));
            TextArea.onClick(shouldBindEvent(this.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.node, e)));
            TextArea.onTouch(shouldBindEvent(this.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.node, e)));
        }, TextArea);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
