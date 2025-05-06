import { HummerComponent } from "../../HummerComponent";
export declare class NotifyCenter extends HummerComponent {
    constructor(props?: any);
    protected static get instance(): NotifyCenter;
    static addEventListener(event: string, callback: Function): void;
    static removeEventListener(event: string, callback: Function): void;
    static triggerEvent(eventName: string, value: Record<string, any>): void;
    protected onHandleReceiveEvent(eventName: string, event: any): any;
}
