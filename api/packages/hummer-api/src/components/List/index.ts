const { document: _Document } = __Hummer__

import { HummerElement } from "../../HummerElement"

export class List extends HummerElement {


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