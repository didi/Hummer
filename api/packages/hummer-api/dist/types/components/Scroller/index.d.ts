import { LifeCycleElement } from "../../LifeCycleElement";
import { View } from "../View";
import { HMEvent, ViewEvent } from "../../HummerElement";
export declare enum ScrollEventState {
    normal = 0,
    beganDrag = 1,
    scroll = 2,
    stop = 3,
    endDrag = 4
}
export interface ScrollEvent extends HMEvent<ScrollEventState> {
    offsetX: number;
    offsetY: number;
    dx: number;
    dy: number;
}
export declare class Scroller extends LifeCycleElement {
    private _onScrollTop?;
    private _onScrollBottom?;
    private _onRefresh?;
    private _onLoadMore?;
    constructor(id?: string, name?: string, props?: any);
    protected onDispatch(type: string, event?: ScrollEvent): void;
    get refreshView(): View | undefined;
    set refreshView(value: View | undefined);
    get loadMoreView(): View | undefined;
    set loadMoreView(value: View | undefined);
    get onLoadMore(): (state: number) => void;
    set onLoadMore(value: (state: number) => void);
    get onRefresh(): (state: number) => void;
    set onRefresh(value: (state: number) => void);
    get bounces(): boolean;
    set bounces(value: boolean);
    get showScrollBar(): boolean;
    set showScrollBar(value: boolean);
    get enableLoadMore(): boolean;
    set enableLoadMore(value: boolean);
    get enableRefresh(): boolean;
    set enableRefresh(value: boolean);
    scrollTo(x: number | string, y: number | string): void;
    scrollBy(dx: number | string, dy: number | string): void;
    scrollToTop(): void;
    scrollToBottom(): void;
    setOnScrollToTopListener(callback: () => void): void;
    setOnScrollToBottomListener(callback: () => void): void;
    stopPullRefresh(): void;
    stopLoadMore(enable: boolean): void;
    addEventListener(eventName: string, eventListener: (event: ScrollEvent | ViewEvent | any) => void | Function | EventListener, useCapture?: boolean | undefined): void;
    insertBefore(child: any, anchor: any): void;
    appendChild(child: any): void;
}
