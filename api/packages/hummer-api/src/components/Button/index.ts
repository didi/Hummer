const { document: _Document } = __Hummer__

import { HummerElement } from "../../HummerElement"

export class Button extends HummerElement {


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
        return this._getAttribute("text")
    }

    set text(value: string) {
        this._setAttribute("text", value);
    }

    /**
     * 按压状态下的样式
     */
    get pressed() {
        return this._getAttribute("pressed")
    }

    set pressed(value: object) {
        this._setAttribute("pressed", value);
    }


    /**
     * 禁用状态下的样式
     */
    override get disabled() {
        return this._getAttribute("disabled")
    }

    override set disabled(value:  Boolean | Object) {
        if(typeof value === "boolean"){
            super.disabled = value
        }else{
            this._setAttribute("disabled", value);
        }
    }




}