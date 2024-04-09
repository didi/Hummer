const { document: _Document_ } = __Hummer__


import { Element } from "../Element"
import { HummerElement } from "../HummerElement"
import { Anchor } from "../components/Anchor"
import { Button } from "../components/Button"
import { Canvas } from "../components/Canvas"
import { View } from "../components/View"
import { Text } from "../components/Text"
import { Image } from "../components/Image"
import { Input } from "../components/Input"
import { List } from "../components/List"
import { ViewPager } from "../components/ViewPager"
import { Scroller } from "../components/Scroller"
import { TextArea } from "../components/TextArea"
import { HummerApi, Env, PageInfo } from "../api/HummerApi"
import { NotifyCenter } from "../api/NotifyCenter"


export class Hummer {

    private static __elementFactor__: Record<string, Function> = {}

    public static get env(): Env {
        return HummerApi.getEnv()
    }

    public static get notifyCenter(): any {
        return NotifyCenter
    }


    public static get pageInfo(): PageInfo {
        return HummerApi.getPageInfo()
    }

    public static set pageResult(param: any) {
        HummerApi.setPageResult(param)
    }

    /**
     * 根据标签名称创建Element实例
     * 
     * 备注：提供给Tenon框架使用
     * @param tag 标签名称
     * @returns 元素实例，如果找不到返回undefined
     */
    public static createElement(tag: string): HummerElement | undefined {
        switch (tag) {
            case "anchor":
                return new Anchor();
            case "view":
                return new View();
            case "text":
                return new Text();
            case "image":
                return new Image();
            case "button":
                return new Button();
            case "canvas":
                return new Canvas();
            case "list":
                return new List();
            case "viewpager":
                return new ViewPager();
            case "scroller":
                return new Scroller();
            case "input":
                return new Input();
            case "textarea":
                return new TextArea();
        }
        return Hummer.createElementFromFactor(tag);
    }

    /**
     * 创建注册的组件
     * 
     * @param tag 
     * @returns 
     */
    public static createElementFromFactor(tag: string): HummerElement | undefined {
        let factor = Hummer.__elementFactor__[tag];
        if (factor) {
            return factor();
        }
        return undefined;
    }

    /**
     * 注册组件
     * 
     * @param tag 
     * @param factor 
     */
    public static register(tag: string, factor: () => HummerElement) {
        Hummer.__elementFactor__[tag] = factor;
    }

    /**
     * 渲染页面
     * 
     * @param element 页面视图根节点
     */
    public static render(element: Element) {
        HummerApi.rootElement = element;
        _Document_.render(element.getThis());
    }


    /**
     * 获取当前页面根节点视图元素
     * 
     * @returns 返回元素实例
     */
    public static getRootView() {
        return HummerApi.rootElement;
    }


}

