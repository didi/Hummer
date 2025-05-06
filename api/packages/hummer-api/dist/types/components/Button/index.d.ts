import { HummerElement } from "../../HummerElement";
import { FlexStyle } from "../../Element";
export interface ButtonStyle extends FlexStyle {
    color?: string;
    fontFamily?: string;
    fontSize?: number | string;
    textAlign?: string;
}
export declare class Button extends HummerElement {
    constructor(id?: string, name?: string, props?: any);
    set style(value: ButtonStyle | Record<string, any>);
    get style(): ButtonStyle | Record<string, any>;
    get text(): string;
    set text(value: string);
    get pressed(): object;
    set pressed(value: object);
    setElementText(text: string): void;
    get disabled(): Boolean | Record<string, any>;
    set disabled(value: Boolean | Record<string, any>);
    setAttribute(key: string, value: any): void;
}
