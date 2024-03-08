const { document: _Document } = __Hummer__
// const { Hummer: _Hummer } = __GLOBAL__

import { Element } from "../Element"
import { HummerElement } from "../HummerElement"
import { View } from "../components/View"
import { Text } from "../components/Text"
import { Image } from "../components/Image"

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


    public static createElement(tag: string): HummerElement | undefined {
        switch (tag) {
            case "view":
                return new View();
            case "text":
                return new Text();
            case "image":
                return new Image();
        }
        return undefined;
    }


    public static getRootView() {
        return Hummer.rootElement;
    }


}

