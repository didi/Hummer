import { Element } from "../Element";
import { HummerElement } from "../HummerElement";
import { Env, PageInfo } from "../module/HummerApi";
export declare class Hummer {
    private static __elementFactor__;
    static get env(): Env;
    static get notifyCenter(): any;
    static get pageInfo(): PageInfo;
    static set pageResult(param: any);
    static createElement(tag: string): HummerElement | undefined;
    static createElementFromFactor(tag: string): HummerElement | undefined;
    static register(tag: string, factor: () => HummerElement): void;
    static render(element: Element): void;
    static getRootView(): Element | undefined;
}
