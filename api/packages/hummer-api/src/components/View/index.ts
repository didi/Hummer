const { Document: _Document } = __hummer__

import { HummerElement } from "../../HummerElement"

export class View extends HummerElement {


    protected _overflow: string = "visible";

    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string, name: string = "", props: any) {
        super("View", name, { ...props, viewId: id });
    }

    /**
     * 扩展属性
     * 可选值:overflow: 'hidden' | 'visible'
     * 默认值:'visible'
     */
    set overflow(value: string) {
        this._overflow = value;
        this.setAttribute("overflow", value);
    }


    get overflow(): string {
        return this._overflow;
    }

}