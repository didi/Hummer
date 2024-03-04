const { document: _Document } = __Hummer__
const { Hummer: __Hummer } = __GLOBAL__

import { Element } from "../Element"

export class Hummer {


    private static rootElement: Element | undefined = undefined

    public static initGlobal() {

    }

    /**
     * 渲染页面
     * 
     * @param element 页面视图根节点
     */
    public static render(element: Element) {
        Hummer.initGlobal();
        Hummer.rootElement = element;
        _Document.render(element.getThis());
    }


    public static getRootView() {
        return Hummer.rootElement;
    }


}

