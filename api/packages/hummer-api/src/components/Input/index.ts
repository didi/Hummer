const { document: _Document } = __Hummer__

import { HummerElement } from "../../HummerElement"

export class Input extends HummerElement {

    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Input", name, { ...props, viewId: id });
    }


    /**
     * 默认输入内容
     */
    get text() {
        return this._getAttribute("text")
    }

    set text(value: string) {
        this._setAttribute("text", value);
    }

    /**
     * placeholder内容
     */
    get placeholder() {
        return this._getAttribute("placeholder")
    }

    set placeholder(value: string) {
        this._setAttribute("placeholder", value);
    }


    /**
     * 是否处于激活状态
     */
    get focused() {
        return this._getAttribute("focused")
    }

    set focused(value: boolean) {
        this._setAttribute("focused", value);
    }


}