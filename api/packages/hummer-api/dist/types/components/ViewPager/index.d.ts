import { HummerElement } from "../../HummerElement";
import { Element } from "../../Element";
import { FlexStyle } from "../../Element";
export interface ViewPagerStyle extends FlexStyle {
    borderRadius?: number | string;
    itemSpacing?: number | string;
    edgeSpacing?: number | string;
    canLoop?: boolean;
    autoPlay?: boolean;
    loopInterval?: number;
    scaleFactor?: number;
    alphaFactor?: number;
}
export declare class ViewPager extends HummerElement {
    constructor(id?: string, name?: string, props?: any);
    set style(value: ViewPagerStyle | Record<string, any>);
    get style(): ViewPagerStyle | Record<string, any>;
    get data(): string;
    set data(value: string);
    setCurrentItem(position: number): void;
    onPageChange(callback: (current: number, total: number) => void): void;
    onItemClick(callback: (position: number) => void): void;
    onItemView(callback: (position: number, view: Element) => Element): void;
}
