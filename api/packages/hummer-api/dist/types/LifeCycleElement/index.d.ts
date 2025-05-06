import { HummerElement } from "../HummerElement";
export declare class LifeCycleElement extends HummerElement {
    constructor(tag: string, name: string | undefined, props: any);
    dispatchEvent(eventName: string, event: any): void;
    onCreate(e?: undefined | Function | any): void;
    onAppear(): void;
    onDisappear(): void;
    onDestroy(): void;
    onBack(): void;
    get canGoBack(): boolean;
    set canGoBack(canGoBack: boolean);
}
