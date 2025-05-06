import { HMObject } from "../HMObject";
export interface EventListener {
    onEvent(event: any): any;
}
export declare class EventTarget extends HMObject {
    protected __enventListenerMap__: Map<string, Array<EventListener | Function>>;
    constructor(tag: string, isApi: boolean | undefined, props: any);
    onReceiveEvent(eventName: string, event: any): void;
    protected onHandleReceiveEvent(eventName: string, event: any): any;
    bindEventTarget(): void;
    dispatchEvent(eventName: string, event: any): void;
    addEventListener(eventName: string, eventListener: EventListener | Function, useCapture?: boolean): void;
    private _addEventListener_;
    removeEventListener(eventName: string, eventListener?: EventListener | Function, useCapture?: boolean): void;
    private _removeEventListener_;
}
