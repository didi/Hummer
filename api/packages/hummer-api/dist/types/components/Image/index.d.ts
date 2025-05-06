import { HummerElement } from "../../HummerElement";
import { ImageAttribute } from "./ImageAttribute";
import { HMEvent, ViewEvent } from "../../HummerElement";
import { FlexStyle } from "../../Element";
export interface ImageStyle extends FlexStyle {
    resize?: string;
}
export interface ImageLoadEvent extends HMEvent<number> {
    state: number;
    srcType: number;
}
export declare class Image extends HummerElement {
    private _onLoad?;
    constructor(id?: string, name?: string, props?: any);
    set style(value: ImageStyle | Record<string, any>);
    get style(): ImageStyle | Record<string, any>;
    get src(): string;
    set src(value: string);
    get gifSrc(): string;
    set gifSrc(value: string);
    get gifRepeatCount(): number;
    set gifRepeatCount(value: number);
    get failedImage(): string;
    set failedImage(value: string);
    get placeholder(): string;
    set placeholder(value: string);
    get onLoad(): ((srcType: number, isSuccess: boolean) => void) | Function | undefined;
    set onLoad(value: ((srcType: number, isSuccess: boolean) => void) | Function | undefined);
    protected onImageOnLoad(event: ImageLoadEvent): void;
    load(source: string | ImageAttribute, callback: ((srcType: number, isSuccess: boolean) => void) | Function | undefined): void;
    setAttribute(key: string, value: any): void;
    addEventListener(eventName: string, eventListener: (event: ImageLoadEvent | ViewEvent | any) => void | Function | EventListener, useCapture?: boolean | undefined): void;
}
