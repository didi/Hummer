const { document: _Document_ } = __Hummer__


import { Element } from "../Element"
import { HummerElement } from "../HummerElement"
import { View } from "../components/View"
import { Text } from "../components/Text"
import { Image } from "../components/Image"
import { Input } from "../components/Input"
import { TextArea } from "../components/TextArea"
import { HummerApi, Env, PageInfo } from "../api/HummerApi"
import { NotifyCenter } from "../api/NotifyCenter"

export class Hummer {


    private static rootElement: Element | undefined = undefined
  

    public static initGlobal() {

    }

    public static get env(): Env {
        return HummerApi.getEnv()
    }

    public static get notifyCenter(): any {
        return  NotifyCenter
    }


    public static get pageInfo(): PageInfo {
        return HummerApi.getPageInfo()
    }
    
    public static set pageResult(param: any) {
        HummerApi.setPageResult(param)
    }
    


    /**
     * 渲染页面
     * 
     * @param element 页面视图根节点
     */
    public static render(element: Element) {
        Hummer.initGlobal();
        Hummer.rootElement = element;
        _Document_.render(element.getThis());
    }


    public static createElement(tag: string): HummerElement | undefined {
        switch (tag) {
            case "view":
                return new View();
            case "text":
                return new Text();
            case "image":
                return new Image();
            case "input":
                return new Input();
            case "textarea":
                return new TextArea();
        }
        return undefined;
    }


    public static getRootView() {
        return Hummer.rootElement;
    }


}

