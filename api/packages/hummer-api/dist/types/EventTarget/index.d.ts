import { HMObject } from "src/HMObject";
export interface EventLisener {
    onEvent(event: any): any;
}
export declare class EventTarget extends HMObject {
    protected envents: Map<string, Array<EventLisener>>;
    constructor(tag: string, isApi: boolean | undefined, props: any);
    onRecieveEvent(event: any): void;
    protected onHandleRecieveEvent(event: any): any;
    bindEventTarget(): void;
    dispatchEvent(eventName: string, event: any): void;
    addEventListener(eventName: string, eventLisener: EventLisener, useCapture: boolean): void;
    removeEventListener(eventName: string, eventLisener: EventLisener, useCapture: boolean): void;
}
