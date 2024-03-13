import { HummerElement } from "../../HummerElement";
import { ImageStyle } from "./ImageStyle";
export declare class Image extends HummerElement {
    protected _src: string;
    protected _gifSrc: string;
    protected _gifRepeatCount: number;
    constructor(id?: string, name?: string, props?: any);
    get src(): string;
    set src(value: string);
    get gifSrc(): string;
    set gifSrc(value: string);
    get gifRepeatCount(): number;
    set gifRepeatCount(value: number);
    load(src: string | ImageStyle, listener: Function): void;
}
