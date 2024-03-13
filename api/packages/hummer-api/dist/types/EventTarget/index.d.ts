import { HMObject } from "../HMObject";
export interface EventLisener {
    onEvent(event: any): any;
}
export declare class EventTarget extends HMObject {
    protected envents: Map<string, Array<EventLisener | Function>>;
    constructor(tag: string, isApi: boolean | undefined, props: any);
    onRecieveEvent(eventName: string, event: any): void;
    protected onHandleRecieveEvent(eventName: string, event: any): any;
    bindEventTarget(): void;
    dispatchEvent(eventName: string, event: any): void;
    addEventListener(eventName: string, eventLisener: EventLisener | Function, useCapture?: boolean): void;
    private _addEventListener;
    removeEventListener(eventName: string, eventLisener: EventLisener | Function, useCapture?: boolean): void;
    private _removeEventListener;
}
