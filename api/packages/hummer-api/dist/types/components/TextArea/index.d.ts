import { HummerElement } from "../../HummerElement";
import { FlexStyle } from "../../Element";
export interface TextAreaStyle extends FlexStyle {
    type?: string;
    color?: string;
    placeholderColor?: string;
    cursorColor?: string;
    textAlign?: string;
    fontFamily?: string;
    fontSize?: number | string;
    maxLength?: number;
    returnKeyType?: string;
    textLineClamp?: number;
}
export declare class TextArea extends HummerElement {
    constructor(id?: string, name?: string, props?: any);
    set style(value: TextAreaStyle | Record<string, any>);
    get style(): TextAreaStyle | Record<string, any>;
    get text(): string;
    set text(value: string);
    get placeholder(): string;
    set placeholder(value: string);
    get focused(): boolean;
    set focused(value: boolean);
}
