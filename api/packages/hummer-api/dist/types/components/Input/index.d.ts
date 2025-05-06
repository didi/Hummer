import { EventListener } from "../../EventTarget";
import { HummerElement } from "../../HummerElement";
import { HMEvent, ViewEvent } from "../../HummerElement";
import { FlexStyle } from "../../Element";
export interface InputStyle extends FlexStyle {
    type?: string;
    color?: string;
    placeholderColor?: string;
    cursorColor?: string;
    textAlign?: string;
    fontFamily?: string;
    fontSize?: number | string;
    maxLength?: number;
    returnKeyType?: string;
}
export interface InputEvent extends HMEvent<number> {
    state: number;
    text: string;
}
export declare class Input extends HummerElement {
    constructor(id?: string, name?: string, props?: any);
    set style(value: InputStyle | Record<string, any>);
    get style(): InputStyle | Record<string, any>;
    get text(): string;
    set text(value: string);
    get placeholder(): string;
    set placeholder(value: string);
    get focused(): boolean;
    set focused(value: boolean);
    addEventListener(eventName: string, eventListener: (event: InputEvent | ViewEvent | any) => void | Function | EventListener, useCapture?: boolean | undefined): void;
}
