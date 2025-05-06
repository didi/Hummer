import { HummerElement } from "../../HummerElement";
import { View } from '../View';
import { HMEvent, ViewEvent } from "../../HummerElement";
import { FlexStyle } from "../../Element";
export interface ListStyle extends FlexStyle {
    mode?: string;
    scrollDirection?: string;
    column?: number;
    lineSpacing?: number | string;
    itemSpacing?: number | string;
    leftSpacing?: number | string;
    rightSpacing?: number | string;
    topSpacing?: number | string;
    bottomSpacing?: number | string;
}
export declare enum ListEventState {
    normal = 0,
    beganDrag = 1,
    scroll = 2,
    stop = 3,
    endDrag = 4
}
export interface ListEvent extends HMEvent<ListEventState> {
    offsetX: number;
    offsetY: number;
    dx: number;
    dy: number;
}
export declare class List extends HummerElement {
    private _onRegister?;
    private _onCreate?;
    private _onUpdate?;
    private _onRefresh?;
    private _onLoadMore?;
    constructor(id?: string, name?: string, props?: any);
    set style(value: ListStyle | Record<string, any>);
    get style(): ListStyle | Record<string, any>;
    protected onDispatch(type: string, event: ListEvent, cell?: View): void;
    get onRegister(): (position: number) => number;
    set onRegister(value: (position: number) => number);
    get onCreate(): (type: number) => View;
    set onCreate(value: (type: number) => View);
    get onUpdate(): (position: number, cell: View) => void;
    set onUpdate(value: (position: number, cell: View) => void);
    get refreshView(): View;
    set refreshView(value: View);
    get loadMoreView(): View;
    set loadMoreView(value: View);
    get onRefresh(): (state: number) => void;
    set onRefresh(value: (state: number) => void);
    get onLoadMore(): (state: number) => void;
    set onLoadMore(value: (state: number) => void);
    get showScrollBar(): boolean;
    set showScrollBar(value: boolean);
    get bounces(): boolean;
    set bounces(value: boolean);
    refresh(count: number): void;
    scrollToPosition(position: number): void;
    scrollTo(x: number | string, y: number | string): void;
    scrollBy(dx: number | string, dy: number | string): void;
    stopPullRefresh(): void;
    stopLoadMore(enable: boolean): void;
    addEventListener(eventName: string, eventListener: (event: ListEvent | ViewEvent | any) => void | Function | EventListener, useCapture?: boolean | undefined): void;
}
