import { HummerElement, HMEvent, ViewEvent } from "../../HummerElement";
import { FlexStyle } from "../../Element";
export interface SwitchStyle extends FlexStyle {
    onColor?: string;
    offColor?: string;
    thumbColor?: string;
}
export interface SwitchEvent extends HMEvent<number> {
    state: number;
}
export declare class Switch extends HummerElement {
    constructor(id?: string, name?: string, props?: any);
    set style(value: SwitchStyle | Record<string, any>);
    get style(): SwitchStyle | Record<string, any>;
    set checked(value: boolean);
    get checked(): boolean;
    addEventListener(eventName: string, eventListener: (event: SwitchEvent | ViewEvent | any) => void | Function | EventListener, useCapture?: boolean | undefined): void;
}
