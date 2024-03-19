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
    get pressed() {
        return this._pressed;
    }

    set pressed(value: object) {
        this._pressed = value;
        this._setAttribute("pressed", value);
    }


    /**
     * 禁用状态下的样式
     */
    override get disabled() {
        return this._disabled;
    }

    override set disabled(value:  Boolean | Object) {
        if(typeof value === "boolean"){
            super.disabled = value
        }else{
            this._disabled = value;
            this._setAttribute("disabled", value);
        }
    }




}