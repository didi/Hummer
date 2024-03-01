const { Document: _Document } = __hummer__

import { Element } from "../Element"

export class Document {



    /**
     * 渲染页面
     * 
     * @param element 页面视图根节点
     */
    public static render(element: Element) {
        _Document.render(element)
    }


}

