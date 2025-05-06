import { HummerElement } from "../../HummerElement";
import { FlexStyle } from "../../Element";
export interface TextStyle extends FlexStyle {
    color?: string;
    fontStyle?: string;
    fontFamily?: string;
    fontSize?: number | string;
    fontWeight?: string;
    textAlign?: string;
    textVerticalAlign?: string;
    textDecoration?: string;
    textOverflow?: string;
    textLineClamp?: number;
    letterSpacing?: number;
    lineSpacingMulti?: number;
}
export declare class Text extends HummerElement {
    constructor(id?: string, name?: string, props?: any);
    set style(value: TextStyle | Record<string, any>);
    get style(): TextStyle | Record<string, any>;
    get text(): string;
    set text(value: string);
    setElementText(text: string): void;
    get richText(): any;
    set richText(value: any);
    get textCopyEnable(): boolean;
    set textCopyEnable(value: boolean);
}
