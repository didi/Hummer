import { HummerComponent } from "../../HummerComponent";
export declare class NotifyCenter extends HummerComponent {
    private static instance;
    constructor(props?: any);
    protected static newInstance(): NotifyCenter;
    protected static checkInstance(): void;
    addEventListener(event: string, callback: (value: Object) => void): void;
    removeEventListener(event: string, callback: (value: Object) => void): any;
    triggerEvent(event: string, value: Object): void;
    __addEventListener(event: string, callback: (value: Object) => void): void;
    __removeEventListener(event: string, callback?: (value: Object) => void): any;
    __triggerEvent(event: string, value: Object): void;
}
