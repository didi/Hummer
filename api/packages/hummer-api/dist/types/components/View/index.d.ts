import { LifeCycleElement } from "../../LifeCycleElement";
import { FlexStyle } from "../../Element";
export interface ViewStyle extends FlexStyle {
    overflow?: string;
}
export declare class View extends LifeCycleElement {
    constructor(id?: string, name?: string, props?: any);
    set style(value: ViewStyle | Record<string, any>);
    get style(): ViewStyle | Record<string, any>;
    set overflow(value: string);
    get overflow(): string;
}
