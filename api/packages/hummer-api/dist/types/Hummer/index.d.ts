import { Element } from "../Element";
import { HummerElement } from "../HummerElement";
export declare class Hummer {
    private static rootElement;
    static initGlobal(): void;
    static render(element: Element): void;
    static createElement(tag: string): HummerElement | undefined;
    static getRootView(): Element | undefined;
}
