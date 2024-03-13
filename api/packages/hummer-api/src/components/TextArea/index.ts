const { document: _Document } = __Hummer__

import { HummerElement } from "../../HummerElement"

export class TextArea extends HummerElement {

    protected _text: string = "";

    protected _placeholder: string = "";

    protected _focused: boolean = false;

    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("TextArea", name, { ...props, viewId: id });
    }


    /**
     * 默认输入内容
     */
    get text() {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
        this._setAttribute("text", value);
    }

    /**
     * placeholder内容
     */
    get placeholder() {
        return this._placeholder;
    }

    set placeholder(value: string) {
        this._placeholder = value;
        this._setAttribute("placeholder", value);
    }


    /**
     * 是否处于激活状态
     */
    get focused() {
        return this._focused;
    }

    set focused(value: boolean) {
        this._focused = value;
        this._setAttribute("focused", value);
    }




}