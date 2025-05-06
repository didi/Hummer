import { EventListener } from "src/EventTarget";
import { FlexStyle, Element } from "../Element";
export interface HMEvent<T> {
    type?: string;
    state: T;
    timestamp?: number;
}
export interface TouchEvent extends HMEvent<number> {
    state: number;
    position?: object;
}
export interface TapEvent extends HMEvent<number> {
    state: number;
    position?: object;
}
export interface LongPressEvent extends HMEvent<number> {
    state: number;
    position?: object;
}
export interface PanEvent extends HMEvent<number> {
    state: number;
    translation?: object;
}
export interface SwipeEvent extends HMEvent<number> {
    state: number;
    direction?: number;
}
export interface PinchEvent extends HMEvent<number> {
    state: number;
    scale?: number;
}
export type ViewEvent = TouchEvent | TapEvent | LongPressEvent | PanEvent | SwipeEvent | PinchEvent;
export declare class HummerElement extends Element {
    __scopedIds: Set<string>;
    __NAME: Symbol | null;
    __view_id: number;
    dataset: any;
    viewId: string;
    protected __defaultStyle: Record<string, string> | null;
    protected __style: Record<string, string> | null;
    protected __baseStyle: Record<string, string> | null;
    protected __propsVue__: Map<any, any>;
    private globalProxy;
    constructor(tag: string, name: string | undefined, props: any);
    protected initialize(): void;
    private getProxy;
    get enabled(): boolean;
    set enabled(enabled: boolean);
    get disabled(): Boolean | Record<string, any>;
    set disabled(disabled: Boolean | Record<string, any>);
    get className(): any;
    get style(): FlexStyle | Record<string, any>;
    set style(value: FlexStyle | Record<string, any>);
    protected setStyle(value: FlexStyle | Record<string, any>, flag?: boolean): void;
    protected onDestoryed(): void;
    superSetStyle(value: FlexStyle | object, flag?: boolean): void;
    setScopeId(id: string): void;
    updateStyle(): void;
    updateClassStyle(className: string): void;
    handleAnimation(animation: any): void;
    setAnimation(animation: any): void;
    setElementText(text: string): void;
    getAttribute(key: string): any;
    setAttribute(key: string, value: any): void;
    empty(): void;
    get props(): Map<any, any>;
    private setCacheProp;
    protected onHandleReceiveEvent(eventName: string, event: any): any;
    addEventListener(eventName: string, eventListener: (event: TouchEvent | TapEvent | LongPressEvent | PanEvent | SwipeEvent | PinchEvent | any) => void | Function | EventListener, useCapture?: boolean | undefined): void;
    getElementById(id: string): HummerElement | undefined;
    findElementById(id: string): HummerElement | undefined;
}
