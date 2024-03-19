const { document: _Document } = __Hummer__

import { HummerElement } from "../../HummerElement"

export class View extends HummerElement {


    /**
     * 构造方法
     * 
     * @param id 
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("View", name, { ...props, viewId: id });
        //设置默认属性值
        this._initAttributes({
            overflow: 'visible'
        });
    }

    /**
     * 扩展属性
     * 可选值:overflow: 'hidden' | 'visible'
     * 默认值:'visible'
     */
    set overflow(value: string) {
        this._setAttribute("overflow", value);
    }


    get overflow(): string {
        return this._getAttribute('overflow');
    }

}