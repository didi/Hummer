const { document: _Document } = __Hummer__

import { HummerElement } from "../../HummerElement"

export class Button extends HummerElement {

    protected _text: string = "";

    protected _pressed: object = {};

    protected _disabled: object = {};

    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Button", name, { ...props, viewId: id });
    }


    /**
     * 按钮文案
     */
    get text() {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
        this._setAttribute("text", value);
    }

    /**
     * 按压状态下的样式
     */
    get pressedStyle() {
        return this._pressed;
    }

    set pressedStyle(value: object) {
        this._pressed = value;
        this._setAttribute("pressedStyle", value);
    }


    /**
     * 禁用状态下的样式
     */
    get disabledStyle() {
        return this._disabled;
    }

    set disabledStyle(value: object) {
        this._disabled = value;
        this._setAttribute("disabledStyle", value);
    }




}