import { Element } from "../Element";
import { HummerElement } from "../HummerElement";
import { Env } from "../api/HummerApi";
export declare class Hummer {
    private static rootElement;
    static initGlobal(): void;
    static get Env(): Env;
    static render(element: Element): void;
    static createElement(tag: string): HummerElement | undefined;
    static getRootView(): Element | undefined;
}
