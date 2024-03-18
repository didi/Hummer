const { document: _Document } = __Hummer__

import { HummerElement } from "../../HummerElement"

export class List extends HummerElement {


    protected _placeholder: string = "";

    protected _focused: boolean = false;

    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("List", name, { ...props, viewId: id });
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