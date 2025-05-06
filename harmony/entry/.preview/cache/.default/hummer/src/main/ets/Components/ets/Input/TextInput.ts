interface HMTextInput_Params {
    builderContext?: ComponentBuilderContext;
    hmContext?: HMContext;
    node?: HMNode;
    props?: InputPropsWrapper | undefined;
    text?: string;
    focused?: boolean;
    controller?: TextInputController;
}
import type { HMNode } from '../../Node';
import type { HMContext } from '../../../Context/HMContext';
import commonStyleModifier from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/CommonStyleModifier";
import type { ComponentBuilderContext } from '../ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/EventHandler";
import { TouchEventName, TapEventName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import { getTextAlign } from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/Utils";
import { InputPropsWrapper } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/Input/InputPropsWrapper";
import { dispatchInputEvent, InputEventName, InputEventState } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/Input/Event";
import { isUndefined } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/is";
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
export default class HMTextInput extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.builderContext = undefined;
        this.hmContext = undefined;
        this.node = undefined;
        this.__props = new ObservedPropertyObjectPU(undefined, this, "props");
        this.text = '';
        this.focused = false;
        this.controller = new TextInputController();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: HMTextInput_Params) {
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
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.focused !== undefined) {
            this.focused = params.focused;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: HMTextInput_Params) {
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
    private __props: ObservedPropertyObjectPU<InputPropsWrapper | undefined>;
    get props() {
        return this.__props.get();
    }
    set props(newValue: InputPropsWrapper | undefined) {
        this.__props.set(newValue);
    }
    private text: string; // 输入框绑定的值
    private focused: boolean;
    private controller: TextInputController;
    aboutToAppear(): void {
        this.hmContext = this.builderContext.hmContext;
        this.node = this.builderContext.node;
        this.props = new InputPropsWrapper(this.node);
        this.text = this.props?.text;
        this.focused = this.props?.focused;
        this.props.bindPropsUpdate(() => {
            this.updateFocus();
        });
    }
    updateFocus() {
        if (isUndefined(this.props?.attrFocused)) {
            return;
        }
        if (this.props?.focused) {
            focusControl.requestFocus(this.node.uniqueId);
        }
        else {
            this.controller.stopEditing();
        }
        this.focused = this.props!.focused;
    }
    aboutToDisappear(): void {
        this.props?.dispose();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.text, placeholder: this.props?.placeholder, controller: this.controller });
            TextInput.debugLine("hummer/src/main/ets/Components/ets/Input/TextInput.ets(77:5)");
            TextInput.padding(0);
            TextInput.borderRadius(0);
            TextInput.type(TYPE[this.props!.keyboardType]);
            TextInput.maxLength(this.props?.maxLength);
            TextInput.enterKeyType(ENTERKEYTYPE[this.props!.returnKeyType]);
            TextInput.textAlign(getTextAlign(this.props?.textAlign));
            TextInput.placeholderColor(this.props?.placeholderColor);
            TextInput.caretColor(this.props?.cursorColor);
            TextInput.fontSize(this.props?.fontSize);
            TextInput.fontColor(this.props?.color);
            TextInput.fontFamily(this.props?.fontFamily);
            TextInput.defaultFocus(this.focused);
            TextInput.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node));
            TextInput.onChange(shouldBindEvent(this.node, [InputEventName], (e: string) => {
                this.text = e;
                if (this.node?.eventListeners.has(InputEventName)) {
                    dispatchInputEvent(this.node, InputEventState.changed, e);
                }
            }));
            TextInput.onSubmit(shouldBindEvent(this.node, InputEventName, (enterKey: EnterKeyType, event: SubmitEvent) => dispatchInputEvent(this.node, InputEventState.confirmed, event?.text)));
            TextInput.onFocus(shouldBindEvent(this.node, InputEventName, () => {
                this.focused = true;
                dispatchInputEvent(this.node, InputEventState.began, this.text);
            }));
            TextInput.onBlur(shouldBindEvent(this.node, InputEventName, () => {
                this.focused = false;
                dispatchInputEvent(this.node, InputEventState.ended, this.text);
            }));
            TextInput.onClick(shouldBindEvent(this.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.node, e)));
            TextInput.onTouch(shouldBindEvent(this.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.node, e)));
        }, TextInput);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
