import { LifeCycleElement } from "../../LifeCycleElement";
import { ViewEvent } from "../../HummerElement";
import { ScrollEvent } from "../../components/Scroller";
export declare class HorizontalScroller extends LifeCycleElement {
    private _onScrollTop?;
    private _onScrollBottom?;
    constructor(id?: string, name?: string, props?: any);
    protected onDispatch(type: string, event?: ScrollEvent): void;
    get bounces(): boolean;
    set bounces(value: boolean);
    get showScrollBar(): boolean;
    set showScrollBar(value: boolean);
    scrollTo(x: number | string, y: number | string): void;
    scrollBy(dx: number | string, dy: number | string): void;
    scrollToTop(): void;
    scrollToBottom(): void;
    setOnScrollToTopListener(callback: () => void): void;
    setOnScrollToBottomListener(callback: () => void): void;
    updateContentSize(): void;
    addEventListener(eventName: string, eventListener: (event: ScrollEvent | ViewEvent | any) => void | Function | EventListener, useCapture?: boolean | undefined): void;
}
